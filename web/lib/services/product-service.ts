import type { Product } from "../entities/product.interface";

export abstract class ProductService {
  abstract getAll(): Promise<Product[]>;
  abstract getByName(name: string): Promise<Product | undefined>;
}
