import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../home/components/Header';
import Footer from '../../home/components/Footer';
import PurchaseNotification from '../../../components/PurchaseNotification';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface DadosPessoais {
  nomeCompleto: string;
  email: string;
  cpf: string;
  celular: string;
}

interface Endereco {
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export default function PagamentoPage() {
  const location = useLocation();
  const product = location.state?.product || {
    id: 1,
    name: 'Ovo de Páscoa Cacau Show Premium',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/68f8043d00ea9da06c98a2877f8dd39f.webp'
  };
  const dadosPessoais = location.state?.dadosPessoais;
  const endereco = location.state?.endereco;
  const orderBump = location.state?.orderBump || false;
  const bumpPrice = location.state?.bumpPrice || 0;

  const bumpProduct = {
    name: 'Ovo de Páscoa Dreams Dubai Pistache 400g',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/68f8043d00ea9da06c98a2877f8dd39f.webp'
  };

  const shippingCost = 29.90;
  const total = orderBump ? shippingCost + bumpPrice : shippingCost;

  // Rola para o topo ao entrar na página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Gabriela',
      location: 'São Paulo',
      text: 'Eu não estava com dinheiro para comprar ovo de Páscoa para minha família esse ano. Resolvi tentar essa ação e chegou tudo certinho aqui em casa.',
      rating: 5,
      image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/4b3075f0b524ec15dd1eb5e45ad76cfe.jpeg'
    },
    {
      id: 2,
      name: 'Felipe',
      location: 'Bahia',
      text: 'No começo fiquei com medo por causa do anúncio, mas resolvi pedir. Chegou em menos de 17 dias e veio tudo bem embalado.',
      rating: 5,
      image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/ed6bb490eb8f3cef57d21d8b72c989fd.jpeg'
    },
    {
      id: 3,
      name: 'Ana Paula',
      location: 'Belo Horizonte',
      text: 'Meu filho nem ligou tanto para o chocolate, ele ficou mais surpreso com o presente que veio junto. Muito obrigado pela iniciativa.',
      rating: 5,
      image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/200388e5b20d2f0b2fc74095cdcb11cc.jpeg'
    },
    {
      id: 4,
      name: 'Carlos',
      location: 'Curitiba',
      text: 'Chegou tudo certo aqui em casa. No começo fiquei com receio, mas vi várias pessoas comentando e resolvi tentar também.',
      rating: 5,
      image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/50b1c3edeaf9eaee147e8c0abcaafc33.jpeg'
    }
  ];

  const handlePixPayment = () => {
    if (orderBump) {
      window.location.href = 'https://invictuspaycheckout.com.br/c/cacau-shoia-copia-copia-copia-copia-copia-copia-copia-copia-copia-yZ2ZG9';
    } else {
      window.location.href = 'https://invictuspaycheckout.com.br/c/cacau-shoia-copia-copia-copia-copia-copia-copia-copia-copia-RDHYGm';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Finalizar Pedido
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Última etapa para receber seu Ovo de Páscoa
            </p>
          </div>

          {/* Informações de Entrega - Topo */}
          <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                <img 
                  src="https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/04774be4e85c4231e9f1201155aa39fb.jpeg"
                  alt="Correios"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Entrega via PAC - Correios</h3>
                <p className="text-xs sm:text-sm text-gray-600">Prazo de entrega: até 7 dias úteis</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 pt-4 border-t-2 border-gray-200">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-[#28a745] text-lg sm:text-xl"></i>
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-lock-line text-[#28a745] text-lg sm:text-xl"></i>
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-truck-line text-[#28a745] text-lg sm:text-xl"></i>
                <span>Entrega garantida</span>
              </div>
            </div>
          </div>

          {/* Forma de Pagamento - Topo */}
          <div className="mb-6 sm:mb-8 bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Forma de Pagamento</h2>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#28a745] rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-qr-code-line text-white text-2xl sm:text-3xl"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Pagamento via Pix</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Aprovação instantânea</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <i className="ri-check-line text-[#28a745] text-base sm:text-lg"></i>
                  <span>Pagamento rápido e seguro</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <i className="ri-check-line text-[#28a745] text-base sm:text-lg"></i>
                  <span>Confirmação imediata</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                  <i className="ri-check-line text-[#28a745] text-base sm:text-lg"></i>
                  <span>Disponível 24 horas por dia</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePixPayment}
              className="w-full bg-[#28a745] hover:bg-[#218838] text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-base sm:text-lg whitespace-nowrap cursor-pointer"
            >
              <i className="ri-qr-code-line mr-2"></i>
              Pagar via Pix
            </button>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-[#28a745] text-lg sm:text-xl"></i>
                <span>Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-lock-line text-[#28a745] text-lg sm:text-xl"></i>
                <span>Dados protegidos</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Depoimentos */}
            <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
              {/* Depoimentos com Fotos */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                  O que nossos clientes dizem
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-gray-50 rounded-lg p-4 sm:p-5 border-2 border-gray-200">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, index) => (
                          <i key={index} className="ri-star-fill text-yellow-400 text-base sm:text-lg"></i>
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-4 leading-relaxed text-xs sm:text-sm">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-xs sm:text-sm">{testimonial.name}</p>
                          <p className="text-xs text-gray-600">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-base sm:text-xl font-bold text-gray-900 mb-3 sm:mb-6">Resumo do Pedido</h2>

                {/* Produto */}
                <div className="mb-3 sm:mb-6">
                  {/* Produto principal - mobile: horizontal, desktop: vertical */}
                  <div className="mb-3">
                    {/* Mobile layout */}
                    <div className="flex items-center gap-3 sm:hidden">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                          GRÁTIS
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs font-bold text-green-600 mt-0.5">R$ 0,00</p>
                      </div>
                    </div>
                    {/* Desktop layout */}
                    <div className="hidden sm:block">
                      <div className="relative w-full h-44 mb-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          GRÁTIS
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-sm font-bold text-green-600 mt-0.5">R$ 0,00</p>
                    </div>
                  </div>

                  {/* Order Bump - aparece só se aceito */}
                  {orderBump && (
                    <div className="mb-3 border-t-2 border-dashed border-yellow-300 pt-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          + Adicional
                        </span>
                      </div>
                      {/* Mobile layout */}
                      <div className="flex items-center gap-3 sm:hidden">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img
                            src={bumpProduct.image}
                            alt={bumpProduct.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
                            52% OFF
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2">
                            {bumpProduct.name}
                          </h3>
                          <p className="text-xs font-bold text-red-500 mt-0.5">
                            R$ {bumpPrice.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                      {/* Desktop layout */}
                      <div className="hidden sm:block">
                        <div className="relative w-full h-44 mb-2">
                          <img
                            src={bumpProduct.image}
                            alt={bumpProduct.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            52% OFF
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-base leading-snug">
                          {bumpProduct.name}
                        </h3>
                        <p className="text-sm font-bold text-red-500 mt-0.5">
                          R$ {bumpPrice.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-2 sm:p-3 mt-2">
                    <p className="text-xs font-semibold text-green-800 text-center">
                      Produto promocional da ação social
                    </p>
                    <p className="text-xs text-green-700 text-center mt-0.5">
                      Ovo de Páscoa especial
                    </p>
                  </div>
                </div>

                {/* Valores */}
                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-6">
                  <div className="flex justify-between items-center text-xs sm:text-base">
                    <span className="text-gray-700">Ovo de Páscoa:</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>

                  {orderBump && (
                    <div className="flex justify-between items-center text-xs sm:text-base">
                      <span className="text-gray-700 leading-snug pr-2">Pistache Dreams Dubai:</span>
                      <span className="font-semibold text-red-500 whitespace-nowrap">R$ {bumpPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pb-2 sm:pb-3 border-b-2 border-gray-200 text-xs sm:text-base">
                    <span className="text-gray-700">Taxa de entrega:</span>
                    <span className="font-semibold text-gray-900">
                      R$ {shippingCost.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1 sm:pt-2">
                    <span className="text-sm sm:text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-lg sm:text-2xl font-bold text-[#28a745]">
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Destaque */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-2 sm:p-4 mb-3 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <i className="ri-information-line text-yellow-600 text-base sm:text-xl flex-shrink-0 mt-0.5"></i>
                    <p className="text-xs text-gray-700">
                      <span className="font-semibold">Você paga apenas a taxa de entrega.</span> O produto é 100% gratuito!
                    </p>
                  </div>
                </div>

                {/* Dados do Cliente */}
                {dadosPessoais && (
                  <div className="border-t-2 border-gray-200 pt-3 sm:pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Dados do Cliente</h3>
                    <div className="space-y-1 sm:space-y-2 text-xs text-gray-600">
                      <p><span className="font-semibold">Nome:</span> {dadosPessoais.nomeCompleto}</p>
                      <p><span className="font-semibold">E-mail:</span> {dadosPessoais.email}</p>
                      <p><span className="font-semibold">CPF:</span> {dadosPessoais.cpf}</p>
                      <p><span className="font-semibold">Celular:</span> {dadosPessoais.celular}</p>
                    </div>
                  </div>
                )}

                {/* Endereço de Entrega */}
                {endereco && (
                  <div className="border-t-2 border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                    <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Endereço de Entrega</h3>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      <p>{endereco.endereco}, {endereco.numero}</p>
                      {endereco.complemento && <p>{endereco.complemento}</p>}
                      <p>{endereco.bairro}</p>
                      <p>{endereco.cidade} - {endereco.estado}</p>
                      <p>CEP: {endereco.cep}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <PurchaseNotification />

      <Footer />
    </div>
  );
}