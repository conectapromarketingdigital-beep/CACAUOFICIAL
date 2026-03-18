import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../home/components/Header';
import Footer from '../../home/components/Footer';

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

interface Notification {
  id: number;
  name: string;
  city: string;
  action: string;
}

export default function EnderecoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {
    id: 1,
    name: 'Ovo de Páscoa Cacau Show Premium',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/b7e4c0216cbdf9b1efac75e969780eee.jpeg'
  };
  const dadosPessoais: DadosPessoais = location.state?.dadosPessoais;

  const [formData, setFormData] = useState({
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [errors, setErrors] = useState({
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  const shippingCost = 29.90;

  const notifications: Notification[] = [
    { id: 1, name: 'Gabriela', city: 'São Paulo', action: 'acabou de garantir o ovo de Páscoa' },
    { id: 2, name: 'Felipe', city: 'Bahia', action: 'acabou de receber o pedido' },
    { id: 3, name: 'Mariana', city: 'Rio de Janeiro', action: 'acabou de participar da ação' },
    { id: 4, name: 'João', city: 'Minas Gerais', action: 'acabou de finalizar o pedido' },
    { id: 5, name: 'Ana Paula', city: 'Paraná', action: 'acabou de garantir o ovo de Páscoa' },
    { id: 6, name: 'Carlos', city: 'Santa Catarina', action: 'acabou de receber o pedido' },
    { id: 7, name: 'Juliana', city: 'Pernambuco', action: 'acabou de participar da ação' },
    { id: 8, name: 'Roberto', city: 'Ceará', action: 'acabou de finalizar o pedido' }
  ];

  useEffect(() => {
    const showRandomNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    const interval = setInterval(showRandomNotification, 40000);
    
    // Mostrar primeira notificação após 5 segundos
    const initialTimeout = setTimeout(showRandomNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cep') {
      formattedValue = formatCEP(value);
      
      const numbers = value.replace(/\D/g, '');
      if (numbers.length === 8) {
        buscarCEP(numbers);
      }
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const buscarCEP = async (cep: string) => {
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    };

    let hasError = false;

    if (!formData.cep.trim()) {
      newErrors.cep = 'Por favor, insira o CEP';
      hasError = true;
    } else if (formData.cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'Por favor, insira um CEP válido';
      hasError = true;
    }

    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Por favor, insira o endereço';
      hasError = true;
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Por favor, insira o número';
      hasError = true;
    }

    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Por favor, insira o bairro';
      hasError = true;
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Por favor, insira a cidade';
      hasError = true;
    }

    if (!formData.estado.trim()) {
      newErrors.estado = 'Por favor, insira o estado';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    navigate('/checkout/pagamento', { 
      state: { 
        product,
        dadosPessoais,
        endereco: formData,
        orderBump: location.state?.orderBump || false,
        bumpPrice: location.state?.bumpPrice || 0,
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Título */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Endereço de Entrega
            </h1>
            <p className="text-lg text-gray-600">
              Informe o endereço para receber seu produto
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Dados de Entrega</h2>
                
                <div className="space-y-5">
                  {/* CEP */}
                  <div>
                    <label htmlFor="cep" className="block text-sm font-semibold text-gray-700 mb-2">
                      CEP *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                          errors.cep ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="00000-000"
                        maxLength={9}
                        style={{ fontSize: '16px' }}
                      />
                      {isLoadingCep && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <i className="ri-loader-4-line text-[#28a745] text-xl animate-spin"></i>
                        </div>
                      )}
                    </div>
                    {errors.cep && (
                      <p className="mt-1 text-sm text-red-600">{errors.cep}</p>
                    )}
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">
                        O endereço será preenchido automaticamente
                      </p>
                      <a
                        href="https://buscacepinter.correios.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer whitespace-nowrap"
                      >
                        Não sei meu CEP
                      </a>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <label htmlFor="endereco" className="block text-sm font-semibold text-gray-700 mb-2">
                      Endereço *
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                        errors.endereco ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Rua, Avenida, etc."
                      style={{ fontSize: '16px' }}
                    />
                    {errors.endereco && (
                      <p className="mt-1 text-sm text-red-600">{errors.endereco}</p>
                    )}
                  </div>

                  {/* Número e Complemento */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="numero" className="block text-sm font-semibold text-gray-700 mb-2">
                        Número *
                      </label>
                      <input
                        type="text"
                        id="numero"
                        value={formData.numero}
                        onChange={(e) => handleInputChange('numero', e.target.value)}
                        className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                          errors.numero ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                        style={{ fontSize: '16px' }}
                      />
                      {errors.numero && (
                        <p className="mt-1 text-sm text-red-600">{errors.numero}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="complemento" className="block text-sm font-semibold text-gray-700 mb-2">
                        Complemento
                      </label>
                      <input
                        type="text"
                        id="complemento"
                        value={formData.complemento}
                        onChange={(e) => handleInputChange('complemento', e.target.value)}
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all"
                        placeholder="Apto, Bloco, etc."
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </div>

                  {/* Bairro */}
                  <div>
                    <label htmlFor="bairro" className="block text-sm font-semibold text-gray-700 mb-2">
                      Bairro *
                    </label>
                    <input
                      type="text"
                      id="bairro"
                      value={formData.bairro}
                      onChange={(e) => handleInputChange('bairro', e.target.value)}
                      className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                        errors.bairro ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Nome do bairro"
                      style={{ fontSize: '16px' }}
                    />
                    {errors.bairro && (
                      <p className="mt-1 text-sm text-red-600">{errors.bairro}</p>
                    )}
                  </div>

                  {/* Cidade e Estado */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cidade" className="block text-sm font-semibold text-gray-700 mb-2">
                        Cidade *
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                          errors.cidade ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Sua cidade"
                        style={{ fontSize: '16px' }}
                      />
                      {errors.cidade && (
                        <p className="mt-1 text-sm text-red-600">{errors.cidade}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-2">
                        Estado *
                      </label>
                      <input
                        type="text"
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                        className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#28a745] transition-all ${
                          errors.estado ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="UF"
                        maxLength={2}
                        style={{ fontSize: '16px' }}
                      />
                      {errors.estado && (
                        <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Informações de Entrega - Mobile */}
                <div className="mt-6 lg:hidden bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img 
                        src="https://readdy.ai/api/search-image?query=correios%20brazil%20post%20office%20logo%20official%20yellow%20blue%20colors%20simple%20clean%20background%20high%20quality&width=100&height=100&seq=correios-logo-mobile&orientation=squarish"
                        alt="Correios"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Entrega via PAC Correios</p>
                      <p className="text-xs text-gray-600">Prazo estimado: até 7 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="ri-shield-check-line text-[#28a745]"></i>
                    <span>Entrega segura e rastreável</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-[#28a745] hover:bg-[#218838] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg whitespace-nowrap cursor-pointer"
                >
                  Continuar para Pagamento
                </button>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
                
                {/* Produto */}
                <div className="mb-6">
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      GRÁTIS
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-semibold text-green-800 text-center">
                      Produto promocional da ação social
                    </p>
                    <p className="text-xs text-green-700 text-center mt-1">
                      Ovo de Páscoa especial
                    </p>
                  </div>
                </div>

                {/* Valores */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Ovo de Páscoa:</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-3 border-b-2 border-gray-200">
                    <span className="text-gray-700">Taxa de entrega:</span>
                    <span className="font-semibold text-gray-900">
                      R$ {shippingCost.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-[#28a745]">
                      R$ {shippingCost.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Destaque */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <i className="ri-information-line text-yellow-600 text-xl flex-shrink-0 mt-0.5"></i>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Você paga apenas a taxa de entrega.</span> O produto é 100% gratuito!
                    </p>
                  </div>
                </div>

                {/* Informações de Entrega - Desktop */}
                <div className="hidden lg:block bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img 
                        src="https://readdy.ai/api/search-image?query=correios%20brazil%20post%20office%20logo%20official%20yellow%20blue%20colors%20simple%20clean%20background%20high%20quality&width=100&height=100&seq=correios-logo-desktop&orientation=squarish"
                        alt="Correios"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Entrega via PAC Correios</p>
                      <p className="text-xs text-gray-600">Prazo estimado: até 7 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <i className="ri-shield-check-line text-[#28a745]"></i>
                    <span>Entrega segura e rastreável</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-[#28a745] text-xl"></i>
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-lock-line text-[#28a745] text-xl"></i>
                <span>Compra segura</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-truck-line text-[#28a745] text-xl"></i>
                <span>Entrega garantida</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notificação Flutuante */}
      {showNotification && currentNotification && (
        <div className="fixed bottom-4 left-4 z-50 animate-slideIn">
          <div className="bg-white rounded-lg shadow-2xl p-4 max-w-sm border-2 border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={product.image}
                  alt="Produto"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {currentNotification.name} de {currentNotification.city}
                </p>
                <p className="text-xs text-gray-600">
                  {currentNotification.action}
                </p>
              </div>
              <div className="flex-shrink-0">
                <i className="ri-checkbox-circle-fill text-green-500 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}