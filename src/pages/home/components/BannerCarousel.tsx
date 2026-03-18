import { useState, useEffect } from 'react';

export default function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/ee8534aaae5f3785175cc42860bfd0d5.jpeg',
    'https://static.readdy.ai/image/ddd27c74337d78412f71885615407497/e7001f0db8f455a0f0449d2c79900690.jpeg'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full">
              <img alt={`Banner Páscoa ${index + 1}`} className="w-full h-auto" src={banner} />
            </div>
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === index ? 'bg-white scale-110' : 'bg-white/50'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}