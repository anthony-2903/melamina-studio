export const MAX_VIDEO_DURATION_SECONDS = 12;
export const MAX_VIDEO_WIDTH = 1920;
export const MAX_VIDEO_HEIGHT = 1080;

export type VideoMetadata = { duration: number; width: number; height: number };

export function validateVideoMetadata(metadata: VideoMetadata): string | null {
  if (metadata.duration > MAX_VIDEO_DURATION_SECONDS) {
    return `El video debe durar máximo ${MAX_VIDEO_DURATION_SECONDS} segundos.`;
  }
  if (metadata.width > MAX_VIDEO_WIDTH || metadata.height > MAX_VIDEO_HEIGHT) {
    return `El video debe tener una resolución máxima de ${MAX_VIDEO_WIDTH}x${MAX_VIDEO_HEIGHT}.`;
  }
  return null;
}

export function readVideoMetadata(file: File): Promise<VideoMetadata> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const metadata = { duration: video.duration, width: video.videoWidth, height: video.videoHeight };
      URL.revokeObjectURL(url);
      resolve(metadata);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer el video."));
    };
    video.src = url;
  });
}
