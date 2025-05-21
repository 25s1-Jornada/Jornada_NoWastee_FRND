import type { Product } from "@/lib/entities/product.interface";
import type { ProductService } from "@/lib/services/product-service";

const mockProducts: Product[] = [
  { id: 1, name: "Mock Product", price: "R$ 999", category: "TEST", image: "" },
  { id: 2, name: "Other Product", price: "R$ 199", category: "TEST", image: "" },
];

export class MockProductService implements ProductService {
  async getAll(): Promise<Product[]> {
    return mockProducts;
  }

  async getByName(name: string): Promise<Product | undefined> {
    return mockProducts.find((p) => p.name === name);
  }
}