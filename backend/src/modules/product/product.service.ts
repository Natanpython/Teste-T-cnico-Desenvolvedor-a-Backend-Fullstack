import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) { }

  findAll(search?: string) {
    const normalizedSearch = search?.trim();
    const code = normalizedSearch ? Number(normalizedSearch) : Number.NaN;

    return this.prisma.product.findMany({
      where: normalizedSearch
        ? {
          OR: [
            {
              name: {
                contains: normalizedSearch,
                mode: 'insensitive',
              },
            },
            ...(!Number.isNaN(code) ? [{ code }] : []),
          ],
        }
        : undefined,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        code: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    await this.validateProduct(data.price, data.categoryIds);

    return this.prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        categories: {
          create: data.categoryIds.map((categoryId) => ({
            category: {
              connect: { id: categoryId },
            },
          })),
        },
      },
    });
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    await this.findOne(id);

    if (data.price !== undefined && data.price < 0) {
      throw new BadRequestException('Preço não pode ser negativo');
    }

    if (data.categoryIds !== undefined) {
      await this.validateCategories(data.categoryIds);
    }

    return this.prisma.$transaction(async (tx) => {
      if (data.categoryIds) {
        await tx.productCategory.deleteMany({
          where: { productId: id },
        });
      }

      return tx.product.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          price: data.price,
          categories: data.categoryIds
            ? {
              create: data.categoryIds.map((categoryId) => ({
                category: {
                  connect: { id: categoryId },
                },
              })),
            }
            : undefined,
        },
      });
    });
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.prisma.product.delete({
      where: { id },
    });
  }

  private async validateProduct(
    price: number,
    categoryIds: string[],
  ): Promise<void> {
    if (price < 0) {
      throw new BadRequestException('Preço não pode ser negativo');
    }

    await this.validateCategories(categoryIds);
  }

  private async validateCategories(categoryIds: string[]): Promise<void> {
    if (!categoryIds.length) {
      throw new BadRequestException(
        'Produto deve ter pelo menos uma categoria',
      );
    }

    const categoriesCount = await this.prisma.category.count({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    if (categoriesCount !== categoryIds.length) {
      throw new BadRequestException('Uma ou mais categorias são inválidas');
    }
  }
};
