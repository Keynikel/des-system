import type { SVGProps } from "react";
export const Underline02 = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19 4v6a7 7 0 1 1-14 0V4m3.5 0v6a7 7 0 0 0 5.14 6.75M4 21h16M3 4h7.5M17 4h4"
    />
  </svg>
);
