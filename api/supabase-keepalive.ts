const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const CRON_SECRET = process.env.CRON_SECRET;

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = {
  status: (code: number) => {
    json: (body: unknown) => void;
  };
  setHeader?: (name: string, value: string) => void;
};

function getHeader(headers: VercelRequest["headers"], name: string) {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader?.("Cache-Control", "no-store");

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!CRON_SECRET) {
    response.status(500).json({ error: "CRON_SECRET is not configured" });
    return;
  }

  const authorization = getHeader(request.headers, "authorization");
  if (authorization !== `Bearer ${CRON_SECRET}`) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    response.status(500).json({ error: "Supabase is not configured" });
    return;
  }

  const keepAliveResponse = await fetch(
    `${SUPABASE_URL}/rest/v1/categories?select=id&limit=1`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
  );

  if (!keepAliveResponse.ok) {
    response.status(keepAliveResponse.status).json({
      error: "Supabase keep-alive request failed",
    });
    return;
  }

  response.status(200).json({ ok: true, checkedAt: new Date().toISOString() });
}
