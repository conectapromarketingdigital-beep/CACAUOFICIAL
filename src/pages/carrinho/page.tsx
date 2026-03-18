import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../home/components/Header';
import Footer from '../home/components/Footer';

interface Product {
  id: number;
  name: string;
  image: string;
}

export default function CarrinhoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {
    id: 1,
    name: 'Ovo de Páscoa Cacau Show Premium',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/b7e4c0216cbdf9b1efac75e969780eee.jpeg'
  };

  const shippingCost = 29.90;
  const deliveryDays = '8 a 12 dias úteis';
  const bumpPrice = 27.90;

  const [showOrderBump, setShowOrderBump] = useState(false);
  const [bumpAccepted, setBumpAccepted] = useState(false);

  const handleFinalizarPedido = () => {
    setShowOrderBump(true);
  };

  const handleAceitarBump = () => {
    setBumpAccepted(true);
    navigate('/checkout/dados-pessoais', { state: { product, orderBump: true, bumpPrice } });
  };

  const handleRecusarBump = () => {
    navigate('/checkout/dados-pessoais', { state: { product, orderBump: false } });
  };

  const totalComBump = shippingCost + bumpPrice;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-5 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Seu Carrinho
            </h1>
            <p className="text-sm sm:text-lg text-gray-600">
              O produto é <span className="font-semibold text-green-600">gratuito</span>, você paga somente o custo da logística (frete)
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Produto Selecionado */}
            <div className="lg:col-span-2 lg:row-start-1 order-1 lg:order-none">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Produto Selecionado</h2>
                
                <div className="flex gap-3 sm:gap-6">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-lg">
                      GRÁTIS
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 leading-snug">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                      <span className="text-xl sm:text-2xl font-bold text-green-600">R$ 0,00</span>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">
                        Produto Gratuito
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Quantidade: 1 unidade
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1 lg:row-span-2 lg:row-start-1 order-2 lg:order-none">
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-700">Produto:</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base">R$ 0,00</span>
                  </div>

                  {bumpAccepted && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-xs sm:text-sm">Ovo laCreme 348g:</span>
                      <span className="font-semibold text-gray-900 text-sm">R$ {bumpPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center pb-3 sm:pb-4 border-b-2 border-gray-300">
                    <span className="text-xs sm:text-base text-gray-700">Taxa de Entrega (PAC):</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      R$ {shippingCost.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-1 sm:pt-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total a Pagar:</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#28a745]">
                      R$ {(bumpAccepted ? totalComBump : shippingCost).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <i className="ri-information-line text-yellow-600 text-lg sm:text-xl flex-shrink-0 mt-0.5"></i>
                    <p className="text-xs sm:text-sm text-gray-700">
                      <span className="font-semibold">Você paga apenas o frete!</span> O produto é 100% gratuito, cobramos somente o custo da logística de entrega.
                    </p>
                  </div>
                </div>

                {!showOrderBump && (
                  <button
                    onClick={handleFinalizarPedido}
                    className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3.5 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg whitespace-nowrap mb-3 sm:mb-4 cursor-pointer"
                  >
                    Finalizar Pedido
                  </button>
                )}

                {showOrderBump && (
                  <button
                    onClick={handleRecusarBump}
                    className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3.5 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg whitespace-nowrap mb-3 sm:mb-4 cursor-pointer"
                  >
                    Continuar sem o desconto
                  </button>
                )}

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg border-2 border-gray-800 transition-all duration-300 text-sm sm:text-base whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="ri-arrow-left-line text-base sm:text-lg"></i>
                  Voltar para a página inicial
                </button>
              </div>
            </div>

            {/* Informações de Entrega */}
            <div className="lg:col-span-2 lg:row-start-2 order-3 lg:order-none">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Informações de Entrega</h2>
                
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                    <img
                      src="https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/aad260084ff20c5c2802c2b246bb66c1.png"
                      alt="Correios PAC"
                      className="h-8 sm:h-12 object-contain"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm sm:text-lg">PAC - Correios</p>
                      <p className="text-xs sm:text-sm text-gray-600">A Encomenda Econômica dos Correios</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 sm:pt-3 border-t border-blue-200">
                    <span className="text-xs sm:text-sm text-gray-700">Prazo de entrega:</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{deliveryDays}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER BUMP MODAL */}
          {showOrderBump && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl mx-3">
                {/* Header vermelho */}
                <div className="bg-red-600 px-4 py-2.5 sm:py-3 text-center">
                  <p className="text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                    ⚡ OFERTA EXCLUSIVA — SÓ AGORA!
                  </p>
                </div>

                <div className="p-4 sm:p-6 text-center">
                  {/* Badge desconto */}
                  <div className="inline-block bg-yellow-400 text-yellow-900 font-extrabold text-xs sm:text-sm px-4 py-1 sm:px-5 sm:py-1.5 rounded-full mb-3 sm:mb-4 uppercase tracking-wide">
                    52% DE DESCONTO
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1 leading-tight">
                    Gostaria de adicionar ao seu pedido?
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-5">
                    Aproveite esta oferta especial antes de finalizar!
                  </p>

                  {/* Card do produto */}
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 text-left">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src="https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/68f8043d00ea9da06c98a2877f8dd39f.webp"
                        alt="Ovo de Páscoa laCreme ao Leite 348g"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight mb-1">
                        Ovo de Páscoa Dreams<br />Dubai Pistache 400g
                      </p>
                      <p className="text-gray-400 line-through text-xs">R$ 57,20</p>
                      <p className="text-red-500 font-extrabold text-lg sm:text-xl">R$ 27,90</p>
                      <span className="inline-block bg-red-100 text-red-500 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 sm:mt-1">
                        Economia de R$ 30,00
                      </span>
                    </div>
                  </div>

                  {/* Botão SIM */}
                  <button
                    onClick={handleAceitarBump}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-300 shadow-lg text-sm sm:text-base whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 mb-2 sm:mb-3"
                  >
                    <span className="text-base sm:text-lg">⊕</span>
                    SIM! Quero adicionar por R$ 27,90
                  </button>

                  {/* Recusar */}
                  <button
                    onClick={handleRecusarBump}
                    className="w-full bg-white hover:bg-red-50 text-red-500 hover:text-red-600 font-bold py-3 sm:py-3.5 px-4 rounded-xl border-2 border-red-300 hover:border-red-400 transition-all duration-200 text-sm sm:text-base whitespace-normal cursor-pointer leading-snug"
                  >
                    ✕ Não, obrigado. Continuar sem o adicional.
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Informações Adicionais */}
          <div className="mt-6 sm:mt-12 bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Por que pago apenas o frete?</h3>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <i className="ri-gift-line text-[#28a745] text-xl sm:text-2xl flex-shrink-0"></i>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Produto Gratuito</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Esta é uma ação social especial da Cacau Show
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-truck-line text-[#28a745] text-xl sm:text-2xl flex-shrink-0"></i>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Apenas Logística</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Você paga somente o custo de envio pelos Correios
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <i className="ri-shield-check-line text-[#28a745] text-xl sm:text-2xl flex-shrink-0"></i>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 text-sm sm:text-base">Entrega Segura</h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Enviado via PAC dos Correios com rastreamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
