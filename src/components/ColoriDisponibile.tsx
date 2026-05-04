"use client";

import React, { useState } from "react";

interface Swatch {
  name: string;
  image: string;
}

const palOptions: Swatch[] = [
  { name: "Hansa beige", image: "/materials/pal/119.jpg" },
  { name: "Graphite", image: "/materials/pal/162.jpg" },
  { name: "Anthracite", image: "/materials/pal/164.jpg" },
  { name: "Summerrain grey", image: "/materials/pal/171.jpg" },
  { name: "Black", image: "/materials/pal/190.png" },
  { name: "Vanilla", image: "/materials/pal/1301.png" },
  { name: "Olive", image: "/materials/pal/2508.jpg" },
  { name: "Capuccino", image: "/materials/pal/3053.jpg" },
  { name: "Lava grey", image: "/materials/pal/3057.jpg" },
  { name: "Praline", image: "/materials/pal/3062.jpg" },
  { name: "Toffee", image: "/materials/pal/3188.jpg" },
  { name: "Jasmine", image: "/materials/pal/3266.jpg" },
  { name: "Lemon Grass", image: "/materials/pal/6931.jpg" },
  { name: "Cashmere", image: "/materials/pal/6933.jpg" },
  { name: "Nymphaea alba", image: "/materials/pal/8681.jpg" },
];

const mdfOptions: Swatch[] = [
  { name: "AGT 368", image: "/materials/mdf/AGT368.jpg" },
  { name: "AGT 388", image: "/materials/mdf/AGT388.jpg" },
  { name: "AGT 389", image: "/materials/mdf/AGT389.jpg" },
  { name: "AGT 391", image: "/materials/mdf/AGT391.jpg" },
  { name: "AGT 397", image: "/materials/mdf/AGT397.jpg" },
  { name: "AGT 723", image: "/materials/mdf/AGT723.jpg" },
  { name: "AGT 729", image: "/materials/mdf/AGT729.jpg" },
  { name: "AGT 730", image: "/materials/mdf/AGT730.jpg" },
  { name: "AGT 732", image: "/materials/mdf/AGT732.jpg" },
  { name: "AGT 734", image: "/materials/mdf/AGT734.jpg" },
  { name: "AGT 3032", image: "/materials/mdf/AGT3032.jpg" },
  { name: "AGT 6008", image: "/materials/mdf/AGT6008.jpg" },
  { name: "AGT 6018", image: "/materials/mdf/AGT6018.jpg" },
  { name: "AGT 6019", image: "/materials/mdf/AGT6019.jpg" },
  { name: "AGT 633", image: "/materials/mdf/AGT633.jpg" },
  { name: "AGT 677", image: "/materials/mdf/AGT677.jpg" },
  { name: "AGT 678", image: "/materials/mdf/AGT678.jpg" },
  { name: "AGT 735", image: "/materials/mdf/AGT735.jpg" },
  { name: "AGT 736", image: "/materials/mdf/AGT736.jpg" },
  { name: "AGT 738", image: "/materials/mdf/AGT738.jpg" },
];

type Tab = "pal" | "mdf";

const ColoriDisponibile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("pal");
  const [selected, setSelected] = useState<Swatch>(palOptions[0]);

  const swatches = activeTab === "pal" ? palOptions : mdfOptions;

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelected(tab === "pal" ? palOptions[0] : mdfOptions[0]);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark overflow-y-auto px-6 py-20 md:py-16">

      {/* Vertical gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-12 right-12 h-px bg-gold opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-10 md:mb-14 w-full">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
          Materiale
        </p>
        <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
          Culori Disponibile
        </h2>
        <div className="gold-divider" />
        <p className="text-muted text-sm tracking-wide mt-6 max-w-md mx-auto leading-relaxed">
          Fiecare piesa este finisata in culoarea aleasa de dumneavoastra, din paleta noastra de materiale premium.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-0 mb-10 border border-gold/20">
        {(["pal", "mdf"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={
              "text-xs tracking-[0.3em] uppercase px-10 py-3 transition-all duration-400 " +
              (activeTab === tab
                ? "bg-gold text-dark"
                : "text-muted hover:text-cream hover:bg-white/5")
            }
          >
            {tab === "pal" ? "PAL — Corpus" : "MDF — Fasade"}
          </button>
        ))}
      </div>

      {/* Main content: preview + grid */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">

        {/* Left — large preview */}
        <div className="flex flex-col items-center md:items-start md:sticky md:top-8">
          <div className="relative w-full aspect-square max-w-[240px] md:max-w-none overflow-hidden rounded-sm shadow-2xl shadow-black/60 mx-auto md:mx-0">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Subtle inner border */}
            <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none" />
          </div>

          <div className="mt-5 text-center md:text-left">
            <p className="font-serif text-2xl text-cream font-light tracking-wide">
              {selected.name}
            </p>
            <p className="text-gold text-xs tracking-[0.35em] uppercase mt-2">
              {activeTab === "pal" ? "PAL — Corpus" : "MDF — Fasade"}
            </p>
          </div>

          {/* Decorative line */}
          <div className="mt-5 w-12 h-px bg-gold opacity-40 mx-auto md:mx-0" />
        </div>

        {/* Right — swatch grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {swatches.map((swatch) => {
            const isActive = selected.name === swatch.name;
            return (
              <button
                key={swatch.name}
                onClick={() => setSelected(swatch)}
                className="group flex flex-col items-center gap-2 focus:outline-none"
              >
                <div
                  className={
                    "relative w-full aspect-square overflow-hidden transition-all duration-300 " +
                    (isActive
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-dark scale-105 shadow-lg shadow-gold/20"
                      : "ring-1 ring-white/10 hover:ring-gold/50 hover:scale-105 hover:shadow-md hover:shadow-gold/10")
                  }
                >
                  <img
                    src={swatch.image}
                    alt={swatch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className={
                    "text-[9px] tracking-widest uppercase text-center leading-tight transition-colors duration-200 " +
                    (isActive ? "text-gold" : "text-muted group-hover:text-cream")
                  }
                >
                  {swatch.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-12 right-12 h-px bg-gold opacity-10 pointer-events-none" />
    </div>
  );
};

export default ColoriDisponibile;
