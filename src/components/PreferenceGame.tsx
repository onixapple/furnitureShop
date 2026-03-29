"use client";

import React, { useState } from "react";
import GameStep from "@/components/GameStep";
import { GameStep as GameStepType, CustomerPreferences, GameOption } from "@/types";

interface PreferenceGameProps {
  onComplete?: (preferences: CustomerPreferences) => void;
}

const steps: GameStepType[] = [
  {
    id: 1,
    question: "What are you furnishing?",
    options: [
      { id: "cat-1", label: "Living Room", value: "sofa", icon: "🛋️" },
      { id: "cat-2", label: "Bedroom", value: "bed", icon: "🛏️" },
      { id: "cat-3", label: "Dining Room", value: "table", icon: "🍽️" },
      { id: "cat-4", label: "Office", value: "chair", icon: "🪑" },
    ] as GameOption[],
  },
  {
    id: 2,
    question: "What style speaks to you?",
    options: [
      { id: "sty-1", label: "Modern", value: "modern", icon: "◼️" },
      { id: "sty-2", label: "Classic", value: "classic", icon: "🏛️" },
      { id: "sty-3", label: "Scandinavian", value: "scandinavian", icon: "🌿" },
      { id: "sty-4", label: "Industrial", value: "industrial", icon: "⚙️" },
    ] as GameOption[],
  },
  {
    id: 3,
    question: "What is your budget range?",
    options: [
      { id: "pr-1", label: "Accessible", value: "budget", icon: "💛" },
      { id: "pr-2", label: "Mid Range", value: "mid", icon: "💎" },
      { id: "pr-3", label: "Luxury", value: "luxury", icon: "👑" },
    ] as GameOption[],
  },
];

const PreferenceGame: React.FC<PreferenceGameProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    category: null,
    style: null,
    priceRange: null,
  });
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (value: string): void => {
    const updatedPreferences: CustomerPreferences = { ...preferences };

    if (currentStep === 0) {
      updatedPreferences.category = value as CustomerPreferences["category"];
    } else if (currentStep === 1) {
      updatedPreferences.style = value as CustomerPreferences["style"];
    } else if (currentStep === 2) {
      updatedPreferences.priceRange = value as CustomerPreferences["priceRange"];
    }

    setPreferences(updatedPreferences);

    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setCompleted(true);
        if (onComplete) {
          onComplete(updatedPreferences);
        }
      }
    }, 400);
  };

  const getSelected = (): string | null => {
    if (currentStep === 0) return preferences.category;
    if (currentStep === 1) return preferences.style;
    if (currentStep === 2) return preferences.priceRange;
    return null;
  };

  const handleRestart = (): void => {
    setCurrentStep(0);
    setPreferences({ category: null, style: null, priceRange: null });
    setCompleted(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-charcoal overflow-hidden">

      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      {!completed ? (
        <div className="w-full flex flex-col items-center justify-center flex-1">

          {/* Step indicator */}
          <div className="flex gap-3 mb-12">
            {steps.map((step: GameStepType, index: number) => (
              <div
                key={step.id}
                className={
                  "w-8 h-px transition-all duration-300 " +
                  (index <= currentStep ? "bg-gold" : "bg-muted")
                }
              >
              </div>
            ))}
          </div>

          {/* Current step */}
          <GameStep
            question={steps[currentStep].question}
            options={steps[currentStep].options}
            onSelect={handleSelect}
            selected={getSelected()}
          >
          </GameStep>

          {/* Step counter */}
          <p className="text-muted text-xs tracking-widest uppercase mt-12">
            {currentStep + 1} / {steps.length}
          </p>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-6">

          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Your Profile
          </p>

          <h2 className="font-serif text-5xl text-cream font-light mb-4">
            Perfect. We Know Just What You Need.
          </h2>

          <div className="gold-divider"></div>

          <div className="flex gap-8 mt-8 text-center">
            <div>
              <p className="text-muted text-xs tracking-widest uppercase mb-1">
                Room
              </p>
              <p className="text-cream text-sm capitalize">
                {preferences.category}
              </p>
            </div>
            <div>
              <p className="text-muted text-xs tracking-widest uppercase mb-1">
                Style
              </p>
              <p className="text-cream text-sm capitalize">
                {preferences.style}
              </p>
            </div>
            <div>
              <p className="text-muted text-xs tracking-widest uppercase mb-1">
                Budget
              </p>
              <p className="text-cream text-sm capitalize">
                {preferences.priceRange}
              </p>
            </div>
          </div>
            <a
          
            href="#catalog"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500 mt-12"
          >
            View Your Matches
          </a>

          <button
            onClick={handleRestart}
            className="text-muted text-xs tracking-widest uppercase mt-6 hover:text-gold transition-colors duration-300"
          >
            Start Over
          </button>

        </div>
      )}

    </div>
  );
};

export default PreferenceGame;
