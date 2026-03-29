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
            Get In Touch
          </p>

          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
            Let Us Find Your Perfect Piece
          </h2>

          <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }}></div>

          <p className="text-muted text-sm leading-relaxed tracking-wide mb-12">
            Whether you have a specific piece in mind or need guidance curating
            an entire space, our consultants are here to help. Reach out and we
            will respond within 24 hours.
          </p>

          {/* Contact details */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Showroom
              </p>
              <p className="text-cream text-sm">
                14 Rue de Lumière, Paris 75008
              </p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Hours
              </p>
              <p className="text-cream text-sm">
                Monday – Saturday, 10:00 – 19:00
              </p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase mb-1">
                Email
              </p>
              <p className="text-cream text-sm">
                contact@maisonluxury.com
              </p>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="flex flex-col gap-6">

          {/* Preferences summary if available */}
          {preferences && (preferences.category || preferences.style || preferences.priceRange) && (
            <div className="border border-gold border-opacity-30 p-4 mb-2">
              <p className="text-gold text-xs tracking-widest uppercase mb-3">
                Your Preferences
              </p>
              <div className="flex gap-6">
                {preferences.category && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Room
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.category}
                    </p>
                  </div>
                )}
                {preferences.style && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Style
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.style}
                    </p>
                  </div>
                )}
                {preferences.priceRange && (
                  <div>
                    <p className="text-muted text-xs uppercase tracking-widest">
                      Budget
                    </p>
                    <p className="text-cream text-xs capitalize mt-1">
                      {preferences.priceRange}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-xs tracking-widest uppercase">
              Full Name
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
              Email Address
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
            {status === "loading" ? "Sending..." : "Send Enquiry"}
          </button>

          {/* Success message */}
          {status === "success" && (
            <p className="text-gold text-xs tracking-widest uppercase text-center">
              ✓ Your message has been sent. We will be in touch shortly.
            </p>
          )}

          {/* Error message */}
          {status === "error" && (
            <p className="text-red-400 text-xs tracking-widest uppercase text-center">
              Something went wrong. Please try again.
            </p>
          )}

        </div>
      </div>

    </div>
  );
};

export default ContactForm;