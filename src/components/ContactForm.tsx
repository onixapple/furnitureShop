"use client";

import React from "react";

const ContactForm: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-dark overflow-y-auto px-6 py-16">
      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      <div className="w-full text-center mb-12">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-3">Contactati-ne</p>
        <div className="gold-divider"></div>
      </div>

      <div className="flex flex-col items-center gap-10 text-center">
        <div>
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Showroom</p>
          <p className="text-cream text-sm">Calea Mosilor 4, butic 270</p>
        </div>

        <div className="w-8 h-px bg-gold/30" />

        <div>
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Ore showroom</p>
          <p className="text-cream text-sm">Marti – Duminica, 09:00 – 16:00</p>
        </div>

        <div className="w-8 h-px bg-gold/30" />

        <div>
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Telefon</p>
          <a href="tel:079091597" className="block text-cream text-sm hover:text-gold transition-colors duration-200">079 091 597</a>
          <a href="tel:060999314" className="block text-cream text-sm hover:text-gold transition-colors duration-200">060 999 314</a>
          <a href="tel:067109563" className="block text-cream text-sm hover:text-gold transition-colors duration-200">067 109 563</a>
        </div>

        <div className="w-8 h-px bg-gold/30" />

        <div>
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Email</p>
          <p className="text-cream text-sm">radu.cazacu1@gmail.com</p>
        </div>
      </div>

      {/* Right — Form */}
      {/*
      <div className="flex flex-col gap-6">
        <p className="text-gold text-xs tracking-[0.4em] uppercase mb-2">
          Lasati-ne un mesaj
        </p>
        <div className="flex flex-col gap-2">
          <label className="text-muted text-xs tracking-widest uppercase">Nume</label>
          <input type="text" name="name" placeholder="Andrei"
            className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted text-xs tracking-widest uppercase">Email</label>
          <input type="email" name="email" placeholder="andrei@example.com"
            className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-muted text-xs tracking-widest uppercase">Mesaj</label>
          <textarea name="message" placeholder="Spuneti-ne despre proiectul dumnevoastra" rows={4}
            className="bg-transparent border-b border-muted text-cream text-sm py-3 outline-none focus:border-gold transition-colors duration-300 placeholder:text-charcoal resize-none" />
        </div>
        <button className="mt-4 border border-gold text-gold text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-gold hover:text-dark transition-all duration-500">
          Expediati
        </button>
      </div>
      */}
    </div>
  );
};

export default ContactForm;
