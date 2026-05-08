"use client";

import React from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onImageClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick }) => {
  const hasMultiple = !!product.projectImageUrl;

  return (
    <div className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 bg-white/5 backdrop-blur-sm transition-all duration-400 hover:shadow-lg hover:shadow-gold/10">

      {/* Image */}
      <div
        className="relative w-full cursor-zoom-in"
        style={{ height: "160px" }}
        onClick={onImageClick}
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
      <div className="px-4 py-3">
        <h3 className="sr-only">{product.category}</h3>
        <p className="text-muted text-xs leading-snug line-clamp-1">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
