
"use client";

import { motion, useAnimation } from "framer-motion";
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
  
  const handleInteraction = async () => {
    await controls.start("wink");
    controls.start(mascotState);
  };
  
  const containerVariants = {
    idle: { y: 0 },
    focused: { y: 0 },
    celebrating: { 
      y: [0, -15, 0, -15, 0], 
      transition: { duration: 1.5, ease: "easeInOut" } 
    },
    wink: {
      scale: [1, 0.95, 1],
      transition: { duration: 0.5 }
    }
  };

  const eyeVariants = {
    idle: { d: "M 20 28 C 21.1 28 22 27.1 22 26 C 22 24.9 21.1 24 20 24 C 18.9 24 18 24.9 18 26 C 18 27.1 18.9 28 20 28 Z M 44 28 C 45.1 28 46 27.1 46 26 C 46 24.9 45.1 24 44 24 C 42.9 24 42 24.9 42 26 C 42 27.1 42.9 28 44 28 Z" },
    focused: { d: "M 20 28 C 21.1 28 22 27.1 22 26 C 22 24.9 21.1 24 20 24 C 18.9 24 18 24.9 18 26 C 18 27.1 18.9 28 20 28 Z M 44 28 C 45.1 28 46 27.1 46 26 C 46 24.9 45.1 24 44 24 C 42.9 24 42 24.9 42 26 C 42 27.1 42.9 28 44 28 Z" },
    celebrating: { d: "M 18 26 C 18 24.9 18.9 24 20 24 C 21.1 24 22 24.9 22 26 C 22 27.1 21.1 28 20 28 C 18.9 28 18 27.1 18 26 Z M 42 26 C 42 24.9 42.9 24 44 24 C 45.1 24 46 24.9 46 26 C 46 27.1 45.1 28 44 28 C 42.9 28 42 27.1 42 26 Z" },
    wink: { 
      d: "M 18 26 C 18 24.9 18.9 24 20 24 C 21.1 24 22 24.9 22 26 C 22 27.1 21.1 28 20 28 C 18.9 28 18 27.1 18 26 Z M 40 26 C 42 22, 46 22, 48 26",
      transition: { duration: 0.1, delay: 0.1 } 
    }
  };
  
  const mouthVariants = {
    idle: { d: "M 24 40 C 28 44, 36 44, 40 40" },
    focused: { d: "M 22 38 C 24 48, 40 48, 42 38 Z" },
    celebrating: { d: "M 22 38 C 24 48, 40 48, 42 38 Z" },
    wink: { 
      d: "M 24 40 C 28 44, 36 44, 40 40",
      transition: { duration: 0.1, delay: 0.1 }
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-48 h-48 relative cursor-pointer"
        onClick={handleInteraction}
        variants={containerVariants}
        animate={controls}
      >
        <div className="w-full h-full">
            <svg viewBox="0 0 64 64" width="192" height="192">
                {/* Body */}
                <path d="M 54 24 V 52 C 54 55.3137 51.3137 58 48 58 H 16 C 12.6863 58 10 55.3137 10 52 V 24 C 10 20.6863 12.6863 18 16 18 H 48 C 51.3137 18 54 20.6863 54 24 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
                
                {/* Antenna */}
                <line x1="32" y1="18" x2="32" y2="10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="32" cy="8" r="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
                
                {/* Ears */}
                <circle cx="8" cy="36" r="6" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
                <circle cx="56" cy="36" r="6" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" />
                
                {/* Face Plate */}
                <path d="M 48 22 V 52 C 48 53.1046 47.1046 54 46 54 H 18 C 16.8954 54 16 53.1046 16 52 V 22 C 16 20.8954 16.8954 20 18 20 H 46 C 47.1046 20 48 20.8954 48 22 Z" fill="#212121" />
                
                {/* Eyes */}
                <motion.path
                    fill="#40E0D0"
                    variants={eyeVariants}
                    animate={controls}
                />
                 
                {/* Mouth */}
                 <motion.path
                    fill="#40E0D0"
                    stroke="#40E0D0"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    variants={mouthVariants}
                    animate={controls}
                 />
            </svg>
        </div>
      </motion.div>

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
    </div>
  );
}
