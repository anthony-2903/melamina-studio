import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    "[Supabase] Configuracion ausente. Define VITE_SUPABASE_URL y " +
      "VITE_SUPABASE_ANON_KEY en .env para habilitar los datos remotos.",
  );
}

// Keep module imports renderable when a local environment has not been set up.
// Requests still fail normally and are handled by the existing query error UI.
export const supabase = createClient(
  supabaseUrl || "https://missing-supabase-config.invalid",
  supabaseAnonKey || "missing-anon-key",
);
