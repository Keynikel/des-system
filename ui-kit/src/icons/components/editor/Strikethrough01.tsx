import type { SVGProps } from "react";
export const Strikethrough01 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 16a4 4 0 0 0 4 4h4a4 4 0 0 0 0-8m4-4a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4m-3 4h18"
    />
  </svg>
);
