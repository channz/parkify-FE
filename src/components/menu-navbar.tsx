import { Home, LandPlot } from "lucide-react";
import React from "react";

const MenuNavbar = () => {
  return (
    <header
      className="w-full sticky top-0 bg-white/90 dark:bg-black/90 z-50"
      aria-label="navbar"
    >
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
        <Home />
        <LandPlot />
      </nav>
    </header>
  );
};

export default MenuNavbar;
