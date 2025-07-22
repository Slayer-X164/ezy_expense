import { useId } from "react";

interface Color {
  color1: string;
  color2: string;
}
const Star = ({ color1, color2 }: Color) => {
  const id = useId();
  const starGradientId = `gradient-${id}`;
  const glowId = `glow-${id}`;

  return (
    <div className="flex items-center justify-center  bg-transparent ">
      <svg width="180" height="180" viewBox="0 0 300 300">
        <defs>
          {/* Gradient for the star */}
          <linearGradient
            id={starGradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color1} />
            <stop offset="100%" stopColor={color2} />
          </linearGradient>

          {/* Glow filter */}
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Circle path for circular text */}
          <path
            id="circlePath"
            d="M150,150 m-120,0 a120,120 0 1,1 240,0 a120,120 0 1,1 -240,0"
          />
        </defs>

        {/* Circular Text */}
        <text
          fill="white"
          fontSize="14"
          fontFamily="sans-serif"
          textLength="760"
          letterSpacing="2"
        >
          <textPath href="#circlePath" startOffset="0%" className="text-lg">
            Spend Smart Save More Budget Planner .
          </textPath>
        </text>

        {/* Glowing star in center */}
        <g filter={`url(#${glowId})`}>
          <path
            d="M150 50 L155 150 L150 250 L145 150 Z"
            fill={`url(#${starGradientId})`}
          />
          <path
            d="M50 150 L150 155 L250 150 L150 145 Z"
            fill={`url(#${starGradientId})`}
          />
        </g>
      </svg>
    </div>
  );
};

export default Star;
