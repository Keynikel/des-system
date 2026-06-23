import type { SVGProps } from "react";
export const ArrowsRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 7h11m-4-4 4 4-4 4m-7 6h16m-4-4 4 4-4 4"
    />
  </svg>
);
