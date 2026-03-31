"use client";

import React, { useState } from "react";
import { ContactFormData, CustomerPreferences } from "@/types";

interface ContactFormProps {
  preferences?: CustomerPreferences;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

const ContactForm: React.FC<ContactFormProps> = ({ preferences }) => {
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
      preferences,
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
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-dark overflow-hidden px-6">
  
      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>
  
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
  
        {/* Left — Heading */}
        <div className="flex flex-col">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Contactati-ne
          </p>
  
          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
            
          </h2>
  
          <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }}></div>
  
          <p className="text-muted text-sm leading-relaxed tracking-wide mb-12">
            Vom efectua un pret provizoriu pe baza cerintelor dumnevoastra si 
           va vom contacta in cel mai scurt timp.
          </p>
  
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Showroom
              </p>
              <p className="text-cream text-sm">
                Calea Basarabiei, 
              </p>
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
              <p className="text-cream text-sm">
                radu.cazacu1@gmail.com 
              </p>
            </div>
          </div>
        </div>
  
        {/* Right — Form */}
        <div className="flex flex-col gap-6">
  
          {/* Preferences summary */}
          {preferences && Object.values(preferences).some((v) => v !== null) && (
            <div className="border border-gold border-opacity-30 p-4 mb-2">
              <p className="text-gold text-xs tracking-widest uppercase mb-3">
                Preferinte
              </p>
              <div className="flex flex-wrap gap-6">
  
                {preferences.room && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Categorie
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.room}
                    </p>
                  </div>
                )}
  
                {preferences.kitchenType && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Stil
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.kitchenType}
                    </p>
                  </div>
                )}
  
                {preferences.doorType && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Usi
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.doorType}
                    </p>
                  </div>
                )}
  
                {preferences.handles && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Manere
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.handles}
                    </p>
                  </div>
                )}
  
                {preferences.priceRange && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Buget
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.priceRange}
                    </p>
                  </div>
                )}
  
                {preferences.materials && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Culori
                    </p>
                    <div className="flex gap-2 mt-1">
                      <div
                        className="w-5 h-5 border border-gold"
                        style={{ backgroundColor: preferences.materials.pal?.image }}
                      >
                      </div>
                      <div
                        className="w-5 h-5 border border-gold"
                        style={{ backgroundColor: preferences.materials.mdf?.image }}
                      >
                      </div>
                    </div>
                  </div>
                )}
  
              </div>
            </div>
          )}
  
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
              placeholder="John Smith"
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
            >
            </input>
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
              placeholder="john@example.com"
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal"
            >
            </input>
          </div>
  
          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs tracking-widest uppercase">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your project or inquiry..."
              rows={4}
              className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal resize-none"
            >
            </textarea>
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
  )}

export default ContactForm;