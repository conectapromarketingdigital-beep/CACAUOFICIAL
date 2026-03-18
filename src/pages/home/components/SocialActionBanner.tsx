export default function SocialActionBanner() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#D2691E] rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative px-6 py-10 md:px-12 md:py-14">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#8B4513] font-bold px-4 py-2 rounded-full mb-6 shadow-lg">
              <i className="ri-heart-fill text-lg"></i>
              <span className="text-sm md:text-base whitespace-nowrap">AÇÃO SOCIAL ESPECIAL</span>
              <i className="ri-heart-fill text-lg"></i>
            </div>

            {/* Main heading */}
            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Receba Seus Ovos de Páscoa{" "}
              <span className="text-yellow-300">Totalmente Grátis</span>
            </h2>

            {/* Shipping info */}
            <p className="mt-4 text-white/90 text-sm md:text-base font-medium">
              Você paga <span className="font-bold text-yellow-300">apenas o frete</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
