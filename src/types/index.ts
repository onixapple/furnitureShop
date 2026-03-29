export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    style: ProductStyle;
    priceRange: PriceRange;
    imageUrl: string;
    description: string;
    featured: boolean;
  }

  export interface GameStep {
    id: number;
    question: string;
    options: GameOption[];
  }

  export interface GameOption {
    id: string;
    label: string;
    icon?: string;
    value: string;
  }

  export interface CustomerPreferences {
    category: ProductCategory | null;
    style: ProductStyle | null;
    priceRange: PriceRange | null;
  }
  

  export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    preferences?: CustomerPreferences;
  }

  export interface EmailPayload {
    name: string;
    email: string;
    message: string;
    preferences?: CustomerPreferences;
  }

  export type ProductCategory = "dulapuri" | "mese" | "bucatarii" | "antreuri" | "altele";
  export type ProductStyle = "modern" | "classic" ;
  export type PriceRange = "budget" | "mid" | "luxury";