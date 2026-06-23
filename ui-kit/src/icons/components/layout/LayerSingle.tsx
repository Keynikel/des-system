import type { SVGProps } from "react";
export const LayerSingle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.358 7.179c-.131-.066-.197-.098-.266-.111a.5.5 0 0 0-.184 0c-.069.013-.135.045-.266.111L2 12l9.642 4.821c.131.066.197.099.266.111q.091.018.184 0c.069-.012.135-.045.266-.11L22 12z"
    />
  </svg>
);
