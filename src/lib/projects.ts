import { supabase } from "@/lib/supabase";
import { Project } from "@/types";

interface RawProject {
  id: string;
  category: string;
  image_url: string;
  title?: string | null;
}

const mapProject = (raw: RawProject): Project => ({
  id: raw.id,
  category: raw.category as Project["category"],
  imageUrl: raw.image_url,
  title: raw.title ?? undefined,
});

export const fetchProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from("proiecte")
    .select("*");

  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  return (data as RawProject[]).map(mapProject);
};
