"use client";

import React from "react";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Home", href: "#hero" },
  { label: "Discover", href: "#game" },
  { label: "Catalog", href: "#catalog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-12 py-6 flex justify-between items-center bg-dark bg-opacity-80 backdrop-blur-sm">
      <span className="font-serif text-2xl text-gold tracking-widest uppercase">
        Maison
      </span>
      <div className="flex gap-10">
        {links.map((link: NavLink) => (
          <a    
            key={link.href}
            href={link.href}
            onClick={(e) => handleScroll(e, link.href)}
            className="text-cream text-sm tracking-widest uppercase hover:text-gold transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );

};

export default Navbar;