import type { SVGProps } from "react";
export const Map01 = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16 6 9 2 2 6v16l7-4m7-12 6-4v16l-6 4-7-4m0 0V2m7 20V6"
    />
  </svg>
);
