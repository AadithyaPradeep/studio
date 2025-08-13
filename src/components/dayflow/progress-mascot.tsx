"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface ProgressMascotProps {
  progress: number; // 0-100
}

export default function ProgressMascot({ progress }: ProgressMascotProps) {

  const mascotState = useMemo(() => {
    if (progress < 1) return "idle";
    if (progress < 100) return "focused";
    return "celebrating";
  }, [progress]);

  const idleVariants = {
    animate: {
      y: ["0%", "3%", "0%"],
      scale: [1, 1.02, 1],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const focusedVariants = {
    animate: {
      y: ["0%", "-2%", "0%"],
      scale: [1, 1.01, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    }
  }

  const celebratingVariants = {
    animate: {
      y: ["0%", "-10%", "0%", "-10%", "0%"],
      rotate: [0, 3, -3, 3, 0],
      scale: [1, 1.05, 1, 1.05, 1],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const eyesVariants = {
    idle: { scaleY: 1 },
    focused: { scaleY: 0.9 },
    celebrating: { scaleY: 1.05 },
  }

  const mouthVariants = {
    idle: { d: "M 12 20 Q 15 22 18 20" }, // Neutral
    focused: { d: "M 12 20 L 18 20" },    // Focused line
    celebrating: { d: "M 10 18 Q 15 28 20 18" }, // Big smile
  }

  const armVariants = (side: 'left' | 'right') => ({
    idle: { rotate: side === 'left' ? 10 : -10, y: 0, x: 0 },
    focused: { rotate: side === 'left' ? -5 : 5, y: -2, x: side === 'left' ? 2 : -2 },
    celebrating: { 
        rotate: side === 'left' ? [0, -45, 10, 0] : [0, 45, -10, 0],
        y: [0, -10, -5, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    },
  })

  const shadowVariants = {
      initial: { opacity: 0.5, scaleX: 1 },
      animate: {
          scaleX: [1, 0.95, 1],
          opacity: [0.5, 0.3, 0.5],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative w-36 h-36"
        variants={mascotState === 'idle' ? idleVariants : mascotState === 'focused' ? focusedVariants : celebratingVariants}
        animate="animate"
      >
        {/* Main Body */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div 
                className="w-28 h-24 rounded-[50%_50%_45%_55%/60%_70%_30%_40%] bg-primary/80 shadow-lg"
                style={{ filter: 'blur(1px)'}}
            />
        </div>

        {/* Core */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-20 rounded-[50%_50%_40%_60%/50%_60%_40%_50%] bg-primary shadow-inner" />
        </div>

        {/* Arms */}
        <motion.div 
            className="absolute bottom-6 left-0 w-8 h-6 bg-primary/70 rounded-[60%_40%_70%_30%/50%_50%_50%_50%]"
            variants={armVariants('left')}
            animate={mascotState}
            style={{ transformOrigin: 'bottom right' }}
        />
        <motion.div 
            className="absolute bottom-6 right-0 w-8 h-6 bg-primary/70 rounded-[40%_60%_30%_70%/50%_50%_50%_50%]"
            variants={armVariants('right')}
            animate={mascotState}
            style={{ transformOrigin: 'bottom left' }}
        />

        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center -translate-y-1">
            {/* Eyes */}
            <motion.div
              className="flex gap-5"
              variants={eyesVariants}
              animate={mascotState}
            >
              <div className="w-5 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
              </div>
              <div className="w-5 h-6 rounded-full bg-white flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-foreground" />
              </div>
            </motion.div>

            {/* Mouth */}
            <motion.svg viewBox="0 0 30 30" className="w-8 h-8 -mt-1">
                <motion.path 
                    variants={mouthVariants}
                    animate={mascotState}
                    stroke="hsl(var(--primary-foreground))"
                    strokeWidth="1.5"
                    fill="none" 
                    strokeLinecap="round"
                 />
            </motion.svg>
        </div>
        
        {/* Shadow */}
        <motion.div 
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-4 w-24 bg-black/10 rounded-[50%]"
            style={{ filter: 'blur(5px)'}}
            variants={shadowVariants}
            initial="initial"
            animate="animate"
        />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p 
            key={mascotState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full"
        >
          {
            mascotState === 'idle' ? "Ready for a new day!" :
            mascotState === 'focused' ? "Keep up the great work!" :
            "All tasks complete! Great job!"
          }
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
