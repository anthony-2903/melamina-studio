const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const SITE_URL = "https://husheniid.com"; // Dominio de producción

/**
 * Genera una URL de Cloudinary Fetch para una imagen dada.
 * En desarrollo, devuelve la ruta local original.
 * En producción, devuelve una URL de Cloudinary optimizada.
 * 
 * @param src - La ruta local (ej. /assets/image.jpg) o URL completa
 * @param width - El ancho deseado para la imagen
 * @returns URL de imagen optimizada
 */
export function getOptimizedUrl(src: string, width?: number): string {
  if (!src) return "";
  
  // En desarrollo usamos las imágenes locales para evitar que Cloudinary no pueda acceder a localhost
  // A menos que sea una URL externa (como las de Supabase/Cloudinary que ya están en la nube)
  const isRemote = src.startsWith("http");
  if (import.meta.env.DEV && !isRemote) return src;

  // Si ya es una URL de Cloudinary de nuestra propia cuenta, podemos manipularla directamente
  if (src.includes(`res.cloudinary.com/${CLOUD_NAME}`)) {
    if (!width) return src;
    // Insertamos las transformaciones de ancho antes de /upload/
    return src.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
  }

  // Si es una ruta local absoluta, le añadimos el dominio del sitio
  const fullUrl = src.startsWith("/") ? `${SITE_URL}${src}` : src;

  // Si no hay configuración de Cloudinary, usamos la URL original
  if (!CLOUD_NAME) return fullUrl;

  // f_auto: formato automático
  // q_auto: compresión de calidad automática
  let transformations = "f_auto,q_auto";
  
  if (width) {
    transformations += `,w_${width},c_limit`;
  }

  // Usamos el API de Fetch de Cloudinary para imágenes externas o locales en producción
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${transformations}/${encodeURIComponent(fullUrl)}`;
}
