"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden border border-charcoal hover:border-gold transition-all duration-500">

      {/* Image */}
      <div className="relative w-full h-64 overflow-hidden bg-charcoal">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        >
        </Image>

        {product.featured && (
          <div className="absolute top-3 left-3 bg-gold text-dark text-xs tracking-widest uppercase px-3 py-1">
            Featured
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
              ? "Accessible"
              : product.priceRange === "mid"
              ? "Mid Range"
              : "Luxury"}
          </span>

          <button className="text-xs tracking-widest uppercase text-cream hover:text-gold transition-colors duration-300">
            Enquire →
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;