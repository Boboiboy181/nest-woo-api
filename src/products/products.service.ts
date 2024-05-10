import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly wooCommerce: any;

  constructor(private readonly configService: ConfigService) {
    this.wooCommerce = new WooCommerceRestApi({
      url: 'https://g5-badminton.uit.io.vn',
      consumerKey: this.configService.getOrThrow('CONSUMER_KEY'),
      consumerSecret: this.configService.getOrThrow('CONSUMER_SECRET'),
      version: 'wc/v3',
    });
  }

  private removeCircularReferences(obj: any): any {
    const seen = new WeakSet();
    return JSON.parse(
      JSON.stringify(obj, (_key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      }),
    );
  }

  async getProducts() {
    try {
      const response = await this.wooCommerce.get('products');
      response.data.forEach((product: any) => {
        this.removeCircularReferences(product);
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw error;
    }
  }

  async getProductById(id: number) {
    try {
      const response = await this.wooCommerce.get(`products/${id}`);
      this.removeCircularReferences(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by id:', error.message);
      throw error;
    }
  }

  async deleteProductById(id: number) {
    try {
      const response = await this.wooCommerce.delete(`products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product by id:', error.message);
      throw error;
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    const data = {
      sku: createProductDto.sku,
      name: createProductDto.name,
      type: 'simple',
      description: createProductDto.description,
      price: createProductDto.price,
      categories: [
        {
          id: 16,
        },
      ],
      images: createProductDto.images.map((image) => {
        return {
          src: image,
        };
      }),
      attributes: createProductDto.attributes,
    };

    try {
      const response = await this.wooCommerce.post('products', data);
      this.removeCircularReferences(response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.message);
      throw error;
    }
  }

  async updateProductById(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.getProductById(id);

    const data = {
      ...productToUpdate,
      ...updateProductDto,
    };

    try {
      const response = await this.wooCommerce.put(`products/${id}`, data);
      this.removeCircularReferences(response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating product by id:', error.message);
      throw error;
    }
  }
}
