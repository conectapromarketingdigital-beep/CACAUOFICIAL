import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  featured?: boolean;
}

export default function ProductGrid({ products, featured = false }: ProductGridProps) {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {featured && (
        <div className="flex items-center gap-3 md:gap-4 my-8 md:my-10">
          <div className="flex-1 h-px bg-[#D2691E]/30"></div>
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-[#8B4513] to-[#D2691E] rounded-full">
            <i className="ri-star-fill text-yellow-300 text-sm"></i>
            <span className="text-white text-xs md:text-sm font-semibold whitespace-nowrap">
              Produtos em Destaque
            </span>
            <i className="ri-star-fill text-yellow-300 text-sm"></i>
          </div>
          <div className="flex-1 h-px bg-[#D2691E]/30"></div>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6" data-product-shop>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}