import type { SVGProps } from "react";
export const ArrowBlockRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="m21 12-7-7v4H3.8c-.28 0-.42 0-.527.055a.5.5 0 0 0-.219.218C3 9.38 3 9.52 3 9.8v4.4c0 .28 0 .42.054.527a.5.5 0 0 0 .219.218C3.38 15 3.52 15 3.8 15H14v4z"
    />
  </svg>
);
