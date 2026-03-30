"use client";

import React, { useState } from "react";
import GameStep from "@/components/GameStep";
import ColorPicker from "@/components/ColorPicker";
import {
  CustomerPreferences,
  GameStep as GameStepType,
  GameOption,
  RoomType,
} from "@/types";

interface PreferenceGameProps {
  onComplete?: (preferences: CustomerPreferences) => void;
}

const emptyPreferences: CustomerPreferences = {
  room: null,
  kitchenType: null,
  handles: null,
  doorType: null,
  colors: null,
  priceRange: null,
};

const stepRoom: GameStepType = {
  id: "room",
  question: "What are you looking for?",
  field: "room",
  options: [
    { id: "r1", label: "Kitchen", value: "kitchen", image: "/game/cupe.JPG" },
    { id: "r2", label: "Drawers", value: "drawers", image: "/game/simplu.jpg" },
    { id: "r3", label: "Bathroom", value: "bathrooms", image: "/game/cupe.JPG" },
    { id: "r4", label: "Something Else", value: "other", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

const stepKitchenType: GameStepType = {
  id: "kitchenType",
  question: "Which kitchen style suits you?",
  field: "kitchenType",
  options: [
    { id: "kt1", label: "Classic", value: "classic", image: "/game/cupe.JPG" },
    { id: "kt2", label: "Modern", value: "modern", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

const stepHandles: GameStepType = {
  id: "handles",
  question: "Visible or hidden handles?",
  field: "handles",
  options: [
    { id: "h1", label: "Visible Handles", value: "visible", image: "/game/cupe.JPG" },
    { id: "h2", label: "Hidden Handles", value: "hidden", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

const stepDoorType: GameStepType = {
  id: "doorType",
  question: "How should the doors open?",
  field: "doorType",
  options: [
    { id: "d1", label: "Sliding Doors", value: "sliding", image: "/game/cupe.JPG" },
    { id: "d2", label: "Normal Opening", value: "normal", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

const stepPriceRange: GameStepType = {
  id: "priceRange",
  question: "What is your budget range?",
  field: "priceRange",
  options: [
    { id: "p1", label: "Accessible", value: "budget", image: "/game/cupe.JPG" },
    { id: "p2", label: "Mid Range", value: "mid", image: "/game/cupe.JPG" },
    { id: "p3", label: "Luxury", value: "luxury", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

// Returns the non-color steps for each path
const getNonColorSteps = (preferences: CustomerPreferences): GameStepType[] => {
  const room = preferences.room as RoomType | null;

  if (!room) return [];

  if (room === "kitchen") {
    return [stepKitchenType, stepHandles];
  }

  if (room === "drawers") {
    const steps: GameStepType[] = [stepDoorType];
    if (preferences.doorType === "normal") {
      steps.push(stepHandles);
    }
    steps.push(stepPriceRange);
    return steps;
  }

  if (room === "bathrooms") {
    return [stepHandles, stepPriceRange];
  }

  if (room === "other") {
    return [stepPriceRange];
  }

  return [];
};

const PreferenceGame: React.FC<PreferenceGameProps> = ({ onComplete }) => {
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    ...emptyPreferences,
  });
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const allSteps: GameStepType[] = [stepRoom, ...getNonColorSteps(preferences)];
  const currentStep: GameStepType = allSteps[stepIndex];

  const handleSelect = (value: string): void => {
    const updatedPreferences: CustomerPreferences = {
      ...preferences,
      [currentStep.field]: value,
    };

    setPreferences(updatedPreferences);

    const updatedSteps: GameStepType[] = [
      stepRoom,
      ...getNonColorSteps(updatedPreferences),
    ];

    setTimeout(() => {
      if (stepIndex < updatedSteps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        // All non-color steps done — show color picker
        setShowColorPicker(true);
      }
    }, 400);
  };

  const handleColorComplete = (colors: [string, string]): void => {
    const updatedPreferences: CustomerPreferences = {
      ...preferences,
      colors,
    };
    setPreferences(updatedPreferences);

    setTimeout(() => {
      setShowColorPicker(false);
      setCompleted(true);
      if (onComplete) {
        onComplete(updatedPreferences);
      }
    }, 600);
  };

  const getSelected = (): string | null => {
    const value = preferences[currentStep.field];
    if (Array.isArray(value)) return null;
    return value ?? null;
  };

  const handleRestart = (): void => {
    setPreferences({ ...emptyPreferences });
    setStepIndex(0);
    setShowColorPicker(false);
    setCompleted(false);
  };

  // Total steps = non-color steps + 1 color step
  const totalSteps = allSteps.length + 1;
  const currentStepNumber = showColorPicker ? allSteps.length + 1 : stepIndex + 1;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-charcoal overflow-hidden">

      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      {!completed ? (
        <div className="w-full flex flex-col items-center justify-center flex-1 px-6">

          {/* Step progress bars */}
          <div className="flex gap-3 mb-12">
            {Array.from({ length: totalSteps }).map((_: unknown, index: number) => (
              <div
                key={index}
                className={
                  "w-8 h-px transition-all duration-300 " +
                  (index < currentStepNumber ? "bg-gold" : "bg-muted")
                }
              >
              </div>
            ))}
          </div>

          {showColorPicker ? (
            <ColorPicker onComplete={handleColorComplete}>
            </ColorPicker>
          ) : (
            <GameStep
              question={currentStep.question}
              options={currentStep.options}
              onSelect={handleSelect}
              selected={getSelected()}
            >
            </GameStep>
          )}

          {/* Step counter */}
          <p className="text-muted text-xs tracking-widest uppercase mt-12">
            {currentStepNumber} / {totalSteps}
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

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-center">
            {preferences.room && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Room
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.room}
                </p>
              </div>
            )}
            {preferences.kitchenType && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Style
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.kitchenType}
                </p>
              </div>
            )}
            {preferences.doorType && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Doors
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.doorType}
                </p>
              </div>
            )}
            {preferences.handles && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Handles
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.handles}
                </p>
              </div>
            )}
            {preferences.priceRange && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Budget
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.priceRange}
                </p>
              </div>
            )}
            {preferences.colors && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-2">
                  Colors
                </p>
                <div className="flex gap-2 justify-center">
                  <div
                    className="w-6 h-6 border border-gold"
                    style={{ backgroundColor: preferences.colors[0] }}
                  >
                  </div>
                  <div
                    className="w-6 h-6 border border-gold"
                    style={{ backgroundColor: preferences.colors[1] }}
                  >
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-block border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500 mt-12"
          >
            Get In Touch
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