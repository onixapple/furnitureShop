"use client";

import React, { useState } from "react";
import { Dimensions } from "@/types";

interface DimensionsStepProps {
  onComplete: (dimensions: Dimensions | null) => void;
}

const DimensionsStep: React.FC<DimensionsStepProps> = ({ onComplete }) => {
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  const handleContinue = (): void => {
    if (width || height) {
      onComplete({ width, height });
    } else {
      onComplete(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6">

      <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
        
      </p>

      <h2 className="font-serif text-4xl md:text-5xl text-cream font-light text-center mb-4">
        Ce marime are obiectul?
      </h2>

      <div className="gold-divider"></div>

      <p className="text-muted text-xs tracking-widest uppercase mt-6 mb-8">
        Pentru a va oferi pretul cat mai apropiat de cel real, introduceti metrajul obiectului, 
        In cazul comenzii,masurile vor fi luate pe loc de un designer profesional.
      </p>

      <div className="flex gap-8 w-full max-w-sm">

        <div className="flex flex-col gap-2 flex-1">
          <label className="text-muted text-xs tracking-widest uppercase">
            Latime (cm)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWidth(e.target.value)
            }
            placeholder="e.g. 120"
            className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
          >
          </input>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label className="text-muted text-xs tracking-widest uppercase">
            Inaltime (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeight(e.target.value)
            }
            placeholder="e.g. 200"
            className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
          >
          </input>
        </div>

      </div>

      <div className="flex gap-6 mt-12">
        <button
          onClick={handleContinue}
          className="border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500"
        >
          {width || height ? "Continua" : "Omite"}
        </button>
      </div>

    </div>
  );
};

export default DimensionsStep;