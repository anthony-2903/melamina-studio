const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const CRON_SECRET = process.env.CRON_SECRET;
const REQUEST_TIMEOUT_MS = 10_000;

const KEEP_ALIVE_QUERIES = [
  "/rest/v1/categories?select=id&limit=1",
  "/rest/v1/portfolios?select=id&limit=1",
  "/rest/v1/categories?select=id&limit=1",
] as const;

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

async function runDatabaseCheck(path: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(`${SUPABASE_URL}${path}`, {
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "cache-control": "no-cache",
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
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

  try {
    const checks = [];

    for (const query of KEEP_ALIVE_QUERIES) {
      const result = await runDatabaseCheck(query);
      checks.push(result.status);

      if (!result.ok) {
        response.status(502).json({
          error: "Supabase keep-alive request failed",
          upstreamStatus: result.status,
          checks,
        });
        return;
      }
    }

    response.status(200).json({
      ok: true,
      checks,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    response.status(504).json({
      error: "Supabase keep-alive request timed out or could not connect",
      detail: error instanceof Error ? error.name : "UnknownError",
    });
  }
}
