"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";
import { Product, ProductCategory, ProductStyle, PriceRange } from "@/types";

type FilterKey = "category" | "style" | "priceRange";

interface ActiveFilters {
  category: ProductCategory | null;
  style: ProductStyle | null;
  priceRange: PriceRange | null;
}

const categoryOptions: { label: string; value: ProductCategory }[] = [
  { label: "Dulapuri", value: "dulapuri" },
  { label: "Mese", value: "mese" },
  { label: "Bucatarii", value: "bucatarii" },
  { label: "Antreuri", value: "antreuri" },
  { label: "Altele", value: "altele" },
];

const styleOptions: { label: string; value: ProductStyle }[] = [
  { label: "Modern", value: "modern" },
  { label: "Classic", value: "classic" },
];

const priceOptions: { label: string; value: PriceRange }[] = [
  { label: "Accessible", value: "budget" },
  { label: "Mid Range", value: "mid" },
  { label: "Luxury", value: "luxury" },
];

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ActiveFilters>({
    category: null,
    style: null,
    priceRange: null,
  });

  useEffect(() => {
    const load = async (): Promise<void> => {
      const data = await fetchProducts();
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    let result = [...products];
    console.log('result', result)
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters.style) {
      result = result.filter((p) => p.style === filters.style);
    }
    if (filters.priceRange) {
      result = result.filter((p) => p.priceRange === filters.priceRange);
    }

    setFiltered(result);
  }, [filters, products]);

  const toggleFilter = (key: FilterKey, value: string): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-dark overflow-y-auto">

      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center pt-24 pb-8 px-6">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
          Our Collection
        </p>
        <h2 className="font-serif text-5xl text-cream font-light mb-4">
          Featured Pieces
        </h2>
        <div className="gold-divider"></div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 px-6 pb-8">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleFilter("category", opt.value)}
            className={
              "text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 " +
              (filters.category === opt.value
                ? "border-gold bg-gold text-dark"
                : "border-muted text-muted hover:border-gold hover:text-gold")
            }
          >
            {opt.label}
          </button>
        ))}

        {styleOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleFilter("style", opt.value)}
            className={
              "text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 " +
              (filters.style === opt.value
                ? "border-gold bg-gold text-dark"
                : "border-muted text-muted hover:border-gold hover:text-gold")
            }
          >
            {opt.label}
          </button>
        ))}

        {priceOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleFilter("priceRange", opt.value)}
            className={
              "text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 " +
              (filters.priceRange === opt.value
                ? "border-gold bg-gold text-dark"
                : "border-muted text-muted hover:border-gold hover:text-gold")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-20 pb-16">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">
              Loading Collection...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">
              No pieces match your selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
              >
              </ProductCard>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductCatalog;
