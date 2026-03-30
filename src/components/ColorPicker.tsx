"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface ColorPickerProps {
  onComplete: (colors: [string, string]) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const drawSpectrum = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Draw horizontal rainbow gradient
    const hueGradient = ctx.createLinearGradient(0, 0, width, 0);
    hueGradient.addColorStop(0, "hsl(0, 100%, 50%)");
    hueGradient.addColorStop(0.17, "hsl(60, 100%, 50%)");
    hueGradient.addColorStop(0.33, "hsl(120, 100%, 50%)");
    hueGradient.addColorStop(0.5, "hsl(180, 100%, 50%)");
    hueGradient.addColorStop(0.67, "hsl(240, 100%, 50%)");
    hueGradient.addColorStop(0.83, "hsl(300, 100%, 50%)");
    hueGradient.addColorStop(1, "hsl(360, 100%, 50%)");

    ctx.fillStyle = hueGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw vertical white to transparent gradient on top
    const whiteGradient = ctx.createLinearGradient(0, 0, 0, height / 2);
    whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
    whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = whiteGradient;
    ctx.fillRect(0, 0, width, height / 2);

    // Draw vertical transparent to black gradient on bottom
    const blackGradient = ctx.createLinearGradient(0, height / 2, 0, height);
    blackGradient.addColorStop(0, "rgba(0,0,0,0)");
    blackGradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = blackGradient;
    ctx.fillRect(0, height / 2, width, height / 2);
  }, []);

  useEffect(() => {
    drawSpectrum();
  }, [drawSpectrum]);

  const getColorAtPosition = (
    e: React.MouseEvent<HTMLCanvasElement>
  ): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    return `#${pixel[0].toString(16).padStart(2, "0")}${pixel[1]
      .toString(16)
      .padStart(2, "0")}${pixel[2].toString(16).padStart(2, "0")}`;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const color = getColorAtPosition(e);
    if (color) setHoveredColor(color);
  };

  const handleMouseLeave = (): void => {
    setHoveredColor(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const color = getColorAtPosition(e);
    if (!color) return;
  
    setSelectedColors((prev) => {
      if (prev.length === 0) return [color];
      if (prev.length === 1) {
        const updated: [string, string] = [prev[0], color];
        setTimeout(() => {
          onComplete(updated);
        }, 0);
        return updated;
      }
      return [color];
    });
  };

  const handleReset = (): void => {
    setSelectedColors([]);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">

      <p className="text-gold text-xs tracking-[0.4em] uppercase">
        Tell Us Your Taste
      </p>

      <h2 className="font-serif text-4xl md:text-5xl text-cream font-light text-center">
        Pick Your Two Colors
      </h2>

      <div className="gold-divider"></div>

      <p className="text-muted text-xs tracking-widest uppercase">
        {selectedColors.length === 0 && "Click to select your first color"}
        {selectedColors.length === 1 && "Now select your second color"}
        {selectedColors.length === 2 && "Perfect combination selected"}
      </p>

      {/* Canvas spectrum */}
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full rounded-none cursor-crosshair border border-muted hover:border-gold transition-colors duration-300"
        style={{ maxWidth: "600px" }}
      >
      </canvas>

      {/* Color preview row */}
      <div className="flex items-center gap-6 mt-2">

        {/* Hovered color preview */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-10 h-10 border border-muted transition-all duration-100"
            style={{ backgroundColor: hoveredColor ?? "transparent" }}
          >
          </div>
          <p className="text-muted text-xs tracking-widest uppercase">
            {hoveredColor ?? "—"}
          </p>
        </div>

        <div className="w-px h-12 bg-muted opacity-30"></div>

        {/* Selected color 1 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              "w-10 h-10 border transition-all duration-300 " +
              (selectedColors[0] ? "border-gold" : "border-muted opacity-30")
            }
            style={{ backgroundColor: selectedColors[0] ?? "transparent" }}
          >
          </div>
          <p className="text-muted text-xs tracking-widest uppercase">
            {selectedColors[0] ?? "Color 1"}
          </p>
        </div>

        {/* Selected color 2 */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={
              "w-10 h-10 border transition-all duration-300 " +
              (selectedColors[1] ? "border-gold" : "border-muted opacity-30")
            }
            style={{ backgroundColor: selectedColors[1] ?? "transparent" }}
          >
          </div>
          <p className="text-muted text-xs tracking-widest uppercase">
            {selectedColors[1] ?? "Color 2"}
          </p>
        </div>

        <div className="w-px h-12 bg-muted opacity-30"></div>

        {/* Combined preview */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-10 h-10 border border-muted"
            style={{
              background:
                selectedColors.length === 2
                  ? `linear-gradient(135deg, ${selectedColors[0]} 50%, ${selectedColors[1]} 50%)`
                  : "transparent",
            }}
          >
          </div>
          <p className="text-muted text-xs tracking-widest uppercase">
            Combo
          </p>
        </div>

      </div>

      {/* Reset button */}
      {selectedColors.length > 0 && (
        <button
          onClick={handleReset}
          className="text-muted text-xs tracking-widest uppercase hover:text-gold transition-colors duration-300"
        >
          Reset Colors
        </button>
      )}

    </div>
  );
};

export default ColorPicker;