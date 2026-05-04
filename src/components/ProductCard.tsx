"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const LABELS = ["Foto", "Proiect"];

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    product.imageUrl,
    ...(product.projectImageUrl ? [product.projectImageUrl] : []),
  ];
  const hasMultiple = images.length > 1;

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, prev, next]);

  const openModal = () => {
    setActiveIndex(0);
    setExpanded(true);
  };

  return (
    <>
      <div className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 bg-white/5 backdrop-blur-sm transition-all duration-400 hover:shadow-lg hover:shadow-gold/10">

        {/* Image */}
        <div
          className="relative w-full cursor-zoom-in"
          style={{ height: "160px" }}
          onClick={openModal}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          {/* Badge when second image exists */}
          {hasMultiple && (
            <div className="absolute bottom-2 right-2 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-4 py-3 flex flex-col gap-1">
          <h3 className="font-serif text-base text-cream font-light">
            {product.category}
          </h3>
          <p className="text-muted text-xs leading-snug line-clamp-1">
            {product.description}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative flex flex-col items-center w-full max-w-4xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full flex items-center justify-center">
              <img
                src={images[activeIndex]}
                alt={LABELS[activeIndex]}
                className="max-h-[75vh] w-full object-contain rounded-xl shadow-2xl"
              />

              {/* Prev arrow */}
              {hasMultiple && (
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next arrow */}
              {hasMultiple && (
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm text-sm"
              >
                ✕
              </button>
            </div>

            {/* Caption + dots */}
            <div className="mt-4 flex flex-col items-center gap-3">
              {/* Label tabs */}
              {hasMultiple && (
                <div className="flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={
                        "text-[10px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-300 " +
                        (i === activeIndex
                          ? "border-gold text-gold"
                          : "border-white/20 text-muted hover:border-gold/50 hover:text-cream")
                      }
                    >
                      {LABELS[i]}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-cream font-serif text-lg">{product.category}</p>
              <p className="text-muted text-xs leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
