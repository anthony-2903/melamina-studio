# Husheniid Studio

Sitio web y panel administrativo para el portafolio de muebles de melamina de Husheniid.

## Desarrollo

```sh
npm install
cp .env.example .env
npm run dev
```

## Comandos

- `npm run dev`: servidor local.
- `npm run lint`: validación ESLint.
- `npm run typecheck`: validación TypeScript.
- `npm run typecheck:strict`: validación estricta gradual.
- `npm run test`: pruebas unitarias.
- `npm run check`: lint, tipos, pruebas y build.
- `npm run lighthouse`: auditoría Lighthouse local.
- `npm run build`: compilación de producción.

## Servicios

- Supabase gestiona autenticación y contenido.
- Cloudinary almacena imágenes y videos mediante firmas generadas en `/api/cloudinary-signature`.
- Vercel sirve la SPA y la función de firma.

Configura las variables de `.env.example` localmente y en Vercel. `CLOUDINARY_API_SECRET` es exclusivamente server-side y nunca debe llevar el prefijo `VITE_`.

## Base de datos

Aplica las migraciones de `supabase/migrations` antes de publicar. Las políticas incluidas permiten lectura pública y reservan las escrituras para usuarios autenticados.

La migración `202606150001_media_metadata.sql` añade duración, dimensiones, tipo e identificador de Cloudinary. El frontend mantiene compatibilidad temporal con el esquema anterior, pero la migración debe aplicarse para guardar estos metadatos.
