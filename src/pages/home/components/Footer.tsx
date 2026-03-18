export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <img
              alt="Cacau Show"
              className="h-10 md:h-12 mb-4 brightness-0 invert"
              src="https://www.cacaushow.com.br/on/demandware.static/Sites-CacauShow-Site/-/default/dw2248b93d/svg/logo_cacau_show.svg"
            />
            <p className="text-sm text-gray-200">
              A Cacau Show é a maior rede de chocolates finos do mundo, com mais de 2.000 lojas
              espalhadas pelo Brasil.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Seja um Revendedor
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Seja um Franqueado
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Área para Empresas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Nossas Marcas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Políticas</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  Política de Trocas
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline cursor-pointer">
                  SAC
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4">Siga-nos</h3>
            <div className="flex gap-3 md:gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                aria-label="YouTube"
              >
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                aria-label="TikTok"
              >
                <i className="ri-tiktok-fill text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-gray-200">
          <p>© 2024 Cacau Show. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}