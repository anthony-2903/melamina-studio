// src/lib/supabaseClient.ts
// Stub implementation to remove Supabase dependency while preserving
// the surface used across the app (from().select().order(), from().insert(),
// storage.from().upload(), storage.from().getPublicUrl()). This keeps the
// app running without @supabase/supabase-js.

type SupabaseResult<T> = Promise<{ data: T | null; error: any } | any>;

const mockDB: Record<string, any[]> = {
	portfolios: [],
	categories: [],
};

const from = (table: string) => {
	return {
		select: (_sel: string) => ({
			order: async (_col: string, _opts: any) => {
				const data = mockDB[table] ? [...mockDB[table]] : [];
				// return newest first if created_at exists
				data.sort((a, b) => {
					if (!a.created_at || !b.created_at) return 0;
					return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
				});
				return { data, error: null } as any;
			},
		}),
		insert: async (items: any[]) => {
			const now = new Date().toISOString();
			const inserted = items.map((it, i) => ({ id: String(Date.now() + i), created_at: now, ...it }));
			mockDB[table] = [...(mockDB[table] || []), ...inserted];
			return { error: null } as any;
		},
	};
};

const storage = {
	from: (_bucket: string) => ({
		upload: async (_fileName: string, _file: File | any) => {
			// no-op: pretend upload succeeded
			return { error: null } as any;
		},
		getPublicUrl: (_fileName: string) => ({ data: { publicUrl: "" } }),
	}),
};

export const supabase = { from, storage } as any;
