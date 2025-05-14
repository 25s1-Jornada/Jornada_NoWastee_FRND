import FilterSidebar from "./components/filter-sidebar";
import Navbar from "./components/navbar";
import ProductList from "./components/product-list";

export default function LinhaArtPage() {
  const products = [
    {
      name: 'abitoff',
      price: 'R$ 215,00',
      image: '/products/foto-1.jpg',
      category: 'LINHA ART',
    },
    {
      name: 'lace tee',
      price: 'R$ 197,00',
      image: '/products/foto-2.jpg',
      category: 'LINHA ART',
    },
    {
      name: 'a.02 regata long',
      price: 'R$ 297,00',
      image: '/products/foto-3.jpg',
      category: 'A.02',
    },
    {
      name: 'abitoff cut',
      price: 'R$ 225,00',
      image: '/products/foto-4.jpg',
      category: 'LINHA ART',
    },
  ];

  return (
    <div className="w-full overflow-hidden h-full">
      <Navbar />
      <div className="min-h-screen font-sans m-auto max-w-[1440px] mt-[8rem] overflow-hidden">
        {/* Breadcrumb and Sort */}
        <div className="flex justify-between items-center text-sm text-neutral-500 mb-6">
          <div>Início / t-shirts / <span className="text-black">linha art</span></div>
          <select className="border border-neutral-300 px-3 py-1 text-sm">
            <option>Ordenação padrão</option>
          </select>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 overflow-hidden w-full h-full">
          <FilterSidebar />
          <div className="flex flex-row overflow-auto w-full h-full">
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}