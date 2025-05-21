import { ProductService } from "./product-service";
import type { Product } from "../entities/product.interface";

export class InMemoryProductService extends ProductService {
  private products: Product[] = [
    {
      id: 0,
      name: "abitoff",
      price: "R$ 215,00",
      image: "/products/foto-1.jpg",
      category: "LINHA ART",
    },
    {
      id: 1,
      name: "lace tee",
      price: "R$ 197,00",
      image: "/products/foto-2.jpg",
      category: "LINHA ART",
    },
    {
      id: 2,
      name: "a.02 regata long",
      price: "R$ 297,00",
      image: "/products/foto-3.jpg",
      category: "A.02",
    },
    {
      id: 3,
      name: "abitoff cut",
      price: "R$ 225,00",
      image: "/products/foto-4.jpg",
      category: "LINHA ART",
    },
  ];

  async getAll(): Promise<Product[]> {
    return this.products;
  }

  async getByName(name: string): Promise<Product | undefined> {
    return this.products.find((p) => p.name.toLowerCase() === name.toLowerCase());
  }
}
