import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

interface RawProduct {
  id: string;
  name: string;
  category: string;
  price_range: string;
  image_url: string;
  project_image_url?: string | null;
  description: string;
}

const mapProduct = (raw: RawProduct): Product => ({
  id: raw.id,
  name: raw.name,
  category: raw.category as Product["category"],
  priceRange: raw.price_range as Product["priceRange"],
  imageUrl: raw.image_url,
  projectImageUrl: raw.project_image_url ?? undefined,
  description: raw.description,
});

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data as RawProduct[]).map(mapProduct);
};

