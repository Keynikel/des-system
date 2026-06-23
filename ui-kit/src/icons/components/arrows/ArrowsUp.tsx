import type { SVGProps } from "react";
export const ArrowsUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7 20V4m4 4L7 4 3 8m14 12V9m4 4-4-4-4 4"
    />
  </svg>
);
