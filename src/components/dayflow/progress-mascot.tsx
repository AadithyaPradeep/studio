
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
    controls.start("initial").then(() => controls.start(mascotState));
  }, [mascotState, controls]);
  
  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    idle: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.8, ease: "backOut" }
    },
    focused: { 
        opacity: 1, 
        scale: 1.05,
        transition: { duration: 0.5, ease: "easeOut" } 
    },
    celebrating: { 
        opacity: 1, 
        scale: 1.1,
        transition: { duration: 0.5, ease: "backOut" } 
    },
  };

  const eyeVariants = {
    initial: { 
        pathLength: 0, 
        opacity: 0 
    },
    idle: {
      d: "M 8,12 C 10,14 14,14 16,12",
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: {duration: 0.5, delay: 0.3}, opacity: {duration: 0.1, delay: 0.3}}
    },
    focused: {
      d: "M 8,13 C 10,13 14,13 16,13",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    celebrating: {
      d: "M 8,10 C 10,14 14,14 16,10",
      transition: { duration: 0.4, ease: "backOut" },
    },
  };
  
  const particleVariants = {
    initial: {
        scale: 0,
        opacity: 0
    },
    idle: (i:number) => ({
        scale: 1,
        opacity: 1,
        rotate: 360,
        transition: {
            delay: 0.5 + i * 0.1,
            duration: 2 + i * 0.5,
            ease: "linear",
            repeat: Infinity,
            repeatType: 'loop',
        }
    }),
    focused: (i:number) => ({
        scale: [1, 1.2, 1],
        opacity: 1,
        rotate: 720,
        transition: {
            delay: i * 0.05,
            duration: 1 + i * 0.2,
            ease: "linear",
            repeat: Infinity,
            repeatType: 'loop',
        }
    }),
    celebrating: {
        scale: [1, 2, 0],
        opacity: [1, 1, 0],
        transition: {
            duration: 0.8,
            ease: "circOut",
        }
    }
  }

  const particles = [
      { cx: 50, cy: 15, size: 6 },
      { cx: 80, cy: 40, size: 8 },
      { cx: 30, cy: 75, size: 7 },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-48 h-48 relative"
        variants={containerVariants}
        initial="initial"
        animate={controls}
      >
        <div className="w-full h-full" style={{ perspective: "1000px" }}>
            <motion.div 
              className="w-full h-full rounded-full bg-primary/20 relative flex justify-center items-center shadow-inner"
            >
              <div className="flex gap-4">
                {/* Left Eye */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <motion.path 
                        variants={eyeVariants}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </svg>
                {/* Right Eye */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <motion.path 
                        variants={eyeVariants}
                        stroke="hsl(var(--primary))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                </svg>
              </div>

            </motion.div>
             {/* Particles */}
             <div className="absolute inset-0">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-primary"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.cx}%`,
                            top: `${p.cy}%`,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        custom={i}
                        variants={particleVariants}
                    />
                ))}
             </div>
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
