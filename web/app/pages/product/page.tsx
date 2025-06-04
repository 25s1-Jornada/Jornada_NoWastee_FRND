import ProductCarousel from "@/app/components/details/product-carousel";

export default function ProductPage() {
  const images = [
    "/products/foto-1.jpg",
    "/products/foto-2.jpg",
    "/products/foto-3.jpg",
    "/products/foto-4.jpg",
  ];

  return (
    <div className="max-w-[1440px] mx-auto min-h-screen w-full font-sans text-neutral-800 py-10 px-4 lg:px-12">
      {/* Breadcrumb */}
      <div className="text-sm text-neutral-500">
        Início / t-shirts / linha art / <span className="text-black">abitoff</span>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Carousel */}
        <div className="w-full lg:w-1/2 flex justify-start items-start">
          <ProductCarousel images={images} />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-serif font-light mb-2">abitoff</h1>
          <hr className="my-4" />
          <p className="text-lg font-sans text-neutral-900 mb-1">R$ 215,00</p>
          <p className="text-sm font-semibold text-black mb-6">lançamento</p>

          <div className="text-sm text-neutral-700 space-y-5 mb-8 leading-relaxed">
            <p>
              Camiseta Design Zero Desperdício com coeficiente médio de aproveitamento
              de matéria prima de 97%. Uma camiseta oversized, modelada a partir de
              retas e oblíquas para não gerar lixo, com decote quadrado que é a nossa
              assinatura de design do compromisso na luta pela sobrevivência do planeta.
            </p>
            <p>
              <strong className="font-semibold">CUIDADOS E COMPOSIÇÃO</strong><br />
              Camiseta em malha 100% algodão orgânico, com estampa de pigmentos
              naturais de alta fixação. Sua peça deve durar muito, então prefira lavar
              com sabão neutro ou natural de coco, secar à sombra e passar na estampa
              pelo avesso. Dica amiga: 1 gota de vinagre branco faz as vezes de amaciante.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Cor</label>
              <select className="w-full border border-neutral-300 px-3 py-2 rounded">
                <option>Escolha uma opção</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Tamanho</label>
              <select className="w-full border border-neutral-300 px-3 py-2 rounded">
                <option>Escolha uma opção</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded text-sm hover:bg-neutral-800 transition mt-6">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}