
"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
    controls.start(mascotState);
  }, [mascotState, controls]);
  
  const handleInteraction = () => {
    controls.start("wink");
    setTimeout(() => {
      controls.start(mascotState);
    }, 1000);
  };

  const faceVariants = {
    idle: { y: 0, scale: 1 },
    focused: { y: -5, scale: 1.05 },
    celebrating: { 
      y: [0, -20, 0], 
      scale: 1.1,
      transition: { y: { repeat: Infinity, duration: 1, ease: "easeInOut" } } 
    },
    wink: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const mouthVariants = {
    idle: { d: "M 20 38 Q 24 42 28 38", },
    focused: { d: "M 20 38 L 28 38" },
    celebrating: { d: "M 18 36 C 20 44, 28 44, 30 36 Z" },
    wink: { d: "M 20 38 Q 24 42 28 38", },
  };
  
  const eyeVariants = {
    idle: { scaleY: 1, y: 0 },
    focused: { scaleY: 0.6, y: 2},
    celebrating: { scaleY: 1, y: 0 },
    wink: { scaleY: [1, 0.1, 1], transition: { duration: 0.5, times: [0, 0.5, 1] } },
  }

  const pupilVariants = {
    idle: {
      x: [0, 2, -2, 0, 0],
      y: [0, -1, 1, 0, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
    },
    focused: { x: 0, y: 0 },
    celebrating: { x: 0, y: 0 },
    wink: { x: 0, y: 0 },
  };
  
  const particleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: [0, 1.2, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 2
      }
    }),
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
          {/* Main Face */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-full bg-secondary shadow-inner" />
            
            {/* Celebration Glow */}
             <AnimatePresence>
              {mascotState === 'celebrating' && (
                 <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 30px 5px hsl(var(--primary) / 0.7)"
                    }}
                 />
              )}
            </AnimatePresence>
            
            {/* Eyes and Mouth */}
            <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                {/* Cheeks */}
                <circle cx="14" cy="32" r="4" fill="hsl(var(--primary) / 0.2)" />
                <circle cx="34" cy="32" r="4" fill="hsl(var(--primary) / 0.2)" />

                 <motion.g animate={controls}>
                    {/* Left Eye */}
                    <motion.g variants={eyeVariants} initial="idle">
                      <circle cx="18" cy="24" r="5" fill="white" />
                      <motion.circle 
                          variants={pupilVariants}
                          cx="18" cy="24" r="2.5" fill="hsl(var(--foreground))"
                      />
                    </motion.g>

                    {/* Right Eye */}
                    <motion.g variants={eyeVariants} initial="idle">
                      <circle cx="30" cy="24" r="5" fill="white" />
                      <motion.circle 
                          variants={pupilVariants}
                          cx="30" cy="24" r="2.5" fill="hsl(var(--foreground))"
                      />
                    </motion.g>
                 </motion.g>
                 
                 <motion.path
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    fill="hsl(var(--foreground))"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={mouthVariants}
                    initial="idle"
                    animate={controls}
                 />
            </svg>
          </div>
          
           {/* Celebration Sparkles */}
          <AnimatePresence>
              {mascotState === 'celebrating' && (
                  [...Array(6)].map((_, i) => (
                      <motion.div
                          key={i}
                          custom={i}
                          variants={particleVariants}
                          initial="hidden"
                          animate="visible"
                          className="absolute w-3 h-3 bg-primary/80 rounded-full"
                          style={{
                              top: `${50 + 45 * Math.sin(i * 60 * Math.PI / 180)}%`,
                              left: `${50 + 45 * Math.cos(i * 60 * Math.PI / 180)}%`,
                          }}
                      />
                  ))
              )}
          </AnimatePresence>
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
