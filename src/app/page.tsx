"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import PreferenceGame from "@/components/PreferenceGame";
import ProductCatalog from "@/components/ProductCatalog";
import AboutUs from "@/components/AboutUs";
import ContactForm from "@/components/ContactForm";
import { CustomerPreferences } from "@/types";

export default function Home() {
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    room: null,
    kitchenType: null,
    handles: null,
    doorType: null,
    materials: null,
    priceRange: null,
  });

  const handleGameComplete = (result: CustomerPreferences): void => {
    setPreferences(result);
  };

  const handleGameRestart = (): void => {
    setPreferences({
      room: null,
      kitchenType: null,
      handles: null,
      doorType: null,
      materials: null,
      priceRange: null,
    });
  };

  return (
    <main className="h-screen overflow-y-scroll">
      <section id="hero">
        <Hero />
      </section>

      <section id="game">
  <PreferenceGame
    onComplete={handleGameComplete}
    onRestart={handleGameRestart}
  />
</section>

      <section id="catalog">
        <ProductCatalog preferences={preferences} />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="contact">
        <ContactForm preferences={preferences} />
      </section>
    </main>
  );
}
