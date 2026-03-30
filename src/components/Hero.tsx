"use client";

import React from "react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Creat pentru perfectiune",
  subtitle = "Descopera solutii unice si potrivite pentru locuinta ta. Recomandam sa treci chestionarul care ne va ajuta sa intelegem ce va doriti.",
  ctaLabel = "Incepe chestionarul",
  ctaHref = "#game",
}) => {

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-dark">

      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
      </div>

      {/* Gold vertical line decoration */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

        {/* Eyebrow label */}
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6">
          Atelier de Mobila la Comanda
        </p>

        {/* Main title */}
        <h1 className="font-serif text-6xl md:text-8xl text-cream font-light leading-tight mb-6">
          {title}
        </h1>

        {/* Gold divider */}
        <div className="gold-divider"></div>

        {/* Subtitle */}
        <p className="text-sm md:text-base tracking-wider leading-relaxed max-w-xl mx-auto mb-12">
          {subtitle}
        </p>

        {/* CTA Button */}
        <a
          href={ctaHref}
          onClick={(e) => handleScroll(e, ctaHref)}
          className="inline-block border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500"
        >
          {ctaLabel}
        </a>

      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted text-xs tracking-widest uppercase">
          
        </span>
        <div className="w-px h-12 bg-gold opacity-40"></div>
      </div>

    </div>
  );

};

export default Hero;