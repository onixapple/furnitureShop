"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";
import { Product, ProductCategory, ProductStyle, PriceRange } from "@/types";
import { CustomerPreferences } from "@/types";

interface ProductCatalogProps {
  preferences?: CustomerPreferences;
}

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

const priceOptions: { label: string; value: PriceRange }[] = [
  { label: "Accesibil", value: "budget" },
  { label: "Mediu", value: "mid" },
  { label: "Lux", value: "luxury" },
];

const ProductCatalog: React.FC<ProductCatalogProps> = ({ preferences }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ActiveFilters>({
    category: null,
    style: null,
    priceRange: null,
  });

  // Load ALL products once on mount
  useEffect(() => {
    const load = async (): Promise<void> => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  // Apply both preference filters and manual filters whenever either changes
  useEffect(() => {
    let result = [...products];
  
    const hasManualFilters = filters.category || filters.style || filters.priceRange;
  
    if (hasManualFilters) {
      // Manual filters override preference filters completely
      if (filters.category) {
        result = result.filter((p) => p.category === filters.category);
      }
      if (filters.style) {
        result = result.filter((p) => p.style === filters.style);
      }
      if (filters.priceRange) {
        result = result.filter((p) => p.priceRange === filters.priceRange);
      }
    } else if (preferences && preferences.room) {
      // No manual filters — apply preference filters
      const room = preferences.room;
  
      if (room === "bucatarie") {
        result = result.filter((p) => p.category === "bucatarii");
        if (preferences.kitchenType) {
          result = result.filter((p) => p.style === (preferences.kitchenType as unknown as ProductStyle));
        }
        if (preferences.handles) {
          result = result.filter((p) => p.handles === preferences.handles);
        }
        if (preferences.priceRange) {
          result = result.filter((p) => p.priceRange === preferences.priceRange);
        }
      } else if (room === "dulapuri") {
        result = result.filter((p) => p.category === "dulapuri");
        if (preferences.doorType) {
          result = result.filter((p) => p.style === (preferences.doorType as unknown as ProductStyle));
        }
        if (preferences.handles) {
          result = result.filter((p) => p.handles === preferences.handles);
        }
        if (preferences.priceRange) {
          result = result.filter((p) => p.priceRange === preferences.priceRange);
        }
      } else {
        result = result.filter((p) => p.category === "altele");
        if (preferences.priceRange) {
          result = result.filter((p) => p.priceRange === preferences.priceRange);
        }
      }
    }
  
    setFiltered(result);
  }, [
    products,
    filters.category,
    filters.style,
    filters.priceRange,
    preferences?.room,
    preferences?.kitchenType,
    preferences?.doorType,
    preferences?.handles,
    preferences?.priceRange,
  ]);

  const toggleFilter = (key: FilterKey, value: string): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-dark overflow-y-auto">

      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center pt-24 pb-8 px-6">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
          Lucrarile noastre
        </p>
        <h2 className="font-serif text-5xl text-cream font-light mb-4">
          Colectia Noastra
        </h2>
        <div className="gold-divider"></div>
      </div>

      {/* Preference banner */}
      {preferences && preferences.room && (
        <div className="flex justify-center mb-4 px-20">
          <div className="border border-gold border-opacity-30 px-6 py-3 flex items-center gap-4">
            <p className="text-gold text-xs tracking-widest uppercase">
              Rezultate pentru preferintele dumneavoastra
            </p>
            <div className="flex gap-4">
              {preferences.room && (
                <span className="text-cream text-xs capitalize tracking-widest">
                  {preferences.room}
                </span>
              )}
              {preferences.kitchenType && (
                <span className="text-muted text-xs capitalize tracking-widest">
                  · {preferences.kitchenType}
                </span>
              )}
              {preferences.doorType && (
                <span className="text-muted text-xs capitalize tracking-widest">
                  · {preferences.doorType}
                </span>
              )}
              {preferences.handles && (
                <span className="text-muted text-xs capitalize tracking-widest">
                  · {preferences.handles}
                </span>
              )}
              {preferences.priceRange && (
                <span className="text-muted text-xs capitalize tracking-widest">
                  · {preferences.priceRange}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Filters */}
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

        {/*priceOptions.map((opt) => (
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
        ))*/}
      </div>

      {/* Grid */}
      <div className="px-20 pb-16">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">
              Se incarca...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">
              Nu s-au gasit optiuni.
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