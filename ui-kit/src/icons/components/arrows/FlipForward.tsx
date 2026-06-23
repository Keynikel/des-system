import type { SVGProps } from "react";
export const FlipForward = (props: SVGProps<SVGSVGElement>) => (
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
      d="M21 9H7.5a4.5 4.5 0 1 0 0 9H12m5-5 4-4-4-4"
    />
  </svg>
);
