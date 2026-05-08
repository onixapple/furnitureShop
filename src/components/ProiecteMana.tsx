"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchProjects } from "@/lib/projects";
import { Project, ProjectCategory } from "@/types";
import ZoomableImage from "@/components/ZoomableImage";

const filters: { label: string; value: ProjectCategory }[] = [
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
      <div className="relative w-full min-h-screen flex flex-col bg-dark overflow-y-auto py-8">

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-6">
          <h2 className="font-serif text-4xl text-cream font-light mb-3">
            Proiecte de mînă realizate în creion
          </h2>
          <div className="gold-divider" />
        </div>

        {/* Filters */}
        <div className="sticky top-0 z-10 flex flex-wrap justify-center gap-3 px-6 pb-6 pt-4 bg-dark/90 backdrop-blur-sm">
          {filters.map((f) => (
            <button
              key={String(f.value)}
              onClick={() => setActiveCategory((prev) => prev === f.value ? null : f.value)}
              className={
                "text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 " +
                (activeCategory === f.value
                  ? "border-gold bg-gold text-dark shadow-md shadow-gold/30"
                  : "border-white/10 text-muted hover:border-gold/60 hover:text-cream hover:bg-white/5")
              }
            >
              {f.label}
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
              <p className="text-muted text-xs tracking-widest uppercase">Nu s-au gasit proiecte.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 bg-white/5 backdrop-blur-sm transition-all duration-400 hover:shadow-lg hover:shadow-gold/10 cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  <div className="relative w-full" style={{ height: "160px" }}>
                    <img
                      src={project.imageUrl}
                      alt={project.title ?? project.category}
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
                  <div className="px-4 py-3">
                    <p className="text-muted text-xs leading-snug line-clamp-1">
                      {project.title ?? project.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
              <ZoomableImage
                src={lightbox.imageUrl}
                alt={lightbox.title ?? lightbox.category}
                className="w-full max-h-[80vh]"
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
