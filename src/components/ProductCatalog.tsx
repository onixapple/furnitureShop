"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ZoomableImage from "@/components/ZoomableImage";
import { fetchProducts } from "@/lib/products";
import { Product, ProductCategory } from "@/types";

const IMG_LABELS = ["Foto", "Proiect"];

interface ActiveFilters {
  category: ProductCategory | null;
}

const categoryOptions: { label: string; value: ProductCategory }[] = [
  { label: "Bucatarii", value: "bucatarii" },
  { label: "Dulapuri", value: "dulapuri" },
  { label: "Altele", value: "altele" },
];

const ProductCatalog: React.FC = () => {
  const PAGE_SIZE = 8;
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [visible, setVisible] = useState<number>(PAGE_SIZE);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ActiveFilters>({ category: null });
  const [atBottom, setAtBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [lightboxImgIdx, setLightboxImgIdx] = useState<number>(0);

  const lightboxProduct = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;
  const lightboxImages = lightboxProduct
    ? [lightboxProduct.imageUrl, ...(lightboxProduct.projectImageUrl ? [lightboxProduct.projectImageUrl] : [])]
    : [];
  const lightboxHasMultiple = lightboxImages.length > 1;

  const openLightbox = (product: Product) => {
    const idx = filtered.findIndex((p) => p.id === product.id);
    setLightboxIndex(idx);
    setLightboxImgIdx(0);
  };

  const prevProduct = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setLightboxImgIdx(0);
  }, [filtered.length]);

  const nextProduct = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filtered.length);
    setLightboxImgIdx(0);
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProduct();
      if (e.key === "ArrowRight") nextProduct();
      if (e.key === "Escape") setLightboxIndex(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prevProduct, nextProduct]);

  const handleScroll = (): void => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 8);
  };


  // Mobile zone-based scroll: middle 60% scrolls catalog, outer 20% each side scrolls page
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let startX = 0;
    let lastY = 0;
    let zone: "catalog" | "page" = "catalog";

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      lastY = touch.clientY;
      const side = window.innerWidth * 0.2;
      zone = startX < side || startX > window.innerWidth - side ? "page" : "catalog";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (zone === "page") {
        e.preventDefault();
        const touch = e.touches[0];
        const deltaY = lastY - touch.clientY;
        lastY = touch.clientY;
        const page = document.querySelector("main");
        if (page) page.scrollTop += deltaY;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    const load = async (): Promise<void> => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    setFiltered(result);
    setVisible(PAGE_SIZE);
  }, [products, filters.category]);

  const toggleFilter = (value: ProductCategory): void => {
    setFilters((prev) => ({
      category: prev.category === value ? null : value,
    }));
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="catalog-scroll relative w-full h-screen flex flex-col bg-dark overflow-y-auto py-8"
    >
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none"></div>


      {/* Mobile zone guides */}
      <div className="md:hidden absolute top-0 bottom-0 pointer-events-none" style={{ left: "20%", width: "1px", background: "rgba(201,168,76,0.12)" }}></div>
      <div className="md:hidden absolute top-0 bottom-0 pointer-events-none" style={{ right: "20%", width: "1px", background: "rgba(201,168,76,0.12)" }}></div>
      <div className="md:hidden absolute top-3 left-0 pointer-events-none flex flex-col items-center" style={{ width: "20%" }}>
        <span className="text-gold/30 text-[8px] tracking-widest uppercase rotate-90 mt-8 whitespace-nowrap">pagina</span>
      </div>
      <div className="md:hidden absolute top-3 right-0 pointer-events-none flex flex-col items-center" style={{ width: "20%" }}>
        <span className="text-gold/30 text-[8px] tracking-widest uppercase -rotate-90 mt-8 whitespace-nowrap">pagina</span>
      </div>

      {/* Header */}
      <div className="text-center pt-8 pb-4 px-6">
        <h2 className="font-serif text-4xl text-cream font-light mb-3">
          Colectia Noastra
        </h2>
        <div className="gold-divider"></div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 flex flex-wrap justify-center gap-3 px-6 pb-6 pt-4 bg-dark/90 backdrop-blur-sm">
        {categoryOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleFilter(opt.value)}
            className={
              "text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 " +
              (filters.category === opt.value
                ? "border-gold bg-gold text-dark shadow-md shadow-gold/30"
                : "border-white/10 text-muted hover:border-gold/60 hover:text-cream hover:bg-white/5")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-10 pb-6">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">Se incarca...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted text-xs tracking-widest uppercase">Nu s-au gasit optiuni.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {filtered.slice(0, visible).map((product: Product) => (
                <ProductCard key={product.id} product={product} onImageClick={() => openLightbox(product)} />
              ))}
            </div>
            {visible < filtered.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500"
                >
                  Mai mult
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Scroll-more indicator */}
      <div
        className="pointer-events-none sticky bottom-0 left-0 right-0 h-16 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to top, rgba(15,15,15,0.9) 0%, transparent 100%)",
          opacity: atBottom ? 0 : 1,
        }}
      >
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-gold/50 text-[9px] tracking-[0.3em] uppercase">mai mult</span>
          <svg className="w-3 h-3 text-gold/40 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md"
          onClick={() => setLightboxIndex(-1)}
        >
          <div
            className="relative flex flex-col items-center w-full max-w-4xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex items-center justify-center">
              <ZoomableImage
                src={lightboxImages[lightboxImgIdx]}
                alt={IMG_LABELS[lightboxImgIdx]}
                className="max-h-[75vh] w-full rounded-xl shadow-2xl"
              />

              {/* Prev product */}
              {filtered.length > 1 && (
                <button
                  onClick={prevProduct}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next product */}
              {filtered.length > 1 && (
                <button
                  onClick={nextProduct}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close */}
              <button
                onClick={() => setLightboxIndex(-1)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              {/* Foto / Proiect tabs */}
              {lightboxHasMultiple && (
                <div className="flex gap-2">
                  {lightboxImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxImgIdx(i)}
                      className={
                        "text-[10px] tracking-widest uppercase px-4 py-1.5 border transition-all duration-300 " +
                        (i === lightboxImgIdx
                          ? "border-gold text-gold"
                          : "border-white/20 text-muted hover:border-gold/50 hover:text-cream")
                      }
                    >
                      {IMG_LABELS[i]}
                    </button>
                  ))}
                </div>
              )}

              <p className="text-cream font-serif text-lg">{lightboxProduct.category}</p>
              <p className="text-muted text-xs leading-relaxed">{lightboxProduct.description}</p>
              <p className="text-muted text-xs">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;
