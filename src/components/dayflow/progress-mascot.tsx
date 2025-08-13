
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
    idle: { scale: 1, y: 0 },
    focused: { scale: 1.05, y: -5 },
    celebrating: { scale: 1.1, y: [0, -15, 0], transition: { y: { repeat: Infinity, duration: 1, ease: "easeInOut" } } },
    wink: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const mouthVariants = {
    idle: { d: "M 18 32 Q 24 34 30 32" }, // Gentle smile
    focused: { d: "M 18 32 L 30 32" }, // Flat line
    celebrating: { d: "M 16 30 Q 24 40 32 30" }, // Big grin
    wink: { d: "M 18 32 Q 24 36 30 32" },
  };
  
  const eyeVariants = {
    idle: { scaleY: 1 },
    wink: { scaleY: [1, 0.1, 1], transition: { duration: 0.5, times: [0, 0.5, 1] } },
  }

  const pupilVariants = {
    idle: {
      x: [0, 2, -2, 0],
      y: [0, -1, 1, 0],
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
          <div className="relative w-28 h-28">
            <motion.div 
                className="absolute inset-0 rounded-full bg-secondary shadow-inner"
                animate={{
                    boxShadow: mascotState === 'celebrating' 
                        ? ["inset 0 0 10px #fff, 0 0 20px hsl(var(--primary))", "inset 0 0 5px #fff, 0 0 10px hsl(var(--primary))", "inset 0 0 10px #fff, 0 0 20px hsl(var(--primary))"]
                        : ["inset 0 0 5px rgba(0,0,0,0.1)", "inset 0 0 10px rgba(0,0,0,0.1)", "inset 0 0 5px rgba(0,0,0,0.1)"],
                    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            
            {/* Eyes and Mouth */}
            <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                 <motion.g animate={controls}>
                    {/* Left Eye */}
                    <motion.g variants={eyeVariants}>
                      <circle cx="16" cy="22" r="5" fill="white" />
                      <motion.circle 
                          variants={pupilVariants}
                          cx="16" cy="22" r="2.5" fill="hsl(var(--foreground))"
                      />
                    </motion.g>

                    {/* Right Eye */}
                    <motion.g variants={eyeVariants}>
                      <circle cx="32" cy="22" r="5" fill="white" />
                      <motion.circle 
                          variants={pupilVariants}
                          cx="32" cy="22" r="2.5" fill="hsl(var(--foreground))"
                      />
                    </motion.g>
                 </motion.g>
                 
                 <motion.path
                    d="M 18 32 Q 24 34 30 32"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
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
