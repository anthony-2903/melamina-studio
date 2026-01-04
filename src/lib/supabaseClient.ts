// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn(
		"[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Supabase client will use a noop stub.\n" +
			"Set these in your .env (Vite) to enable Supabase features."
	);
}

// If env vars exist, create a real client. Otherwise export a minimal stub
// so the app doesn't crash in development when Supabase isn't configured.
export const supabase =
	supabaseUrl && supabaseAnonKey
		? createClient(supabaseUrl, supabaseAnonKey)
		: // minimal stub used to avoid runtime exceptions when env vars missing
			({
				from: () => ({
					insert: async () => ({ error: null }),
				}),
				storage: {
					from: () => ({
						upload: async () => ({ error: null }),
						getPublicUrl: () => ({ data: { publicUrl: "" } }),
					}),
				},
			} as any);
