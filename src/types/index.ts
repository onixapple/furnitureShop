// Product displayed in the catalog
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  priceRange: PriceRange;
  imageUrl: string;
  projectImageUrl?: string;
  description: string;
}

// Game option shown as a button
export interface GameOption {
  id: string;
  label: string;
  image: string;
  value: string;
}

// A single dynamic step in the game
export interface GameStep {
  id: string;
  question: string;
  options: GameOption[];
  field: keyof CustomerPreferences;
}

// Full preference object built up through the game
export interface CustomerPreferences {
  room: RoomType | null;
  kitchenType: KitchenType | null;
  handles: HandleType | null;
  doorType: DoorType | null;
  materials: MaterialSelection | null;
  priceRange: PriceRange | null;
  description?: string;
  dimensions?: Dimensions;
}

// Contact form payload
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  preferences?: CustomerPreferences;
}

// Email request sent to Express backend
export interface EmailPayload {
  name: string;
  email: string;
  message: string;
  preferences?: CustomerPreferences;
}
export interface Dimensions {
  width: string;
  height: string;
}

export interface Material {
  name: string;
  image: string;
}

export interface MaterialSelection {
  pal: Material | null;
  mdf: Material | null;
}

// Enums
export type ProductCategory = "bucatarii" | "dulapuri" | "mese" | "antreuri" | "altele";
export type ProjectCategory = "bucatarii" | "dulapuri" | "altele";

export interface Project {
  id: string;
  category: ProjectCategory;
  imageUrl: string;
  title?: string;
}
export type PriceRange = "budget" | "mid" | "luxury";
export type RoomType = "bucatarie" | "dulapuri" | "livinguri" | "altele";
export type KitchenType = "classic" | "modern";
export type HandleType = "vizibile" | "ascunse";
export type DoorType = "glisante" | "balamale"; 