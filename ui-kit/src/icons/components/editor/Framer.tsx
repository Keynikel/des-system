import type { SVGProps } from "react";
export const Framer = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 8.5H5v7l7 7v-7m-7 0h14l-7-7m0 0h7v-7H5z"
    />
  </svg>
);
