"use client";

import React, { useState } from "react";

interface NavLink {
  label: string;
  href: string;
}

const links: NavLink[] = [
  { label: "Acasa", href: "#hero" },
  { label: "Catalog", href: "#catalog" },
  { label: "Culori", href: "#culori" },
  { label: "Despre Noi", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 md:py-6 flex justify-between items-center bg-dark/90 backdrop-blur-sm" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
        <span className="font-serif text-xl md:text-2xl text-gold tracking-widest uppercase">
          TeoMob
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10">
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

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[6px] w-10 h-10 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={
              "block w-full h-px bg-gold transition-all duration-300 " +
              (isOpen ? "rotate-45 translate-y-[6px]" : "")
            }
          />
          <span
            className={
              "block w-full h-px bg-gold transition-all duration-300 " +
              (isOpen ? "opacity-0" : "")
            }
          />
          <span
            className={
              "block w-full h-px bg-gold transition-all duration-300 " +
              (isOpen ? "-rotate-45 -translate-y-[6px]" : "")
            }
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-dark bg-opacity-95 flex flex-col items-center justify-center gap-10 md:hidden">
          {links.map((link: NavLink) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-cream text-base tracking-[0.3em] uppercase hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
