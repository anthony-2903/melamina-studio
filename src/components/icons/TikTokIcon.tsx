import type { SVGProps } from "react";

type TikTokIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function TikTokIcon({ size = 18, width, height, ...props }: TikTokIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={width ?? size}
      height={height ?? size}
      fill="currentColor"
      aria-hidden="true"
      className="block"
      focusable="false"
      {...props}
    >
      <path d="M18.32 6.51a5.42 5.42 0 0 1-3.31-1.13A5.45 5.45 0 0 1 12.87 2h-3.4v13.47a2.92 2.92 0 1 1-2.1-2.8V9.22a6.29 6.29 0 0 0-.92-.07A6.35 6.35 0 1 0 12.8 15.5V8.63a8.84 8.84 0 0 0 5.52 1.91V6.51Z" />
    </svg>
  );
}
