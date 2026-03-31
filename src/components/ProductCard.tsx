"use client";

import React from "react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden border border-charcoal hover:border-gold transition-all duration-500">

      {/* Image container */}
      <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.7s ease",
            imageRendering: "auto",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          }}
        />

        {product.featured && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "#C9A84C",
              color: "#0F0F0F",
              fontSize: "10px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
            }}
          >
            Recomandat
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-5 bg-charcoal flex-1">
        <p className="text-muted text-xs tracking-widest uppercase">
          {product.category} · {product.style}
        </p>

        <h3 className="font-serif text-xl text-cream font-light">
          {product.name}
        </h3>

        <p className="text-muted text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-gold text-xs tracking-widest uppercase">
            {product.priceRange === "budget"
              ? "Accesibil"
              : product.priceRange === "mid"
              ? "Mediu"
              : "Lux"}
          </span>

          <button className="text-xs tracking-widest uppercase text-cream hover:text-gold transition-colors duration-300">
            Detalii →
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;