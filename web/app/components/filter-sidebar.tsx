'use client';

import { useState } from "react";
import { Search } from "lucide-react";

interface Props {
  onFilter: (query: string, range: [number, number]) => void;
  query: string;
  range: [number, number];
}

export default function FilterSidebar({ onFilter, query, range }: Readonly<Props>) {
  const [search, setSearch] = useState(query);
  const [price, setPrice] = useState(range);

  const apply = () => {
    onFilter(search, price);
  };

  return (
    <aside className="w-full space-y-6 font-dm-sans">
      <div>
        <h3 className="uppercase text-sm font-semibold mb-2">Search</h3>
        <div className="flex border">
          <input
            type="text"
            className="w-full px-3 py-2 focus:outline-none"
            placeholder="Pesquisa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-background !rounded-none text-foreground px-4 flex items-center justify-center"
            onClick={apply}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="uppercase text-sm font-semibold mb-2">Filtrar por preço</h3>
        <input
          type="range"
          min="190"
          max="300"
          value={price[1]}
          onChange={(e) => setPrice([190, parseInt(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between m-0 mt-1">
          <span>Preço: R$ {price[0]} — R$ {price[1]}</span>
        </div>
      </div>
    </aside>
  );
}
