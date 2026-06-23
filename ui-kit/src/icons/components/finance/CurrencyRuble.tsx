import type { SVGProps } from "react";
export const CurrencyRuble = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.5 11.5h6a4 4 0 0 0 0-8h-6zm0 0h-2m7 4h-7M8.5 4v16.5"
    />
  </svg>
);
