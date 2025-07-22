"use client";

import { useId } from "react";

type CurvyLineProps = {
  colorStart: string;
  colorEnd: string;
  width?: number;
  height?: number;
  opacity?: number;
};

const CurvyLine = ({
  colorStart,
  colorEnd,
  width = 512,
  height = 500,
  opacity = 1,
}: CurvyLineProps) => {
  const id = useId();
  const gradientId = `gradient-${id}`;

  return (
   <div className="flex items-center justify-center  overflow-hidden h-46">
     <svg
      viewBox="0 0 512 80"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="overflow-visible"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
      </defs>

      {[0, 30, 60].map((offsetY, index) => (
        <path
          key={index}
          d={`M0 ${offsetY + 30}C64 ${offsetY + 30} 64 ${offsetY} 128 ${offsetY}C192 ${offsetY} 192 ${
            offsetY + 30
          } 256 ${offsetY + 30}C320 ${offsetY + 30} 320 ${offsetY} 384 ${offsetY}C448 ${offsetY} 448 ${
            offsetY + 30
          } 512 ${offsetY + 30}`}
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={1 + index * 1}
        />
      ))}
    </svg>
   </div>
  );
};

export default CurvyLine;
