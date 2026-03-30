// Product displayed in the catalog
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
  colors: [string, string] | null;
  priceRange: PriceRange | null;
  description?: string;
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

// Enums
export type ProductCategory = "sofa" | "chair" | "table" | "bed" | "storage";
export type ProductStyle = "modern" | "classic" | "scandinavian" | "industrial";
export type PriceRange = "budget" | "mid" | "luxury";
export type RoomType = "kitchen" | "drawers" | "bathrooms" | "other";
export type KitchenType = "classic" | "modern";
export type HandleType = "visible" | "hidden";
export type DoorType = "sliding" | "normal";