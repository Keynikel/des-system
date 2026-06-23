import type { SVGProps } from "react";
export const SwitchVertical01 = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17 4v16m4-4-4 4-4-4m-6 4V4m4 4L7 4 3 8"
    />
  </svg>
);
