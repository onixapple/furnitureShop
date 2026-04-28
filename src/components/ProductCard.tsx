"use client";

import React, { useState } from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 bg-white/5 backdrop-blur-sm transition-all duration-400 hover:shadow-lg hover:shadow-gold/10">

        {/* Image */}
        <div
          className="relative w-full cursor-zoom-in"
          style={{ height: "160px" }}
          onClick={() => setExpanded(true)}
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

      {/* Expanded image modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out"
          onClick={() => setExpanded(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              style={{ maxHeight: "85vh" }}
            />
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
            >
              ✕
            </button>
            <div className="mt-3 text-center">
              <p className="text-cream font-serif text-lg">{product.category}</p>
              <p className="text-muted text-xs leading-relaxed mt-1">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
