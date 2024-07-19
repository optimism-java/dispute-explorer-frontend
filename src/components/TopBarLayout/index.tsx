export const TopBarLayout: React.FC = () => {
  return (
    <nav className="z-10 flex h-16 w-full items-center justify-between px-4">
      <div className="hidden w-full md:flex">ExplorerDetails</div>
      <div className="flex items-center gap-3">
        NavMenusSection
        <div className="relative -top-[2px] hidden md:block">
          ThemeModeButton
        </div>
      </div>
      <div className="relative -top-[2px] md:hidden">ThemeModeButton</div>
    </nav>
  );
};
