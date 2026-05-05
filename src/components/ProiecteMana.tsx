"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchProjects } from "@/lib/projects";
import { Project, ProjectCategory } from "@/types";

const filters: { label: string; value: ProjectCategory | null }[] = [
  { label: "Toate", value: null },
  { label: "Bucatarii", value: "bucatarii" },
  { label: "Dulapuri", value: "dulapuri" },
  { label: "Altele", value: "altele" },
];

const ProiecteMana: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  const openLightbox = (project: Project) => {
    const index = filtered.findIndex((p) => p.id === project.id);
    setLightboxIndex(index);
    setLightbox(project);
  };

  const prev = useCallback(() => {
    const i = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(i);
    setLightbox(filtered[i]);
  }, [lightboxIndex, filtered]);

  const next = useCallback(() => {
    const i = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(i);
    setLightbox(filtered[i]);
  }, [lightboxIndex, filtered]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

  return (
    <>
      <div className="relative w-full min-h-screen flex flex-col bg-charcoal overflow-y-auto py-20 px-6">

        {/* Gold line decorations */}
        <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />
        <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-12 right-12 h-px bg-gold opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Atelier
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight">
            Proiecte de mana
          </h2>
          <div className="gold-divider" />
          <p className="text-muted text-sm tracking-wide max-w-lg mx-auto leading-relaxed">
            De 15 ani realizam proiecte individuale pentru fiecare uz casnic.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={String(f.value)}
              onClick={() => setActiveCategory(f.value)}
              className={
                "text-xs tracking-widest uppercase px-6 py-2 border transition-all duration-300 " +
                (activeCategory === f.value
                  ? "border-gold bg-gold text-dark"
                  : "border-white/10 text-muted hover:border-gold/50 hover:text-cream")
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="max-w-6xl w-full mx-auto flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-muted text-xs tracking-widest uppercase">Se incarca...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-48">
              <p className="text-muted text-xs tracking-widest uppercase">Nu s-au gasit proiecte.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-gold/10">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden bg-charcoal cursor-pointer"
                  style={{ aspectRatio: "4 / 3" }}
                  onClick={() => openLightbox(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title ?? project.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-px bg-gold" />
                    <p className="text-cream font-serif text-lg font-light tracking-wide">
                      {project.title ?? project.category}
                    </p>
                    <p className="text-gold text-[10px] tracking-[0.35em] uppercase">
                      {project.category}
                    </p>
                    <div className="w-8 h-px bg-gold" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-12 right-12 h-px bg-gold opacity-10 pointer-events-none" />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex flex-col items-center w-full max-w-5xl mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full">
              <img
                src={lightbox.imageUrl}
                alt={lightbox.title ?? lightbox.category}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Prev */}
              {filtered.length > 1 && (
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next */}
              {filtered.length > 1 && (
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/80 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 backdrop-blur-sm text-sm"
              >
                ✕
              </button>
            </div>

            {/* Caption */}
            <div className="mt-5 text-center">
              <div className="w-8 h-px bg-gold mx-auto mb-3" />
              <p className="font-serif text-xl text-cream font-light">
                {lightbox.title ?? lightbox.category}
              </p>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mt-1">
                {lightbox.category}
              </p>
              <p className="text-muted text-xs mt-2">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProiecteMana;
