"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ProgressMascotProps {
  progress: number; // 0-100
}

export default function ProgressMascot({ progress }: ProgressMascotProps) {
  const mascotState = useMemo(() => {
    if (progress < 1) return "idle";
    if (progress < 100) return "focused";
    return "celebrating";
  }, [progress]);

  const mascotVariants = {
    idle: { scale: 1, transition: { duration: 0.5 } },
    focused: { scale: 1.05, transition: { duration: 0.5 } },
    celebrating: { scale: 1.1, transition: { duration: 0.5 } },
  };

  const eyeVariants = {
    idle: {
      d: "M 8 18 Q 24 18 40 18", // Gentle curve
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
    },
    focused: {
      d: "M 8 16 Q 24 20 40 16", // Focused straight line
      transition: { duration: 0.5, ease: "easeOut" }
    },
    celebrating: {
      d: "M 8 12 Q 24 28 40 12", // Happy U shape
      transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
    },
  };

  const pupilVariants = {
    idle: {
        cx: 24,
        cy: 24,
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    focused: {
        cx: 24,
        cy: 22,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    celebrating: {
        cx: 24,
        cy: 20,
        transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
    }
  }

  const particleVariants = {
    animate: (i: number) => ({
      transform: [
        `rotate(${i * 45}deg) translateX(55px) rotate(-${i * 45}deg)`,
        `rotate(${i * 45 + 360}deg) translateX(55px) rotate(-${i * 45 + 360}deg)`
      ],
      transition: {
        duration: 10 + i * 2,
        ease: "linear",
        repeat: Infinity,
      },
    }),
  };

  const celebrationSparkles = {
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
      <div className="w-48 h-48 relative">
        <motion.div
          className="w-full h-full flex items-center justify-center"
          variants={mascotVariants}
          animate={mascotState}
        >
          {/* Particles */}
          <AnimatePresence>
            {(mascotState === 'focused' || mascotState === 'celebrating') && (
              <motion.div className="absolute w-full h-full">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={particleVariants}
                    animate="animate"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                     <div className={cn(
                         "w-2 h-2 rounded-full",
                         mascotState === "celebrating" ? "bg-primary" : "bg-cyan-400"
                     )}/>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
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
            
            {/* Eye */}
            <svg viewBox="0 0 48 48" className="absolute inset-0 w-full h-full">
                 <motion.circle 
                    cx="24" cy="24" r="14" fill="white"
                 />
                 <motion.circle
                    variants={pupilVariants}
                    animate={mascotState}
                    cx="24" cy="24" r="6" fill="hsl(var(--foreground))"
                 />
                 {/* Eye glare */}
                 <motion.circle
                    cx="28" cy="20" r="2" fill="white" opacity="0.8"
                    animate={{ y: [20, 21, 20], transition: {duration: 3, repeat: Infinity, ease: "easeInOut"}}}
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
                          variants={celebrationSparkles}
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
