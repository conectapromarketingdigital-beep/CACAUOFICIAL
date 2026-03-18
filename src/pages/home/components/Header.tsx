export default function Header() {
  return (
    <header className="bg-[#2d2d2d] text-white sticky top-0 z-50">
      <div className="py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a className="flex-shrink-0" href="/">
            <img
              alt="Cacau Show"
              className="h-9 md:h-12 brightness-0 invert"
              src="https://www.cacaushow.com.br/on/demandware.static/Sites-CacauShow-Site/-/default/dw2248b93d/svg/logo_cacau_show.svg"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
