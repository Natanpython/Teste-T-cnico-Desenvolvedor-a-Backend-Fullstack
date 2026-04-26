export interface Category {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface ProductCategory {
  category: Category;
}

export interface Product {
  id: string;
  code: number;
  name: string;
  description?: string | null;
  price: number | string;
  categories: ProductCategory[];
}