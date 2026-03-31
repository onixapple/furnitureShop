"use client";

import React, { useEffect, useState } from "react";
import { Material, MaterialSelection } from "@/types";

interface MaterialOption {
  name: string;
  image: string;
}

const palOptions: MaterialOption[] = [
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

const mdfOptions: MaterialOption[] = [
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

interface ColorPickerProps {
  onComplete: (materials: MaterialSelection) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onComplete }) => {
  const [selectedPal, setSelectedPal] = useState<Material | null>(null);
  const [selectedMdf, setSelectedMdf] = useState<Material | null>(null);

  const handleSelectPal = (option: MaterialOption): void => {
    const material: Material = { name: option.name, image: option.image };
    setSelectedPal(material);
  };

  const handleSelectMdf = (option: MaterialOption): void => {
    const material: Material = { name: option.name, image: option.image };
    setSelectedMdf(material);
  };

  useEffect(() => {
    setSelectedPal({ name: palOptions[0].name, image: palOptions[0].image });
    setSelectedMdf({ name: mdfOptions[0].name, image: mdfOptions[0].image });
  }, []);
  
  const handleContinue = (): void => {
    setTimeout(() => {
      onComplete({
        pal: selectedPal,
        mdf: selectedMdf,
      });
    }, 0);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Title */}
      <div className="text-center py-6 px-6">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Alegeti Materialele
        </p>
        <h2 className="font-serif text-3xl text-cream font-light">
          Selectati culoarea dorita
        </h2>
        <div className="gold-divider"></div>
      </div>

      {/* Two columns */}
      <div className="flex flex-1 overflow-hidden">
        {/* PAL column */}
        <div className="flex-1 flex flex-col border-r border-gold border-opacity-20 overflow-hidden">
          {/* PAL Header */}
          <div
  className="px-6 py-4 border-b border-gold border-opacity-10 relative overflow-hidden"
  style={{
    backgroundImage: selectedPal ? `url(${selectedPal.image})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay so text stays readable */}
  {selectedPal && (
  <div
    className="absolute inset-0"
    style={{ backgroundColor: "rgba(15,15,15,0.2)" }}
  >
  </div>
)}

  <div className="relative z-10">
    <h3 className="font-serif text-2xl text-gold font-light">
      PAL
    </h3>
    <p className="text-muted text-xs tracking-widest uppercase mt-1">
      Material pentru corpus
    </p>
    {selectedPal && (
      <p className="text-cream text-xs tracking-widest mt-1">
        {selectedPal.name}
      </p>
    )}
  </div>

</div>

          {/* PAL Grid */}
          <div
            className="overflow-y-auto p-4"
            style={{ maxHeight: "calc(100% - 100px)" }}
          >
            <div className="grid grid-cols-5 gap-2">
              {palOptions.map((option: MaterialOption) => (
                <button
                  key={option.name}
                  onClick={() => handleSelectPal(option)}
                  className="flex flex-col items-center gap-1 p-0 transition-all duration-200"
                  style={{
                    border:
                      selectedPal?.name === option.name
                        ? "2px solid #C9A84C"
                        : "2px solid transparent",
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="text-cream text-xs tracking-wide text-center leading-tight">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MDF column */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* MDF Header */}
          <div
  className="px-6 py-4 border-b border-gold border-opacity-10 relative overflow-hidden"
  style={{
    backgroundImage: selectedMdf ? `url(${selectedMdf.image})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay so text stays readable */}
  {selectedMdf && (
  <div
    className="absolute inset-0"
    style={{ backgroundColor: "rgba(15,15,15,0.2)" }}
  >
  </div>
)}

  <div className="relative z-10">
    <h3 className="font-serif text-2xl text-gold font-light">
      MDF
    </h3>
    <p className="text-muted text-xs tracking-widest uppercase mt-1">
      Material pentru fasade
    </p>
    {selectedMdf && (
      <p className="text-cream text-xs tracking-widest mt-1">
        {selectedMdf.name}
      </p>
    )}
  </div>

</div>

          {/* MDF Grid */}
          <div
            className="overflow-y-auto p-4"
            style={{ maxHeight: "calc(100% - 100px)" }}
          >
            <div className="grid grid-cols-5 gap-2">
              {mdfOptions.map((option: MaterialOption) => (
                <button
                  key={option.name}
                  onClick={() => handleSelectMdf(option)}
                  className="flex flex-col items-center gap-1 p-0 transition-all duration-200"
                  style={{
                    border:
                      selectedMdf?.name === option.name
                        ? "2px solid #C9A84C"
                        : "2px solid transparent",
                  }}
                >
                  <img
                    src={option.image}
                    alt={option.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                  <span className="text-cream text-xs tracking-wide text-center leading-tight">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue / Skip button */}
      <div className="flex justify-center gap-6 py-4 border-t border-gold border-opacity-10">
        <button
          onClick={handleContinue}
          className="border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-3 hover:bg-gold hover:text-dark transition-all duration-500"
        >
          {selectedPal || selectedMdf ? "Continuati" : "Omiteti"}
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
