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
    title: "Mobila la comanda",
    description:
      "Orice obiect este efectuat individual, dupa preferinta.",
  },
  {
    icon: "✦",
    title: "Echipa profesionala",
    description:
      "Designerul este si managerul companiei. A fost constructor timp de 20 de ani, 8 ani in Italia si Germania , si restul in Moldova. Are ochi pentru amanunturi, si efectueaza orice comanda la milimetru. S-a plasat pe locul 2 la campionatul moldovei la pus plita in baie, ceea ce demonstreaza aptitudinile de precizie",
    },
  {
    icon: "✦",
    title: "Toate capriciile pentru banii vostri",
    description:
      "Preturile incep de la un minim, si cresc in functie de preferinte. De exemplu un dulap ar putea fi amenajat cu lumina ceea ce se adaugalapret. Iar in cazul unei bucatarii, se pot folosi sertare avansate de la blum, balamali blum, sisteme speciale de deschidere a fasadelor si deasemenea lumina cu sensor integrata in dulap.",
  },
];

interface AboutUsProps {
  heading?: string;
  subheading?: string;
  story?: string;
}

const AboutUs: React.FC<AboutUsProps> = ({
  heading = "Doua decenii alaturi de voi",
  subheading = "Istoria noastra",
  story =
    "In 2005 Cazacu Teodor s-a intors de peste hotare cu scopul de a renunta la meseria de construtor. Prima lucrare a fost chiar la el acasa. O bucatarie de 4,5 metri, care pana si acum nu a necesitat reparatii. In 2010 a fost deschisa compania, care pana in ziua de astazi a efectuat peste 1000 de lucrari pe tot teritoriul Moldovei, precum si peste hotare.",
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
            Astazi, noi ne asumam cele mai dificile lucrari, care necesita proiecte individuale, saptamani de pregatire, ca intr-un final sa indeplinim cu success fiecare obiect.
          </p>

          {/* Stat row */}
          <div className="flex gap-12 mt-12">
            <div>
              <p className="font-serif text-4xl text-gold font-light">
                15+
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                Ani
              </p>
            </div>
            <div>
              <p className="font-serif text-4xl text-gold font-light">
                1000+
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                obiecte
              </p>
            </div>
            {/*<div>
              <p className="font-serif text-4xl text-gold font-light">
                12
              </p>
              <p className="text-muted text-xs tracking-widest uppercase mt-1">
                Artisans
              </p>
            </div>*/}
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