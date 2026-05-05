import { supabase } from "@/lib/supabase";

export const trackPageView = async (): Promise<void> => {
  await supabase.from("analytics").insert({ event: "page_view" });
};

export interface SiteStats {
  total: number;
  today: number;
  thisWeek: number;
}

export const getStats = async (): Promise<SiteStats> => {
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);

  const [{ count: total }, { count: today }, { count: thisWeek }] = await Promise.all([
    supabase
      .from("analytics")
      .select("*", { count: "exact", head: true })
      .eq("event", "page_view"),
    supabase
      .from("analytics")
      .select("*", { count: "exact", head: true })
      .eq("event", "page_view")
      .gte("created_at", todayStart.toISOString()),
    supabase
      .from("analytics")
      .select("*", { count: "exact", head: true })
      .eq("event", "page_view")
      .gte("created_at", weekStart.toISOString()),
  ]);

  return {
    total: total ?? 0,
    today: today ?? 0,
    thisWeek: thisWeek ?? 0,
  };
};
