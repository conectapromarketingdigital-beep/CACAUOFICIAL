import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-40">
      <button
        onClick={scrollToTop}
        className="w-11 h-11 md:w-12 md:h-12 bg-[#8B4513] text-white rounded-full shadow-lg hover:bg-[#6B3410] transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Voltar ao topo"
      >
        <i className="ri-arrow-up-line text-xl"></i>
      </button>
    </div>
  );
}