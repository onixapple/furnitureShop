"use client";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export default function ZoomableImage({ src, alt, className = "" }: Props) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pinchRef = useRef<number | null>(null);
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  // Reset zoom when navigating to a different image
  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [src]);

  const pinchDist = (t: React.TouchList) =>
    Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchRef.current = pinchDist(e.touches);
      dragRef.current = null;
    } else if (e.touches.length === 1 && scale > 1) {
      dragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current !== null) {
      const d = pinchDist(e.touches);
      setScale(s => Math.min(Math.max(s * (d / pinchRef.current!), 1), 5));
      pinchRef.current = d;
    } else if (e.touches.length === 1 && dragRef.current && scale > 1) {
      const dx = e.touches[0].clientX - dragRef.current.x;
      const dy = e.touches[0].clientY - dragRef.current.y;
      setPos(p => ({ x: p.x + dx, y: p.y + dy }));
      dragRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchRef.current = null;
    if (e.touches.length === 0) {
      dragRef.current = null;
      if (scale < 1.1) { setScale(1); setPos({ x: 0, y: 0 }); }
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    setScale(s => {
      const next = Math.min(Math.max(s * factor, 1), 5);
      if (next <= 1) setPos({ x: 0, y: 0 });
      return next;
    });
  };

  const onDoubleClick = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain select-none"
        style={{
          transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
          transition: scale === 1 ? "transform 0.25s ease" : "none",
          cursor: scale > 1 ? "grab" : "default",
        }}
      />
    </div>
  );
}
