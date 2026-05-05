"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getStats, SiteStats } from "@/lib/analytics";

type Tab = "produse" | "proiecte" | "statistici";
type Status = "idle" | "loading" | "success" | "error";

const BUCKET = "images";

// ── Image uploader ────────────────────────────────────────────────────────────

interface UploaderProps {
  label: string;
  folder: string;
  onUploaded: (url: string) => void;
}

const ImageUploader: React.FC<UploaderProps> = ({ label, folder, onUploaded }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [url, setUrl] = useState<string>("");

  const handleFile = async (file: File) => {
    setStatus("uploading");
    setPreview(URL.createObjectURL(file));

    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, file);
    if (error) {
      setStatus("error");
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    setUrl(data.publicUrl);
    onUploaded(data.publicUrl);
    setStatus("done");
  };

  const reset = () => {
    setPreview(null);
    setStatus("idle");
    setUrl("");
    onUploaded("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-muted text-xs tracking-widest uppercase">{label}</label>

      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className="border border-dashed border-white/20 hover:border-gold/60 transition-colors duration-300 rounded-sm flex flex-col items-center justify-center gap-3 cursor-pointer"
          style={{ height: "140px" }}
        >
          <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-muted text-xs tracking-widest uppercase">Apasa sau trage imaginea</p>
        </div>
      ) : (
        <div className="relative rounded-sm overflow-hidden" style={{ height: "140px" }}>
          <img src={preview} alt="" className="w-full h-full object-cover" />

          {status === "uploading" && (
            <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
              <p className="text-gold text-xs tracking-widest uppercase animate-pulse">Se incarca...</p>
            </div>
          )}

          {status === "done" && (
            <div className="absolute inset-0 bg-dark/40 flex items-center justify-center">
              <span className="text-gold text-xl">✓</span>
            </div>
          )}

          {status === "error" && (
            <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
              <p className="text-red-400 text-xs tracking-widest uppercase">Eroare upload</p>
            </div>
          )}

          <button
            onClick={reset}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {status === "done" && (
        <input
          readOnly
          value={url}
          className="bg-white/5 border border-white/10 text-muted text-xs py-2 px-3 rounded-sm font-mono truncate outline-none"
        />
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};

// ── Admin page ────────────────────────────────────────────────────────────────

const emptyProduct = {
  name: "",
  category: "bucatarii",
  price_range: "mid",
  description: "",
  image_url: "",
  project_image_url: "",
};

const emptyProiect = {
  category: "bucatarii",
  title: "",
  image_url: "",
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("produse");

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Products
  const [product, setProduct] = useState({ ...emptyProduct });
  const [productStatus, setProductStatus] = useState<Status>("idle");

  // Proiecte
  const [proiect, setProiect] = useState({ ...emptyProiect });
  const [proiectStatus, setProiectStatus] = useState<Status>("idle");

  // Stats
  const [stats, setStats] = useState<SiteStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    if (tab !== "statistici") return;
    setStatsLoading(true);
    getStats().then((s) => {
      setStats(s);
      setStatsLoading(false);
    });
  }, [tab]);

  // ── Submit product ──────────────────────────────────────────────────────────
  const submitProduct = async () => {
    if (!product.image_url || !product.name || !product.description) return;
    setProductStatus("loading");

    const payload: Record<string, string> = {
      name: product.name,
      category: product.category,
      price_range: product.price_range,
      description: product.description,
      image_url: product.image_url,
    };
    if (product.project_image_url) {
      payload.project_image_url = product.project_image_url;
    }

    const { error } = await supabase.from("products").insert([payload]);
    if (error) {
      setProductStatus("error");
    } else {
      setProductStatus("success");
      setProduct({ ...emptyProduct });
    }
  };

  // ── Submit proiect ──────────────────────────────────────────────────────────
  const submitProiect = async () => {
    if (!proiect.image_url) return;
    setProiectStatus("loading");

    const payload: Record<string, string> = {
      category: proiect.category,
      image_url: proiect.image_url,
    };
    if (proiect.title) payload.title = proiect.title;

    const { error } = await supabase.from("proiecte").insert([payload]);
    if (error) {
      setProiectStatus("error");
    } else {
      setProiectStatus("success");
      setProiect({ ...emptyProiect });
    }
  };

  // ── UI helpers ──────────────────────────────────────────────────────────────
  const inputCls =
    "bg-transparent border-b border-white/20 text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-white/20";
  const selectCls =
    "bg-dark border-b border-white/20 text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300";

  return (
    <div className="min-h-screen bg-dark text-cream px-6 py-16 md:px-12 md:py-20">

      {/* Header */}
      <div className="mb-12 flex items-start justify-between">
        <div>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Administrare</p>
          <h1 className="font-serif text-5xl font-light text-cream">Panou Admin</h1>
          <div className="gold-divider" style={{ margin: "1.5rem 0 0 0" }} />
        </div>
        <button
          onClick={handleLogout}
          className="text-muted text-xs tracking-widest uppercase hover:text-red-400 transition-colors duration-300 mt-1"
        >
          Iesi
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 mb-10 border border-gold/20 w-fit">
        {(["produse", "proiecte", "statistici"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "text-xs tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300 " +
              (tab === t ? "bg-gold text-dark" : "text-muted hover:text-cream hover:bg-white/5")
            }
          >
            {t === "produse" ? "Produse" : t === "proiecte" ? "Proiecte" : "Statistici"}
          </button>
        ))}
      </div>

      {/* ── PRODUSE ──────────────────────────────────────────────────────────── */}
      {tab === "produse" && (
        <div className="max-w-2xl flex flex-col gap-8">
          <p className="text-muted text-xs tracking-widest uppercase border-b border-white/10 pb-4">
            Imagine principala *
          </p>
          <ImageUploader
            label="Imagine produs"
            folder="products"
            onUploaded={(url) => setProduct((p) => ({ ...p, image_url: url }))}
          />

          <p className="text-muted text-xs tracking-widest uppercase border-b border-white/10 pb-4">
            Imagine proiect (optional)
          </p>
          <ImageUploader
            label="Proiect pe hartie"
            folder="products"
            onUploaded={(url) => setProduct((p) => ({ ...p, project_image_url: url }))}
          />

          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-muted text-xs tracking-widest uppercase">Nume *</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ex: Bucatarie moderna alba"
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-muted text-xs tracking-widest uppercase">Categorie</label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct((p) => ({ ...p, category: e.target.value }))}
                  className={selectCls}
                >
                  <option value="bucatarii">Bucatarii</option>
                  <option value="dulapuri">Dulapuri</option>
                  <option value="antreuri">Antreuri</option>
                  <option value="mese">Mese</option>
                  <option value="altele">Altele</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-muted text-xs tracking-widest uppercase">Pret</label>
                <select
                  value={product.price_range}
                  onChange={(e) => setProduct((p) => ({ ...p, price_range: e.target.value }))}
                  className={selectCls}
                >
                  <option value="budget">Accesibil</option>
                  <option value="mid">Mediu</option>
                  <option value="luxury">Premium</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-muted text-xs tracking-widest uppercase">Descriere *</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct((p) => ({ ...p, description: e.target.value }))}
                placeholder="Ex: Bucatarie cu fronturi MDF vopsit alb mat..."
                rows={3}
                className={inputCls + " resize-none"}
              />
            </div>
          </div>

          <button
            onClick={submitProduct}
            disabled={productStatus === "loading" || !product.image_url || !product.name || !product.description}
            className={
              "mt-2 border text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 w-fit " +
              (productStatus === "loading" || !product.image_url || !product.name || !product.description
                ? "border-white/20 text-white/30 cursor-not-allowed"
                : "border-gold text-gold hover:bg-gold hover:text-dark cursor-pointer")
            }
          >
            {productStatus === "loading" ? "Se salveaza..." : "Adauga Produs"}
          </button>

          {productStatus === "success" && (
            <p className="text-gold text-xs tracking-widest uppercase">✓ Produsul a fost adaugat cu succes.</p>
          )}
          {productStatus === "error" && (
            <p className="text-red-400 text-xs tracking-widest uppercase">Eroare la salvare. Incearca din nou.</p>
          )}
        </div>
      )}

      {/* ── PROIECTE ─────────────────────────────────────────────────────────── */}
      {tab === "proiecte" && (
        <div className="max-w-2xl flex flex-col gap-8">
          <p className="text-muted text-xs tracking-widest uppercase border-b border-white/10 pb-4">
            Imagine proiect *
          </p>
          <ImageUploader
            label="Imagine"
            folder="proiecte"
            onUploaded={(url) => setProiect((p) => ({ ...p, image_url: url }))}
          />

          <div className="flex flex-col gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-muted text-xs tracking-widest uppercase">Categorie</label>
              <select
                value={proiect.category}
                onChange={(e) => setProiect((p) => ({ ...p, category: e.target.value }))}
                className={selectCls}
              >
                <option value="bucatarii">Bucatarii</option>
                <option value="dulapuri">Dulapuri</option>
                <option value="altele">Altele</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-muted text-xs tracking-widest uppercase">Titlu (optional)</label>
              <input
                type="text"
                value={proiect.title}
                onChange={(e) => setProiect((p) => ({ ...p, title: e.target.value }))}
                placeholder="Ex: Bucatarie Chisinau 2024"
                className={inputCls}
              />
            </div>
          </div>

          <button
            onClick={submitProiect}
            disabled={proiectStatus === "loading" || !proiect.image_url}
            className={
              "mt-2 border text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 w-fit " +
              (proiectStatus === "loading" || !proiect.image_url
                ? "border-white/20 text-white/30 cursor-not-allowed"
                : "border-gold text-gold hover:bg-gold hover:text-dark cursor-pointer")
            }
          >
            {proiectStatus === "loading" ? "Se salveaza..." : "Adauga Proiect"}
          </button>

          {proiectStatus === "success" && (
            <p className="text-gold text-xs tracking-widest uppercase">✓ Proiectul a fost adaugat cu succes.</p>
          )}
          {proiectStatus === "error" && (
            <p className="text-red-400 text-xs tracking-widest uppercase">Eroare la salvare. Incearca din nou.</p>
          )}
        </div>
      )}

      {/* ── STATISTICI ───────────────────────────────────────────────────────── */}
      {tab === "statistici" && (
        <div className="max-w-2xl">
          {statsLoading ? (
            <p className="text-muted text-xs tracking-widest uppercase animate-pulse">Se incarca...</p>
          ) : stats ? (
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-3 gap-px bg-gold/10">
                {[
                  { label: "Vizite totale", value: stats.total },
                  { label: "Azi", value: stats.today },
                  { label: "Ultima saptamana", value: stats.thisWeek },
                ].map((stat) => (
                  <div key={stat.label} className="bg-dark flex flex-col items-center justify-center py-10 gap-3">
                    <p className="font-serif text-5xl text-gold font-light">{stat.value}</p>
                    <p className="text-muted text-xs tracking-widest uppercase text-center">{stat.label}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setStatsLoading(true);
                  getStats().then((s) => { setStats(s); setStatsLoading(false); });
                }}
                className="border border-gold/30 text-muted text-xs tracking-widest uppercase px-8 py-3 hover:border-gold hover:text-gold transition-all duration-300 w-fit"
              >
                Actualizeaza
              </button>
            </div>
          ) : (
            <p className="text-red-400 text-xs tracking-widest uppercase">Eroare la incarcare.</p>
          )}
        </div>
      )}
    </div>
  );
}
