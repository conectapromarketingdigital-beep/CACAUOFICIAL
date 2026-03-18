export default function HeroSection() {
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-[#8B4513] leading-tight">
            Ação Social Especial da{" "}
            <span className="text-[#D2691E] underline decoration-[#D2691E]/40">Cacau Show</span>
            {": "}Ganhe Ovos de Páscoa Grátis e{" "}
            <span className="text-green-600">Pague Somente o Frete</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Aproveite esta oportunidade única e receba seus ovos de Páscoa sem pagar pelo produto.
            Você paga apenas o custo do envio até a sua casa.
          </p>
        </div>
      </div>
    </div>
  );
}
