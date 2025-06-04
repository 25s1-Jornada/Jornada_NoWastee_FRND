import { getProductService } from "@/lib/factories/product-service.factory";
import HomePageClient from "./components/home/home-page.client";

export default async function HomePage() {
  const productService = getProductService();
  const products = await productService.getAll();

  return <HomePageClient initialProducts={products} />;
}