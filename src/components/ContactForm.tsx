"use client";

import React, { useState } from "react";
import { ContactFormData } from "@/types";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return;
    }

    setStatus("loading");

    const payload: ContactFormData = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/email/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      setStatus("error");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark overflow-y-auto px-6 py-16 md:py-0">
      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      <div className="w-full text-center mb-10 md:mb-16">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Contactati-ne</p>
        <div className="gold-divider"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        {/* Left — Heading */}
        <div className="flex flex-col">
          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight mb-6"></h2>

          <div
            className="gold-divider"
            style={{ margin: "0 0 1.5rem 0" }}
          ></div>

          <p className="text-muted text-sm leading-relaxed tracking-wide mb-12">
            Vom efectua un pret provizoriu pe baza cerintelor dumnevoastra si va
            vom contacta in cel mai scurt timp.
          </p>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Showroom
              </p>
              <p className="text-cream text-sm">Calea Basarabiei,</p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Ore
              </p>
              <p className="text-cream text-sm">
                Marti – Duminica, 09:00 – 18:00
              </p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Email
              </p>
              <p className="text-cream text-sm">radu.cazacu1@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col gap-6">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
            Lasati-ne un mesaj
          </p>
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs tracking-widest uppercase">
              Nume
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Andrei"
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
            ></input>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs tracking-widest uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="andrei@example.com"
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
            ></input>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs tracking-widest uppercase">
              Mesaj
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Spuneti-ne despre proiectul dumnevoastra"
              rows={4}
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal resize-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            className={
              "mt-4 border text-xs tracking-[0.3em] uppercase px-10 py-4 transition-all duration-500 " +
              (status === "loading"
                ? "border-muted text-muted cursor-not-allowed"
                : "border-gold text-gold hover:bg-gold hover:text-dark cursor-pointer")
            }
          >
            {status === "loading" ? "Sending..." : "Expediati"}
          </button>

          {status === "success" && (
            <p className="text-gold text-xs tracking-widest uppercase text-center">
              ✓ Mesajul a fost trimis, va vom contacta in curand.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-xs tracking-widest uppercase text-center">
              Ceva a mers gresit, incearca din nou.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
