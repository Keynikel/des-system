import type { SVGProps } from "react";
export const Move = (props: SVGProps<SVGSVGElement>) => (
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
      d="m5 15-3-3 3-3m-3 3h20m-7-7-3-3-3 3m3-3v20m-3-3 3 3 3-3m4-4 3-3-3-3"
    />
  </svg>
);
