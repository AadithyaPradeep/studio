
"use client";

import { motion, useAnimation } from "framer-motion";
import { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    // Give a slight delay to the initial animation for a smoother entry
    setTimeout(() => {
      controls.start(mascotState);
    }, 300);
  }, [mascotState, controls]);
  
  const handleInteraction = async () => {
    await controls.start("wink");
    controls.start(mascotState);
  };
  
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    idle: { 
      opacity: 1,
      scale: 1,
      y: [0, -8, 0], 
      transition: { duration: 3, ease: "easeInOut", repeat: Infinity } 
    },
    focused: { 
      opacity: 1,
      scale: 1.05,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    celebrating: { 
      opacity: 1,
      scale: 1,
      y: [0, -25, 0, -25, 0], 
      transition: { y: { duration: 1.2, ease: "easeInOut" }, scale: {duration: 0.5} } 
    },
  };
  
  const eyeVariants = {
    initial: {
      d: "M 24,32 C 24,28 30,28 30,32 C 30,36 24,36 24,32 Z M 40,32 C 40,28 46,28 46,32 C 46,36 40,36 40,32 Z",
    },
    idle: (i: number) => ({
      d: "M 24,32 C 24,28 30,28 30,32 C 30,36 24,36 24,32 Z M 40,32 C 40,28 46,28 46,32 C 46,36 40,36 40,32 Z",
      transition: { duration: 0.5, delay: i * 0.05 },
    }),
    wink: (i: number) => ({
      d: i === 1
        ? "M 24,32 C 24,28 30,28 30,32 C 30,36 24,36 24,32 Z M 40,33 C 42,31 44,31 46,33" // Left eye open, right eye winks
        : "M 24,33 C 26,31 28,31 30,33 M 40,32 C 40,28 46,28 46,32 C 46,36 40,36 40,32 Z", // Right eye open, left eye winks
      transition: { duration: 0.15, ease: "easeInOut" },
    }),
    focused: (i: number) => ({
      d: "M 22,32 C 22,27 32,27 32,32 C 32,37 22,37 22,32 Z M 38,32 C 38,27 48,27 48,32 C 48,37 38,37 38,32 Z",
      transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 },
    }),
    celebrating: (i: number) => ({
      d: "M 22,30 C 26,26 30,26 34,30 M 38,30 C 42,26 46,26 50,30",
      transition: { duration: 0.4, ease: "easeOut", delay: i * 0.05 },
    }),
  };

  const pupilVariants = {
    initial: { scale: 0, x: 0, y: 0 },
    idle: { scale: 1, x: 0, y: 0, transition: { duration: 0.4, delay: 0.1 } },
    focused: { scale: 1.15, x: 0, y: 0, transition: { duration: 0.4 } },
    celebrating: { scale: 0, y: -2, transition: { duration: 0.3 } },
    wink: { scale: 0, transition: { duration: 0.1 } },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-48 h-48 relative cursor-pointer"
        onClick={handleInteraction}
        variants={containerVariants}
        initial="initial"
        animate={controls}
      >
        <div className="w-full h-full" style={{ perspective: "1000px" }}>
            <svg viewBox="0 0 70 70" width="192" height="192" fill="none">
              <defs>
                <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style={{ stopColor: "#5E9EFF", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#4A78D1", stopOpacity: 1 }} />
                </radialGradient>
                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
              </defs>

              {/* Body */}
              <motion.circle 
                cx="35" cy="35" r="30" 
                fill="#D8E7FF"
                stroke="#AABEE4"
                strokeWidth="2"
              />
              
              {/* Face Content */}
              <g>
                {/* Eyes */}
                <motion.path
                  stroke="#3D457F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={eyeVariants}
                  custom={1}
                  animate={controls}
                />
                 {/* Pupils - with depth */}
                 <g>
                    <motion.circle cx="27.5" cy="32" r="4.5" fill="url(#irisGradient)" variants={pupilVariants} animate={controls} />
                    <motion.circle cx="26.5" cy="31" r="1.5" fill="white" fillOpacity="0.8" variants={pupilVariants} animate={controls} />
                 </g>
                 <g>
                    <motion.circle cx="43.5" cy="32" r="4.5" fill="url(#irisGradient)" variants={pupilVariants} animate={controls} />
                    <motion.circle cx="42.5" cy="31" r="1.5" fill="white" fillOpacity="0.8" variants={pupilVariants} animate={controls} />
                 </g>
              </g>

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
