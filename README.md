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

## Supabase en el plan gratuito

Vercel ejecuta diariamente `/api/supabase-keepalive` mediante la configuraci�n de `vercel.json`. La funci�n realiza consultas ligeras a Supabase para generar actividad real de base de datos y reducir la probabilidad de que un proyecto gratuito sea pausado por inactividad.

Para que funcione, configura estas variables en el entorno **Production** de Vercel y vuelve a desplegar:

- `VITE_SUPABASE_URL`: URL vigente del proyecto Supabase.
- `VITE_SUPABASE_ANON_KEY`: clave publicable/anon del proyecto.
- `CRON_SECRET`: cadena aleatoria larga; Vercel la env�a automáticamente como token Bearer al cron.

El keep-alive no cambia el plan de Supabase ni habilita facturación. Supabase no garantiza que consultas programadas eviten siempre una pausa; para disponibilidad garantizada se necesita un plan de pago.

## Base de datos

Aplica las migraciones de `supabase/migrations` antes de publicar. Las políticas incluidas permiten lectura pública y reservan las escrituras para usuarios autenticados.

La migración `202606150001_media_metadata.sql` añade duración, dimensiones, tipo e identificador de Cloudinary. El frontend mantiene compatibilidad temporal con el esquema anterior, pero la migración debe aplicarse para guardar estos metadatos.
