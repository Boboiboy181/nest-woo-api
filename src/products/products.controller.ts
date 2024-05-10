import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<any> {
    return this.productsService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<any> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(): Promise<any> {
    return this.productsService.getProducts();
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: number): Promise<any> {
    return this.productsService.deleteProductById(id);
  }

  @Put(':id')
  async updateProductById(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.updateProductById(id, updateProductDto);
  }
}
