export default function FilterSidebar() {
  return (
    <aside className="w-full space-y-6">
      {/* Search */}
      <div>
        <h3 className="uppercase text-sm font-semibold mb-2">Search</h3>
        <div className="flex border">
          <input
            type="text"
            className="w-full px-3 py-2 focus:outline-none"
            placeholder="Pesquisa..."
          />
          <button className="bg-black text-white px-4">🔍</button>
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="uppercase text-sm font-semibold mb-2">Filtrar por preço</h3>
        <input type="range" min="190" max="300" className="w-full" />
        <div className="flex justify-between mt-2 text-sm">
          <button className="bg-black text-white px-4 py-1 text-xs rounded">Filtrar</button>
          <span>Preço: R$ 190 — R$ 300</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="uppercase text-sm font-semibold mb-2">Categorias de produto</h3>
        <ul className="text-sm space-y-1">
          <li><a href="#" className="hover:underline">movement</a></li>
          <li><a href="#" className="hover:underline">Sem categoria</a></li>
          <li>
            <details className="ml-2">
              <summary className="cursor-pointer">t-shirts</summary>
              <ul className="ml-4 mt-1 space-y-1">
                <li><a href="#" className="hover:underline">linha art</a></li>
                <li><a href="#" className="hover:underline">a.01</a></li>
                <li><a href="#" className="hover:underline">a.02</a></li>
                <li><a href="#" className="hover:underline">linha casual</a></li>
                <li><a href="#" className="hover:underline">linha infantil</a></li>
                <li><a href="#" className="hover:underline">linha sport</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </aside>
  );
}