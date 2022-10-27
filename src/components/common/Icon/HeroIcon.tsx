import { useCallback } from "react";

// type
import type { HeroIconShape } from "@src/types";

type Props = {
  shape: HeroIconShape;
  className: string;
};

const HeroIcon = ({ shape, className }: Props) => {
  const getIcon = useCallback(() => {
    switch (shape) {
      case "CircleQuestion":
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </>
        );
      case "DoubleArrowBottom":
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5"
            />
          </>
        );
      case "Search":
        return (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </>
        );

      default:
        return <span>존재하지 않는 아이콘입니다.</span>;
    }
  }, [shape]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {getIcon()}
    </svg>
  );
};

export default HeroIcon;
