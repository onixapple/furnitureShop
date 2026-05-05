import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";
import Analytics from "@/components/Analytics";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teomob.md";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TeoMob — Mobila la Comanda in Moldova | Bucatarii, Dulapuri, Antreuri",
    template: "%s | TeoMob Mobila la Comanda",
  },
  description:
    "TeoMob — atelier de mobila la comanda din Moldova, activ din 2010. Peste 1000 de proiecte realizate: bucatarii la comanda, dulapuri, antreuri si mobilier personalizat executat la milimetru dupa cerintele dumneavoastra.",
  keywords: [
    "mobila la comanda",
    "mobila la comanda moldova",
    "mobila la comanda chisinau",
    "bucatarii la comanda",
    "bucatarie la comanda moldova",
    "dulapuri la comanda",
    "antreuri la comanda",
    "mobilier personalizat moldova",
    "atelier mobila chisinau",
    "mobila mdf",
    "mobila pal",
    "mobila din lemn moldova",
    "teomob",
    "mobila ieftina moldova",
    "bucatarii moderne moldova",
  ],
  authors: [{ name: "TeoMob" }],
  creator: "TeoMob",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: SITE_URL,
    siteName: "TeoMob — Mobila la Comanda",
    title: "TeoMob — Mobila la Comanda in Moldova",
    description:
      "Atelier de mobila la comanda din Moldova. Bucatarii, dulapuri, antreuri si mobilier personalizat. Peste 1000 de proiecte in 15 ani.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "TeoMob — Mobila la Comanda Moldova",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TeoMob — Mobila la Comanda in Moldova",
    description:
      "Atelier de mobila la comanda din Moldova. Bucatarii, dulapuri, antreuri si mobilier personalizat.",
    images: ["/hero.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "TeoMob",
  description:
    "Atelier de mobila la comanda din Moldova. Bucatarii, dulapuri, antreuri si mobilier personalizat executat la comanda.",
  url: SITE_URL,
  email: "radu.cazacu1@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calea Basarabiei",
    addressLocality: "Chisinau",
    addressCountry: "MD",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  knowsAbout: [
    "Mobila la comanda",
    "Bucatarii la comanda",
    "Dulapuri la comanda",
    "Mobilier personalizat",
    "Design interior Moldova",
  ],
  foundingDate: "2010",
  slogan: "Creat pentru perfectiune",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NavbarWrapper />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
