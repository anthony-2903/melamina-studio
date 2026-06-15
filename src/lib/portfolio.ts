import { supabase } from "@/lib/supabaseClient";

export const PORTFOLIO_PAGE_SIZE = 12;

export type Category = { id: string; name: string };
export type PortfolioItem = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category_id: string | null;
  media_type: "image" | "video";
  media_width: number | null;
  media_height: number | null;
  media_duration: number | null;
  cloudinary_public_id: string | null;
  category: Category | null;
};

type PortfolioRecord = Omit<PortfolioItem, "category"> & {
  categories: Category | Category[] | null;
};

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchPortfolioPage(page: number): Promise<PortfolioItem[]> {
  const from = page * PORTFOLIO_PAGE_SIZE;
  const to = from + PORTFOLIO_PAGE_SIZE - 1;
  const fullResult = await supabase
    .from("portfolios")
    .select(`
      id,
      title,
      description,
      image_url,
      category_id,
      media_type,
      media_width,
      media_height,
      media_duration,
      cloudinary_public_id,
      categories ( id, name )
    `)
    .order("created_at", { ascending: false })
    .range(from, to);

  const result = fullResult.error
    ? await supabase
      .from("portfolios")
      .select("id, title, description, image_url, category_id, categories ( id, name )")
      .order("created_at", { ascending: false })
      .range(from, to)
    : fullResult;

  if (result.error) throw result.error;
  return ((result.data ?? []) as PortfolioRecord[]).map(({ categories, ...item }) => ({
    ...item,
    media_type: item.media_type ?? (item.image_url.match(/\.(mp4|mov|webm)(?:\?.*)?$/i) ? "video" : "image"),
    media_width: item.media_width ?? null,
    media_height: item.media_height ?? null,
    media_duration: item.media_duration ?? null,
    cloudinary_public_id: item.cloudinary_public_id ?? null,
    category: Array.isArray(categories) ? categories[0] ?? null : categories,
  }));
}
