import React from 'react';
import FilterSidebar from "./components/filter-sidebar";
import ProductList from "./components/product-list";
import { getProductService } from "@/lib/factories/product-service.factory";

export default async function HomePage() {
  const productService = getProductService();
  const products = await productService.getAll();

  return (
    <div className="flex h-full">
      {/* Sticky Sidebar */}
      <aside className="w-1/4 block sticky top-[6rem] h-[calc(100vh-6rem)] p-4 border-r border-neutral-200">
        <div className="overflow-y-auto h-full pr-2 fixed">
          <FilterSidebar />
        </div>
      </aside>

      {/* Scrollable Product List */}
      <main className="w-full lg:w-3/4 overflow-y-auto p-4">
        <ProductList products={products} />
      </main>
    </div>
  );
}
