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
      y: ["0%", "5%", "0%"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const focusedVariants = {
    animate: {
      scale: [1, 1.02, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    }
  }

  const celebratingVariants = {
    animate: {
      y: ["0%", "-15%", "0%", "-15%", "0%"],
      rotate: [0, 5, -5, 5, 0],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const eyesVariants = {
    idle: { scaleY: 1, y: 0 },
    focused: { scaleY: 0.8, y: '2px' },
    celebrating: { scaleY: 1, y: 0 },
  }

  const mouthVariants = {
    idle: { d: "M 10 18 Q 15 20 20 18" }, // Neutral
    focused: { d: "M 10 18 L 20 18" },    // Focused
    celebrating: { d: "M 10 15 Q 15 25 20 15" }, // Happy
  }

  const armVariants = {
    idle: { rotate: 0, y: 0 },
    focused: { rotate: -10, y: -2 },
    celebrating: { 
        rotate: [0, -30, 30, 0],
        y: [0, -5, -5, 0],
        transition: { duration: 1, repeat: Infinity }
    },
  }


  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="relative w-32 h-32"
        variants={mascotState === 'idle' ? idleVariants : mascotState === 'focused' ? focusedVariants : celebratingVariants}
        animate="animate"
      >
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-primary/20"></div>
        {/* Arms */}
        <motion.div 
            className="absolute bottom-6 left-[-10px] w-6 h-6 rounded-full bg-primary/30"
            variants={armVariants}
            animate={mascotState}
        ></motion.div>
        <motion.div 
            className="absolute bottom-6 right-[-10px] w-6 h-6 rounded-full bg-primary/30"
            variants={armVariants}
            animate={mascotState}
            style={{ transformOrigin: 'center' }}
        ></motion.div>

        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-card border-4 border-primary/20"></div>

        {/* Eyes */}
        <motion.div
          className="absolute top-9 left-1/2 -translate-x-1/2 flex gap-4"
          variants={eyesVariants}
          animate={mascotState}
        >
          <div className="w-5 h-5 rounded-full bg-primary"></div>
          <div className="w-5 h-5 rounded-full bg-primary"></div>
        </motion.div>

        {/* Mouth */}
        <motion.svg viewBox="0 0 30 30" className="absolute top-[60px] left-1/2 -translate-x-1/2 w-8 h-8">
            <motion.path 
                variants={mouthVariants}
                animate={mascotState}
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none" 
                strokeLinecap="round"
             />
        </motion.svg>
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
            "All tasks complete!"
          }
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
