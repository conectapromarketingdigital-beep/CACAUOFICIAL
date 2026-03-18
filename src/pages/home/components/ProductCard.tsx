import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate('/carrinho', { state: { product } });
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 cursor-pointer"
        aria-label="Adicionar aos favoritos"
      >
        <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-gray-600'} text-base`}></i>
      </button>
      <div className="relative w-full h-36 sm:h-48 md:h-64 bg-gray-50 overflow-hidden">
        <img
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          src={product.image}
        />
        <div className="absolute bottom-2 left-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full border border-green-200">
          Gratuito
        </div>
      </div>
      <div className="p-2 md:p-4">
        <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-2 md:mb-3 line-clamp-2 min-h-[32px] md:min-h-[40px]">
          {product.name}
        </h3>
        <div className="mb-2 md:mb-4">
          <p className="text-xs text-gray-400 mb-0.5">Preço de:</p>
          <p className="text-sm md:text-base text-gray-400 line-through mb-1.5">
            R$ {product.originalPrice ? product.originalPrice.toFixed(2) : product.price.toFixed(2)}
          </p>
          <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold px-2.5 py-1 rounded-md mb-1.5">
            <i className="ri-gift-line text-sm"></i>
            <span className="text-sm md:text-base">GRÁTIS</span>
          </div>
          <p className="text-xs text-gray-500">
            Você paga apenas o frete
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 md:py-3 px-2 md:px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap cursor-pointer text-xs md:text-sm"
        >
          <i className="ri-shopping-cart-line text-base md:text-lg"></i>
          <span>Garantir Agora</span>
        </button>
      </div>
    </div>
  );
}
