"use client";

import React from "react";

interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

const values: ValueProp[] = [
  {
    icon: "✦",
    title: "Handcrafted Excellence",
    description:
      "Every piece is crafted by master artisans with decades of experience, ensuring unparalleled quality in every detail.",
  },
  {
    icon: "✦",
    title: "Timeless Design",
    description:
      "We believe furniture should transcend trends. Our designs are built to remain elegant and relevant for generations.",
  },
  {
    icon: "✦",
    title: "Sustainable Materials",
    description:
      "We source only the finest ethically harvested woods, natural fabrics, and recycled metals from trusted suppliers.",
  },
];

interface AboutUsProps {
  heading?: string;
  subheading?: string;
  story?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  heading = "A Legacy of Craftsmanship",
  subheading = "Our Story",
  story =
    "Founded in 1987, Maison was born from a single belief — that the spaces we inhabit shape the lives we live. For over three decades we have been creating furniture that blends old world artisanship with contemporary vision, piece by piece, room by room.",
}) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-charcoal overflow-hidden px-6">

      {/* Gold line decorations */}
      <div className="absolute left-12 top-0 h-full w-px bg-gold opacity-20"></div>
      <div className="absolute right-12 top-0 h-full w-px bg-gold opacity-20"></div>

      {/* Top decorative line */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gold opacity-10"></div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* Left — Story */}
        <div className="flex flex-col">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            {subheading}
          </p>

          <h2 className="font-serif text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
            {heading}
          </h2>

          <div className="gold-divider" style={{ margin: "0 0 1.5rem 0" }}></div>

          <p className="text-muted text-sm leading-relaxed tracking-wide mb-8">
            {story}
          </p>

          <p className="text-muted text-sm leading-relaxed tracking-wide">
            Today, Maison operates from our flagship showroom where every visit
            is a journey through texture, form, and function. We invite you to
            experience furniture not as a purchase, but as an investment in your
            everyday life.
          </p>

          {/* Stat row */}
          <div className="flex gap-12 mt-12">
            <div>
              <p className="font-serif text-4xl text-gold font-light">
                35+
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                Years
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold font-light">
                200+
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                Pieces
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold font-light">
                12
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                Artisans
              </p>
            </div>
          </div>
        </div>

        {/* Right — Values */}
        <div className="flex flex-col gap-8">
          {values.map((value: ValueProp, index: number) => (
            <div
              key={index}
              className="flex gap-6 items-start border-b border-charcoal pb-8 last:border-b-0 last:pb-0"
            >
              <span className="text-gold text-lg mt-1">
                {value.icon}
              </span>
              <div>
                <h3 className="font-serif text-xl text-cream font-light mb-2">
                  {value.title}
                </h3>
                <p className="text-muted text-xs leading-relaxed tracking-wide">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-12 right-12 h-px bg-gold opacity-10"></div>

    </div>
  );
};

export default AboutUs;