'use client';

import { useState } from "react";
import type { Product } from "@/lib/entities/product.interface";
import FilterSidebar from "../filter-sidebar";
import ProductList from "../product-list";

interface Props {
  initialProducts: Product[];
}

export default function HomePageClient({ initialProducts }: Readonly<Props>) {
  const [products] = useState<Product[]>(initialProducts);
  const [filtered, setFiltered] = useState<Product[]>([...initialProducts]);
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([190, 300]);

  const applyFilter = (q: string, range: [number, number]) => {
    const lower = range[0];
    const upper = range[1];
    const filtered = products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(q.toLowerCase());
      const numericPrice = parseFloat(product.price.replace(/[^\d,]/g, "").replace(",", "."));
      const matchesPrice = numericPrice >= lower && numericPrice <= upper;
      return matchesQuery && matchesPrice;
    });
    setFiltered(filtered);
  };

  return (
    <div className="flex h-full">
      {/* Sticky Sidebar */}
      <aside className="w-1/4 block sticky top-[6rem] h-[calc(100vh-6rem)] p-4 border-r border-neutral-200">
        <div className="overflow-y-auto h-full pr-2 fixed">
          <FilterSidebar
            onFilter={(q, range) => {
              setQuery(q);
              setPriceRange(range);
              applyFilter(q, range);
            }}
            query={query}
            range={priceRange}
          />
        </div>
      </aside>

      {/* Scrollable Product List */}
      <main className="w-full lg:w-3/4 overflow-y-auto p-4">
        <ProductList products={filtered} />
      </main>
    </div>
  );
}