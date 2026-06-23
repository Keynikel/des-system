import type { SVGProps } from "react";
export const ParagraphSpacing = (props: SVGProps<SVGSVGElement>) => (
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
      d="M21 10h-8m8-4h-8m8 8h-8m8 4h-8m-7 2V4m3 13-3 3-3-3M9 7 6 4 3 7"
    />
  </svg>
);
