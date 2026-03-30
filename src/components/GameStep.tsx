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

      <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-4xl">
        {options.map((option: GameOption) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.value)}
            className={
              "overflow-hidden transition-all duration-300 cursor-pointer " +
              (selected === option.value
                ? "ring-2 ring-gold scale-105"
                : "ring-1 ring-muted hover:ring-gold hover:scale-105")
            }
            style={{ width: "192px", height: "192px", position: "relative", display: "block" }}
          >

            {/* Background image */}
            <img
              src={option.image}
              alt={option.label}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: selected === option.value
                  ? "rgba(15,15,15,0.3)"
                  : "rgba(15,15,15,0.5)",
                transition: "background-color 0.3s",
              }}
            >
            </div>

            {/* Selected gold border */}
            {selected === option.value && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid #C9A84C",
                }}
              >
              </div>
            )}

            {/* Label */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "12px",
                background: "linear-gradient(to top, rgba(15,15,15,0.9), transparent)",
              }}
            >
              <span className="text-cream text-xs tracking-widest uppercase">
                {option.label}
              </span>
            </div>

          </button>
        ))}
      </div>

    </div>
  );
};

export default GameStep;