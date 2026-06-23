import type { SVGProps } from "react";
export const Mouse = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 9V3m0 6H6.5A2.5 2.5 0 0 0 4 11.5V16a6 6 0 0 0 6 6h4a6 6 0 0 0 6-6v-4.5A2.5 2.5 0 0 0 17.5 9z"
    />
  </svg>
);
