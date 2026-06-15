import { createHash } from "node:crypto";

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.VITE_CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(
  request: { method?: string; headers: Record<string, string | string[] | undefined> },
  response: { status: (code: number) => { json: (body: unknown) => void } },
) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!CLOUD_NAME || !API_KEY || !API_SECRET || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    response.status(500).json({ error: "Cloudinary is not configured" });
    return;
  }

  const authorization = request.headers.authorization;
  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_ANON_KEY, authorization },
  });
  if (!userResponse.ok) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "husheniid/portfolio";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");

  response.status(200).json({
    apiKey: API_KEY,
    cloudName: CLOUD_NAME,
    folder,
    signature,
    timestamp,
  });
}
