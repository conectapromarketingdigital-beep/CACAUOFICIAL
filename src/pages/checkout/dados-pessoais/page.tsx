import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PurchaseNotification from '../../../components/PurchaseNotification';
import Header from '../../home/components/Header';
import Footer from '../../home/components/Footer';

function validarCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean[i]) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(clean[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean[i]) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(clean[10])) return false;

  return true;
}

function formatarCPF(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  return clean
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatarCEP(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 8);
  return clean.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
}

function formatarCelular(value: string): string {
  const clean = value.replace(/\D/g, '').slice(0, 11);
  return clean
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
}

export default function DadosPessoaisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {
    id: 1,
    name: 'Ovo de Páscoa Cacau Show Premium',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/b7e4c0216cbdf9b1efac75e969780eee.jpeg'
  };
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [personalData, setPersonalData] = useState({
    nome: '',
    email: '',
    cpf: '',
    celular: ''
  });

  const [addressData, setAddressData] = useState({
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [errors, setErrors] = useState<{ cpf?: string; cep?: string }>({});

  const handleCPFChange = (value: string) => {
    const formatted = formatarCPF(value);
    setPersonalData({ ...personalData, cpf: formatted });
    if (errors.cpf) setErrors({ ...errors, cpf: undefined });
  };

  const handleCelularChange = (value: string) => {
    const formatted = formatarCelular(value);
    setPersonalData({ ...personalData, celular: formatted });
  };

  const handleContinuar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarCPF(personalData.cpf)) {
      setErrors({ ...errors, cpf: 'CPF inválido. Verifique os números digitados.' });
      return;
    }
    setErrors({ ...errors, cpf: undefined });
    setShowAddressForm(true);
    setTimeout(() => {
      document.getElementById('address-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCepChange = async (value: string) => {
    const formatted = formatarCEP(value);
    const clean = formatted.replace(/\D/g, '');
    setAddressData({ ...addressData, cep: formatted, endereco: '', bairro: '', cidade: '', estado: '' });
    if (errors.cep) setErrors({ ...errors, cep: undefined });

    if (clean.length === 8) {
      setLoading(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        const data = await response.json();

        if (data.erro) {
          setErrors({ ...errors, cep: 'CEP não encontrado. Verifique e tente novamente.' });
          setAddressData(prev => ({ ...prev, cep: formatted, endereco: '', bairro: '', cidade: '', estado: '' }));
        } else {
          setErrors({ ...errors, cep: undefined });
          setAddressData(prev => ({
            ...prev,
            cep: formatted,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        }
      } catch {
        setErrors({ ...errors, cep: 'Erro ao buscar CEP. Verifique sua conexão.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePagarAgora = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCep = addressData.cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setErrors({ ...errors, cep: 'Digite um CEP válido com 8 dígitos.' });
      return;
    }
    if (errors.cep) return;

    navigate('/checkout/pagamento', {
      state: {
        product,
        dadosPessoais: {
          nomeCompleto: personalData.nome,
          email: personalData.email,
          cpf: personalData.cpf,
          celular: personalData.celular,
        },
        endereco: addressData,
        orderBump: location.state?.orderBump || false,
        bumpPrice: location.state?.bumpPrice || 0,
      }
    });
  };

  const orderBump = location.state?.orderBump || false;
  const bumpPrice = location.state?.bumpPrice || 0;

  const bumpProduct = {
    name: 'Ovo de Páscoa Dreams Dubai Pistache 400g',
    image: 'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/68f8043d00ea9da06c98a2877f8dd39f.webp',
  };

  const frete = 29.90;
  const total = orderBump ? frete + bumpPrice : frete;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                  1
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Dados Pessoais</h2>
              </div>

              <form onSubmit={handleContinuar}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
                    <input
                      type="text"
                      required
                      value={personalData.nome}
                      onChange={(e) => setPersonalData({ ...personalData, nome: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      value={personalData.email}
                      onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                    <input
                      type="text"
                      required
                      value={personalData.cpf}
                      onChange={(e) => handleCPFChange(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${errors.cpf ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                      placeholder="000.000.000-00"
                      maxLength={14}
                    />
                    {errors.cpf && (
                      <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                        <i className="ri-error-warning-line"></i>
                        {errors.cpf}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
                    <input
                      type="tel"
                      required
                      value={personalData.celular}
                      onChange={(e) => handleCelularChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                    />
                  </div>
                </div>

                {!showAddressForm && (
                  <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors text-base sm:text-lg whitespace-nowrap cursor-pointer"
                  >
                    Continuar
                  </button>
                )}
              </form>
            </div>

            {/* Address Section */}
            {showAddressForm && (
              <div
                id="address-section"
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 animate-fadeIn"
                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
                    2
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Endereço de Entrega</h2>
                </div>

                <form onSubmit={handlePagarAgora}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                      <input
                        type="text"
                        required
                        value={addressData.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${errors.cep ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        placeholder="00000-000"
                        maxLength={9}
                      />
                      {errors.cep && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                          <i className="ri-error-warning-line"></i>
                          {errors.cep}
                        </p>
                      )}
                      {loading && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <i className="ri-loader-4-line animate-spin"></i>
                          Buscando endereço...
                        </p>
                      )}
                      {!errors.cep && addressData.cidade && (
                        <p className="mt-1.5 text-sm text-green-600 flex items-center gap-1">
                          <i className="ri-checkbox-circle-line"></i>
                          Endereço encontrado!
                        </p>
                      )}
                      <a
                        href="https://buscacepinter.correios.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-700 hover:text-green-900 mt-1 inline-block cursor-pointer"
                      >
                        Não sei meu CEP
                      </a>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                      <input
                        type="text"
                        required
                        value={addressData.endereco}
                        onChange={(e) => setAddressData({ ...addressData, endereco: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        placeholder="Rua, Avenida..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número</label>
                        <input
                          type="text"
                          required
                          value={addressData.numero}
                          onChange={(e) => setAddressData({ ...addressData, numero: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                        <input
                          type="text"
                          value={addressData.complemento}
                          onChange={(e) => setAddressData({ ...addressData, complemento: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Apto, Bloco..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                      <input
                        type="text"
                        required
                        value={addressData.bairro}
                        onChange={(e) => setAddressData({ ...addressData, bairro: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                        placeholder="Nome do bairro"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                        <input
                          type="text"
                          required
                          value={addressData.cidade}
                          onChange={(e) => setAddressData({ ...addressData, cidade: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="Cidade"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                        <input
                          type="text"
                          required
                          value={addressData.estado}
                          onChange={(e) => setAddressData({ ...addressData, estado: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                          placeholder="UF"
                          maxLength={2}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 px-6 rounded-lg transition-colors text-base sm:text-lg whitespace-nowrap cursor-pointer"
                  >
                    Pagar agora
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 lg:sticky lg:top-24">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Resumo do pedido</h3>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{product.name}</p>
                  <span className="inline-block mt-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">GRÁTIS</span>
                </div>
              </div>

              {orderBump && (
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                    <img src={bumpProduct.image} alt={bumpProduct.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{bumpProduct.name}</p>
                    <span className="inline-block mt-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">52% OFF</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 mb-4 mt-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Ovo de Páscoa</span>
                  <span className="font-bold text-green-600">Grátis</span>
                </div>
                {orderBump && (
                  <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-700">Dreams Dubai Pistache</span>
                    <span className="font-bold text-gray-900">R$ {bumpPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-gray-700">Taxa de entrega</span>
                  <span className="font-bold text-gray-900">R$ 29,90</span>
                </div>
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-green-800 font-medium text-center">
                  {orderBump ? 'Frete + adicional incluídos' : 'Você paga apenas a taxa de entrega'}
                </p>
              </div>
            </div>

            {showAddressForm && (
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-fadeIn">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Informações de Entrega</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img
                      src="https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/7b10e981fcbf941489ab4693f94b75cc.png"
                      alt="Correios"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">Entrega pelos Correios</p>
                    <p className="text-xs sm:text-sm text-gray-600">Via PAC</p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-green-800 font-medium">
                    <i className="ri-time-line mr-1"></i>
                    Prazo estimado: até 7 dias
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <i className="ri-shield-check-line text-green-600"></i>
                  <span>Entrega segura e rastreável</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PurchaseNotification />
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
