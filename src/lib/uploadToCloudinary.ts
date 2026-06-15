import { supabase } from "@/lib/supabaseClient";

export type CloudinaryUpload = {
  secureUrl: string;
  publicId: string;
  mediaType: "image" | "video";
  width: number | null;
  height: number | null;
  duration: number | null;
};

export async function uploadToCloudinary(file: File, onProgress?: (progress: number) => void): Promise<CloudinaryUpload> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Tu sesión expiró. Vuelve a iniciar sesión.");

  const signatureResponse = await fetch("/api/cloudinary-signature", {
    method: "POST",
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
  if (!signatureResponse.ok) throw new Error("No se pudo autorizar la subida");

  const { apiKey, cloudName, folder, signature, timestamp } = await signatureResponse.json() as {
    apiKey: string;
    cloudName: string;
    folder: string;
    signature: string;
    timestamp: number;
  };

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("folder", folder);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());

  const data = await new Promise<{
    secure_url?: string;
    public_id?: string;
    resource_type?: "image" | "video";
    width?: number;
    height?: number;
    duration?: number;
    error?: { message?: string };
  }>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100));
    };
    request.onerror = () => reject(new Error("No se pudo conectar con Cloudinary"));
    request.onload = () => {
      const result = JSON.parse(request.responseText) as typeof data;
      if (request.status < 200 || request.status >= 300) {
        reject(new Error(result.error?.message ?? "Cloudinary rechazó el archivo"));
        return;
      }
      resolve(result);
    };
    request.send(formData);
  });

  if (!data.secure_url) throw new Error("Cloudinary no devolvió una URL válida");
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id ?? "",
    mediaType: data.resource_type === "video" ? "video" : "image",
    width: data.width ?? null,
    height: data.height ?? null,
    duration: data.duration ?? null,
  };
}
