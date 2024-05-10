import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Attribute } from './create-product.dto';

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  vendor?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ type: [Attribute] })
  @IsOptional()
  @IsArray()
  attributes?: Attribute[];
}
