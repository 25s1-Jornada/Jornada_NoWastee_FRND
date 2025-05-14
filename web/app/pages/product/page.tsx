import ProductCarousel from "../../components/details/product-carousel";
import Navbar from "../../components/navbar";

export default function ProductPage() {
  const images = [
    "/products/foto-1.jpg",
    "/products/foto-2.jpg",
    "/products/foto-3.jpg",
    "/products/foto-4.jpg",
  ];

  return (
    <div className="min-h-screen bg-white px-8 md:px-16 py-10 font-sans h-full overflow-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="text-sm text-neutral-500 mb-6">
        Início / t-shirts / linha art / <span className="text-black">abitoff</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2 h-full">
          <ProductCarousel images={images} />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-light mb-3">abitoff</h1>
          <hr className="my-4" />
          <p className="text-lg text-neutral-800 mb-1">R$ 215,00</p>
          <p className="text-sm font-semibold mb-4">lançamento</p>

          <div className="text-sm text-neutral-700 space-y-4 mb-6">
            <p>
              Camiseta Design Zero Desperdício com coeficiente médio de
              aproveitamento de matéria prima de 97%. Uma camiseta oversized,
              modelada a partir de retas e oblíquas para não gerar lixo, com
              decote quadrado que é a nossa assinatura de design do compromisso
              na luta pela sobrevivência do planeta.
            </p>
            <p>
              <strong>CUIDADOS E COMPOSIÇÃO</strong><br />
              Camiseta em malha 100% algodão orgânico, com estampa de pigmentos
              naturais de alta fixação. Sua peça deve durar muito, então
              prefira lavar com sabão neutro ou natural de coco, secar à sombra
              e passar na estampa pelo avesso. Dica amiga: 1 gota de vinagre
              branco faz as vezes de amaciante.
            </p>
          </div>

          {/* Variants */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Cor</label>
            <select className="w-full border border-neutral-300 px-3 py-2 rounded">
              <option>Escolha uma opção</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Tamanho</label>
            <select className="w-full border border-neutral-300 px-3 py-2 rounded">
              <option>Escolha uma opção</option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-3 rounded text-sm hover:bg-neutral-800 transition">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
