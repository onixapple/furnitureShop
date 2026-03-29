import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

interface RawProduct {
  id: string;
  name: string;
  category: string;
  style: string;
  price_range: string;
  image_url: string;
  description: string;
  featured: boolean;
}

const mapProduct = (raw: RawProduct): Product => ({
  id: raw.id,
  name: raw.name,
  category: raw.category as Product["category"],
  style: raw.style as Product["style"],
  priceRange: raw.price_range as Product["priceRange"],
  imageUrl: raw.image_url,
  description: raw.description,
  featured: raw.featured,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("featured", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data as RawProduct[]).map(mapProduct);
};

export const fetchFilteredProducts = async (
  category?: string | null,
  style?: string | null,
  priceRange?: string | null
): Promise<Product[]> => {
  let query = supabase.from("products").select("*");

  if (category) query = query.eq("category", category);
  if (style) query = query.eq("style", style);
  if (priceRange) query = query.eq("price_range", priceRange);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching filtered products:", error.message);
    return [];
  }

  return (data as RawProduct[]).map(mapProduct);
};