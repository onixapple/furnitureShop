"use client";

import React from "react";
import { GameOption } from "@/types";

interface GameStepProps {
  question: string;
  options: GameOption[];
  onSelect: (value: string) => void;
  selected: string | null;
}

const GameStep: React.FC<GameStepProps> = ({
  question,
  options,
  onSelect,
  selected,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-6">

      <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
        Tell Us Your Taste
      </p>

      <h2 className="font-serif text-4xl md:text-5xl text-cream font-light text-center mb-4">
        {question}
      </h2>

      <div className="gold-divider"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full max-w-4xl">
        {options.map((option: GameOption) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.value)}
            className={
              "flex flex-col items-center justify-center border px-6 py-8 transition-all duration-300 cursor-pointer " +
              (selected === option.value
                ? "border-gold bg-gold text-dark"
                : "border-muted text-cream hover:border-gold hover:text-gold")
            }
          >
            {option.icon && (
              <span className="text-3xl mb-3">
                {option.icon}
              </span>
            )}
            <span className="text-xs tracking-widest uppercase">
              {option.label}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default GameStep;