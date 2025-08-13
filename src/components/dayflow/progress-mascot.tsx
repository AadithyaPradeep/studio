
"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useMemo, useEffect } from "react";

interface ProgressMascotProps {
  progress: number; // 0-100
}

export default function ProgressMascot({ progress }: ProgressMascotProps) {
  const controls = useAnimation();

  const mascotState = useMemo(() => {
    if (progress < 1) return "idle";
    if (progress < 100) return "focused";
    return "celebrating";
  }, [progress]);

  useEffect(() => {
    controls.start(mascotState);
  }, [mascotState, controls]);
  
  const handleInteraction = () => {
    controls.start("wink");
    setTimeout(() => {
      controls.start(mascotState);
    }, 1200);
  };
  
  const faceVariants = {
    idle: { y: 0, scale: 1 },
    focused: { y: -2, scale: 1.02 },
    celebrating: { 
      y: [0, -15, 0], 
      scale: [1, 1.1, 1],
      transition: { y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } } 
    },
    wink: { scale: 1, transition: { duration: 0.2 } },
  };

  const eyeLidVariants = {
    idle: { 
      y: [0, 0, -2, 0, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    focused: { y: -3 },
    celebrating: { y: 0, d: "M 4 8 C 8 2, 16 2, 20 8" },
    wink: {
      d: ["M 4 8 C 8 8, 16 8, 20 8", "M 4 2 C 8 6, 16 6, 20 2", "M 4 8 C 8 8, 16 8, 20 8"],
      transition: { duration: 0.5 }
    }
  };
  
  const mouthVariants = {
    idle: { d: "M 18 42 Q 24 46 30 42" },
    focused: { d: "M 18 42 L 30 42" },
    celebrating: { d: "M 16 40 C 20 52, 28 52, 32 40 Z" },
    wink: { d: "M 18 42 Q 24 46 30 42" },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 relative cursor-pointer" onClick={handleInteraction}>
        <motion.div
          className="w-full h-full flex items-center justify-center"
          variants={faceVariants}
          initial="idle"
          animate={controls}
        >
          <div className="relative w-40 h-40">
            {/* Main Face */}
            <div className="absolute inset-0 rounded-full bg-secondary shadow-inner" 
                 style={{backgroundColor: '#F3D4B8'}}/>
            
            {/* Hair */}
            <svg viewBox="0 0 64 64" className="absolute -top-3 left-0 w-full h-full overflow-visible">
               <motion.path
                d="M 2,32 C 2,12 12,2 32,2 C 52,2 62,12 62,32 C 62,40 60,45 56,48 C 50,52 45,48 42,45 C 38,48 34,52 32,50 C 28,52 24,48 20,45 C 15,48 10,52 8,48 C 4,45 2,40 2,32 Z"
                fill="#8D5B4C"
               />
            </svg>

            {/* Eyes and Mouth */}
            <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                {/* Cheeks */}
                <circle cx="14" cy="36" r="4" fill="#E8A899" />
                <circle cx="34" cy="36" r="4" fill="#E8A899" />
                
                {/* Nose */}
                <path d="M 24 30 L 24 35" stroke="#C78A69" strokeWidth="1.5" strokeLinecap="round" />

                 {/* Eyes */}
                <g transform="translate(0, 18)">
                    <motion.path 
                        d="M 12 8 C 14 2, 20 2, 22 8" 
                        stroke="#4F342B" 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeLinecap="round" 
                        variants={eyeLidVariants} 
                        initial="idle"
                        animate={controls}
                    />
                    <motion.path 
                        d="M 26 8 C 28 2, 34 2, 36 8" 
                        stroke="#4F342B" 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeLinecap="round" 
                        variants={eyeLidVariants} 
                        initial="idle"
                        animate={controls}
                    />
                </g>
                 
                {/* Mouth */}
                 <motion.path
                    stroke="#4F342B"
                    strokeWidth="2.5"
                    fill="white"
                    strokeLinejoin="round"
                    variants={mouthVariants}
                    initial="idle"
                    animate={controls}
                 />
            </svg>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={mascotState}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full"
        >
          {mascotState === "idle"
            ? "Ready for a new day!"
            : mascotState === "focused"
            ? "Keep up the great work!"
            : "All tasks complete! Great job!"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
