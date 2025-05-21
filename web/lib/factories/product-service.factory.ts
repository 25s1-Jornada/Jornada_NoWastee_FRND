import { ProductService } from "../services/product-service";
import { InMemoryProductService } from "../services/in-memory-product-service";

export function getProductService(): ProductService {
  return new InMemoryProductService();
}