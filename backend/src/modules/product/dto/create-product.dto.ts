import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Notebook Lenovo',
    description: 'Nome do produto',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Notebook com 16GB RAM e SSD 512GB',
    description: 'Descrição do produto',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 3499.9,
    description: 'Preço do produto. Não pode ser negativo.',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    example: ['uuid-da-categoria'],
    description: 'Lista de IDs das categorias vinculadas ao produto',
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  categoryIds!: string[];
};
