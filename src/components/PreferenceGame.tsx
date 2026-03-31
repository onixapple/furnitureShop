"use client";

import React, { useState, useEffect } from "react";
import GameStep from "@/components/GameStep";
import ColorPicker from "@/components/ColorPicker";
import DimensionsStep from "@/components/DimensionsStep";
import {
  CustomerPreferences,
  GameStep as GameStepType,
  GameOption,
  RoomType,
  Dimensions,
  MaterialSelection,
} from "@/types";

interface PreferenceGameProps {
  onComplete?: (preferences: CustomerPreferences) => void;
  onRestart?: () => void;
}

const emptyPreferences: CustomerPreferences = {
  room: null,
  kitchenType: null,
  handles: null,
  doorType: null,
  materials: null,
  priceRange: null,
};

const stepRoom: GameStepType = {
  id: "room",
  question: "De ce mobila aveti nevoie?",
  field: "room",
  options: [
    {
      id: "r1",
      label: "Bucatarii",
      value: "bucatarie",
      image: "/game/bucatarie1.JPG",
    },
    {
      id: "r2",
      label: "Dulapuri",
      value: "dulapuri",
      image: "/game/simplu.jpg",
    },
    { id: "r3", label: "Living", value: "living", image: "/game/living01.JPG" },
    { id: "r4", label: "Altele", value: "altele", image: "/game/altele1.JPG" },
  ] as GameOption[],
};

const stepKitchenType: GameStepType = {
  id: "kitchenType",
  question: "Ce tip de bucatarie preferati?",
  field: "kitchenType",
  options: [
    { id: "kt1", label: "Clasica", value: "classic", image: "/game/cupe.JPG" },
    { id: "kt2", label: "Moderna", value: "modern", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

const stepHandles: GameStepType = {
  id: "handles",
  question: "Ce tipuri de manere vi se par mai atragatoare?",
  field: "handles",
  options: [
    {
      id: "h1",
      label: "Manere vizibile",
      value: "vizibile",
      image: "/game/cupe.JPG",
    },
    {
      id: "h2",
      label: "Manere ascunse",
      value: "ascunse",
      image: "/game/cupe.JPG",
    },
  ] as GameOption[],
};

const stepDoorType: GameStepType = {
  id: "doorType",
  question: "Ce tip de dulap preferati?",
  field: "doorType",
  options: [
    {
      id: "d1",
      label: "Usi glisante",
      value: "glisante",
      image: "/game/cupe.JPG",
    },
    {
      id: "d2",
      label: "Usi pe balamale",
      value: "balamale",
      image: "/game/cupe.JPG",
    },
  ] as GameOption[],
};

const stepPriceRange: GameStepType = {
  id: "priceRange",
  question: "Care este bugetul dumneavoastra?",
  field: "priceRange",
  options: [
    { id: "p1", label: "Accesibil", value: "budget", image: "/game/cupe.JPG" },
    { id: "p2", label: "Mediu", value: "mid", image: "/game/cupe.JPG" },
    { id: "p3", label: "Lux", value: "luxury", image: "/game/cupe.JPG" },
  ] as GameOption[],
};

// Single getNonColorSteps — outside the component, uses correct values
const getStepsForPreferences = (prefs: CustomerPreferences): GameStepType[] => {
  const base: GameStepType[] = [stepRoom];
  const room = prefs.room;

  if (room === "bucatarie") {
    base.push(stepKitchenType);
    base.push(stepHandles);
    base.push(stepPriceRange);
  }

  if (room === "dulapuri") {
    base.push(stepDoorType);
    if (prefs.doorType === "balamale") {
      base.push(stepHandles);
    }
    base.push(stepPriceRange);
  }

  return base;
};

const PreferenceGame: React.FC<PreferenceGameProps> = ({
  onComplete,
  onRestart,
}) => {
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    ...emptyPreferences,
  });
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showDimensionsStep, setShowDimensionsStep] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const allSteps = getStepsForPreferences(preferences);
  const currentStep: GameStepType = allSteps[stepIndex] ?? stepRoom;

  console.log("stepIndex:", stepIndex);
  console.log(
    "allSteps:",
    allSteps.map((s) => s.id)
  );
  console.log("currentStep:", currentStep.id);
  console.log("preferences.room:", preferences.room);
  console.log("preferences.doorType:", preferences.doorType);
  useEffect(() => {
    if (completed) {
      const catalog = document.querySelector("#catalog");
      if (catalog) {
        catalog.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [completed]);

  const handleSelect = (value: string): void => {
    const updatedPreferences: CustomerPreferences = {
      ...preferences,
      [currentStep.field]: value,
    };

    setPreferences(updatedPreferences);

    if (
      currentStep.field === "room" &&
      (value === "living" || value === "altele")
    ) {
      setTimeout(() => {
        setCompleted(true);
        if (onComplete) {
          onComplete(updatedPreferences);
        }
      }, 400);
      return;
    }

    const updatedSteps = getStepsForPreferences(updatedPreferences);
    const nextIndex = stepIndex + 1;
    const isLastStep = nextIndex >= updatedSteps.length;

    setTimeout(() => {
      if (isLastStep) {
        setShowColorPicker(true);
      } else {
        setStepIndex(nextIndex);
      }
    }, 400);
  };

  const handleColorComplete = (materials: MaterialSelection): void => {
    const updatedPreferences: CustomerPreferences = {
      ...preferences,
      materials,
    };
    setPreferences(updatedPreferences);

    setTimeout(() => {
      setShowColorPicker(false);
      setShowDimensionsStep(true);
    }, 600);
  };

  const handleDimensionsComplete = (dimensions: Dimensions | null): void => {
    const updatedPreferences: CustomerPreferences = {
      ...preferences,
      dimensions: dimensions ?? undefined,
    };
    setPreferences(updatedPreferences);
    setShowDimensionsStep(false);
    setCompleted(true);
    if (onComplete) {
      onComplete(updatedPreferences);
    }
  };

  const getSelected = (): string | null => {
    const value = preferences[currentStep.field];
    if (Array.isArray(value)) return null;
    if (typeof value === "object" && value !== null) return null;
    return value ?? null;
  };

  const handleRestart = (): void => {
    setPreferences({ ...emptyPreferences });
    setStepIndex(0);
    setShowColorPicker(false);
    setShowDimensionsStep(false);
    setCompleted(false);
    if (onRestart) {
      onRestart();
    }
  };

  const totalSteps = allSteps.length + 2;
  const currentStepNumber = showDimensionsStep
    ? allSteps.length + 2
    : showColorPicker
    ? allSteps.length + 1
    : stepIndex + 1;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-charcoal overflow-hidden">
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      {!completed ? (
        <div className="w-full flex flex-col items-center justify-center flex-1 px-6">
          <div className="flex gap-3 mb-12">
            {Array.from({ length: totalSteps }).map(
              (_: unknown, index: number) => (
                <div
                  key={index}
                  className={
                    "w-8 h-px transition-all duration-300 " +
                    (index < currentStepNumber ? "bg-gold" : "bg-muted")
                  }
                ></div>
              )
            )}
          </div>

          {showColorPicker ? (
            <ColorPicker onComplete={handleColorComplete}></ColorPicker>
          ) : showDimensionsStep ? (
            <DimensionsStep
              onComplete={handleDimensionsComplete}
            ></DimensionsStep>
          ) : (
            <GameStep
              question={currentStep.question}
              options={currentStep.options}
              onSelect={handleSelect}
              selected={getSelected()}
            ></GameStep>
          )}

          <p className="text-muted text-xs tracking-widest uppercase mt-12">
            {currentStepNumber} / {totalSteps}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-6">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Profilul Tau
          </p>

          <h2 className="font-serif text-5xl text-cream font-light mb-4">
            Perfect. Stim exact ce va trebuie.
          </h2>

          <div className="gold-divider"></div>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-center">
            {preferences.room && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Tip
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.room}
                </p>
              </div>
            )}
            {preferences.kitchenType && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Stil
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.kitchenType}
                </p>
              </div>
            )}
            {preferences.doorType && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Usi
                </p>
                <p className="text-cream text-sm capitalize">
                  {preferences.doorType}
                </p>
              </div>
            )}
            {preferences.handles && (
              <div>
                <p className="text-muted text-xs tracking-widest uppercase mb-1">
                  Manere
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
            {preferences.materials &&
              (preferences.materials.pal || preferences.materials.mdf) && (
                <div>
                  <p className="text-muted text-xs tracking-widest uppercase mb-2">
                    Materiale
                  </p>
                  <div className="flex gap-4 justify-center">
                    {preferences.materials.pal && (
                      <div className="flex flex-col items-center gap-1">
                        <img
                          src={preferences.materials.pal.image}
                          alt={preferences.materials.pal.name}
                          style={{
                            width: "32px",
                            height: "32px",
                            objectFit: "cover",
                            border: "1px solid #C9A84C",
                          }}
                        />
                        <span className="text-muted text-xs">
                          PAL: {preferences.materials.pal.name}
                        </span>
                      </div>
                    )}
                    {preferences.materials.mdf && (
                      <div className="flex flex-col items-center gap-1">
                        <img
                          src={preferences.materials.mdf.image}
                          alt={preferences.materials.mdf.name}
                          style={{
                            width: "32px",
                            height: "32px",
                            objectFit: "cover",
                            border: "1px solid #C9A84C",
                          }}
                        />
                        <span className="text-muted text-xs">
                          MDF: {preferences.materials.mdf.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            {preferences.dimensions &&
              (preferences.dimensions.width ||
                preferences.dimensions.height) && (
                <div>
                  <p className="text-muted text-xs tracking-widest uppercase mb-1">
                    Dimensiuni
                  </p>
                  <p className="text-cream text-sm">
                    {preferences.dimensions.width
                      ? `W: ${preferences.dimensions.width}cm`
                      : ""}
                    {preferences.dimensions.width &&
                    preferences.dimensions.height
                      ? " × "
                      : ""}
                    {preferences.dimensions.height
                      ? `H: ${preferences.dimensions.height}cm`
                      : ""}
                  </p>
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
            Contactati-ne
          </a>

          <button
            onClick={handleRestart}
            className="text-muted text-xs tracking-widest uppercase mt-6 hover:text-gold transition-colors duration-300"
          >
            Incepe din nou
          </button>
        </div>
      )}
    </div>
  );
};

export default PreferenceGame;
