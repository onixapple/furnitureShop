"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState("");

  // Restore state from localStorage
  useEffect(() => {
    const storedAttempts = parseInt(localStorage.getItem("admin_attempts") ?? "0");
    const storedLock = parseInt(localStorage.getItem("admin_lock_until") ?? "0");
    setAttempts(storedAttempts);
    if (storedLock > Date.now()) {
      setLockedUntil(storedLock);
    } else if (storedLock) {
      localStorage.removeItem("admin_attempts");
      localStorage.removeItem("admin_lock_until");
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!lockedUntil) return;
    const tick = setInterval(() => {
      const remaining = lockedUntil - Date.now();
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        localStorage.removeItem("admin_attempts");
        localStorage.removeItem("admin_lock_until");
      } else {
        const m = Math.floor(remaining / 60000);
        const s = Math.floor((remaining % 60000) / 1000);
        setTimeLeft(`${m}:${s.toString().padStart(2, "0")}`);
      }
    }, 1000);
    return () => clearInterval(tick);
  }, [lockedUntil]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil || loading || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.removeItem("admin_attempts");
        localStorage.removeItem("admin_lock_until");
        router.push("/admin");
        router.refresh();
      } else {
        const next = attempts + 1;
        setAttempts(next);
        localStorage.setItem("admin_attempts", String(next));
        setPassword("");

        if (next >= MAX_ATTEMPTS) {
          const until = Date.now() + LOCK_MS;
          setLockedUntil(until);
          localStorage.setItem("admin_lock_until", String(until));
        } else {
          setError(`Parola incorecta. ${MAX_ATTEMPTS - next} incercari ramase.`);
        }
      }
    } catch {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      {/* Gold line decorations */}
      <div className="fixed left-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />
      <div className="fixed right-12 top-0 h-full w-px bg-gold opacity-20 pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">Administrare</p>
        <h1 className="font-serif text-4xl text-cream font-light mb-2">TeoMob</h1>
        <div className="gold-divider mb-10" />

        {lockedUntil ? (
          <div className="text-center flex flex-col items-center gap-5">
            <svg className="w-8 h-8 text-red-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-10a4 4 0 00-4 4v2h8V9a4 4 0 00-4-4z" />
            </svg>
            <p className="text-red-400 text-xs tracking-[0.3em] uppercase">Acces blocat</p>
            <p className="font-serif text-6xl text-gold font-light tracking-widest">{timeLeft}</p>
            <p className="text-muted text-xs tracking-wide leading-relaxed text-center">
              Prea multe incercari esuate.<br />Asteptati 15 minute.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-muted text-xs tracking-widest uppercase">Parola</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="bg-transparent border-b border-white/20 text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300"
              />
            </div>

            {/* Attempt indicator dots */}
            {attempts > 0 && (
              <div className="flex gap-1.5">
                {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      "flex-1 h-px transition-colors duration-300 " +
                      (i < attempts ? "bg-red-400" : "bg-white/10")
                    }
                  />
                ))}
              </div>
            )}

            {error && (
              <p className="text-red-400 text-xs tracking-widest uppercase">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className={
                "border text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 " +
                (loading || !password
                  ? "border-white/20 text-white/30 cursor-not-allowed"
                  : "border-gold text-gold hover:bg-gold hover:text-dark cursor-pointer")
              }
            >
              {loading ? "Se verifica..." : "Intra"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
