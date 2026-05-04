"use client";

import React from "react";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import ColoriDisponibile from "@/components/ColoriDisponibile";
import AboutUs from "@/components/AboutUs";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll">
      <section id="hero">
        <Hero />
      </section>

      <section id="catalog">
        <ProductCatalog />
      </section>

      <section id="culori">
        <ColoriDisponibile />
      </section>

      <section id="about">
        <AboutUs />
      </section>

      <section id="contact">
        <ContactForm />
      </section>
    </main>
  );
}
