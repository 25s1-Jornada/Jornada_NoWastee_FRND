import { describe, it, expect } from "vitest";
import { InMemoryProductService } from "@/lib/services/in-memory-product-service";

describe("InMemoryProductService", () => {
  const service = new InMemoryProductService();

  it("should return all products", async () => {
    const products = await service.getAll();
    expect(products.length).toBe(4);
  });

  it("should return correct product names", async () => {
    const products = await service.getAll();
    expect(products.map(p => p.name)).toContain("abitoff");
  });
});
