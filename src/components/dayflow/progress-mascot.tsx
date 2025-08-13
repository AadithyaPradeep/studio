
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

  const mascotVariants = {
    idle: {
        y: ["0%", "2%", "0%"],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
    focused: {
        y: ["0%", "-1%", "0%"],
        scale: 1.02,
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
      y: ["0%", "-15%", "0%", "-15%", "0%"],
      scale: [1, 1.1, 1, 1.1, 1],
      rotate: [0, 2, -2, 2, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const eyeVariants = {
    idle: { scaleY: 1, y: 0 },
    focused: { scaleY: 0.9, y: 1 },
    celebrating: {
        scaleY: [1, 0.2, 1, 0.2, 1],
        y: -1,
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    },
  }
  
  const mouthVariants = {
    idle: { d: "M 12 19 Q 15 20 18 19" },
    focused: { d: "M 13 19 L 17 19" },
    celebrating: { d: "M 10 17 Q 15 25 20 17" },
  };

  const shadowVariants = {
    base: {
        scaleX: [1, 0.95, 1],
        opacity: [0.1, 0.05, 0.1],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
        scaleX: [1, 0.85, 1, 0.85, 1],
        opacity: [0.1, 0.2, 0.1, 0.2, 0.1],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    }
  };

  const cheekVariants = {
    idle: { opacity: 0 },
    focused: { opacity: 0 },
    celebrating: {
        opacity: [0, 1, 0, 1, 0],
        scale: [1, 1.1, 1, 1.1, 1],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    }
  }


  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative w-40 h-40"
        variants={mascotVariants}
        animate={mascotState}
      >
        {/* Body */}
        <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
                background: 'linear-gradient(145deg, hsl(var(--primary)), hsl(var(--chart-2)))',
                boxShadow: 'inset 0 -10px 20px -5px rgba(0,0,0,0.15), 0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
        />

        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            
            {/* Eyes */}
            <motion.div className="flex gap-8" variants={eyeVariants} animate={mascotState}>
                <div className="w-5 h-7 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <div className="w-2.5 h-3.5 rounded-full bg-foreground"/>
                </div>
                <div className="w-5 h-7 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <div className="w-2.5 h-3.5 rounded-full bg-foreground"/>
                </div>
            </motion.div>
            
            {/* Cheeks */}
            <motion.div
                className="absolute w-full flex justify-center gap-20 top-1/2 mt-2"
                variants={cheekVariants}
                animate={mascotState}
            >
                <div className="w-5 h-3 rounded-full bg-pink-300/80" />
                <div className="w-5 h-3 rounded-full bg-pink-300/80" />
            </motion.div>


            {/* Mouth */}
            <svg viewBox="0 0 30 30" className="w-8 h-8 mt-1">
              <motion.path
                variants={mouthVariants}
                animate={mascotState}
                stroke="hsl(var(--foreground))"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
        </div>
        
        {/* Shadow */}
         <motion.div
          className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 h-5 w-32 bg-black/10 rounded-[50%]"
          style={{ filter: "blur(6px)" }}
          variants={shadowVariants}
          animate={mascotState === 'celebrating' ? 'celebrating' : 'base'}
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
