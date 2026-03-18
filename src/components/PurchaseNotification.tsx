import { useState, useEffect } from 'react';
import { products, featuredProducts } from '../mocks/products';

interface Notification {
  id: number;
  name: string;
  city: string;
  productName: string;
  productImage: string;
}

const customerNames = [
  'Gabriela', 'Felipe', 'Mariana', 'João', 'Ana Paula', 'Carlos', 
  'Juliana', 'Roberto', 'Fernanda', 'Lucas', 'Camila', 'Rafael',
  'Patricia', 'Bruno', 'Amanda', 'Diego', 'Beatriz', 'Thiago'
];

const cities = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Curitiba', 
  'Porto Alegre', 'Salvador', 'Brasília', 'Fortaleza', 'Recife',
  'Manaus', 'Belém', 'Goiânia', 'Campinas', 'São Luís', 'Natal'
];

export default function PurchaseNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const allProducts = [...products, ...featuredProducts];

    const showRandomNotification = () => {
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      const randomName = customerNames[Math.floor(Math.random() * customerNames.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      const notification: Notification = {
        id: Date.now(),
        name: randomName,
        city: randomCity,
        productName: randomProduct.name,
        productImage: randomProduct.image
      };

      setCurrentNotification(notification);
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    // Primeira notificação após 5 segundos
    const initialTimeout = setTimeout(showRandomNotification, 5000);

    // Notificações subsequentes a cada 60 segundos
    const interval = setInterval(showRandomNotification, 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!showNotification || !currentNotification) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-slideIn max-w-[calc(100vw-2rem)] sm:max-w-sm">
      <div className="bg-white rounded-lg shadow-2xl p-3 sm:p-4 border-2 border-green-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
            <img
              src={currentNotification.productImage}
              alt="Produto"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">
              {currentNotification.name} de {currentNotification.city}
            </p>
            <p className="text-xs text-gray-600 line-clamp-2">
              acabou de garantir {currentNotification.productName}
            </p>
          </div>
          <div className="flex-shrink-0">
            <i className="ri-checkbox-circle-fill text-green-500 text-xl sm:text-2xl"></i>
          </div>
        </div>
      </div>

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}