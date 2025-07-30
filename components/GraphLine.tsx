// GraphLine.tsx
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

const pathData = `
  M -300 100
  L 50 100
  L 80 70
  L 110 120
  L 140 90
  L 170 150
  L 200 60
  L 230 120
  L 260 90
  L 900 90
`;

export default function GraphLine() {
  return (
   <div className='w-full '>
     <svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
      <motion.path
        d={pathData}
        stroke="#8c8c8c"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      />

      {/* Glowing dot at peak */}
      <motion.circle
        cx="200"
        cy="60"
        r="8"
        fill="hotpink"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3 }}
      />

      {/* Price bubble */}
      <motion.foreignObject x="210" y="20" width="100" height="40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
        <div style={{

          color: 'white',
          fontSize: '14px',
          padding: '6px 10px',
          borderRadius: '20px',
          display: 'inline-block',
          backdropFilter: 'blur(6px)'
        }} className='bg-neutral-800/70'>
          + ₹1200
        </div>
      </motion.foreignObject>
    </svg>
   </div>
  );
}
