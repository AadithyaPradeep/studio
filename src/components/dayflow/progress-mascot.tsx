
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
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    focused: {
      y: ["0%", "-1%", "0%"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
      y: ["0%", "-8%", "0%", "-8%", "0%"],
      rotate: [0, 2, -2, 2, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const eyesVariants = {
    idle: { scaleY: 1 },
    focused: { scaleY: 0.85, y: 1 },
    celebrating: { scaleY: 1, y: -1 },
  };

  const mouthVariants = {
    idle: { d: "M 12 18 Q 15 19 18 18" }, // Neutral smile
    focused: { d: "M 13 18 L 17 18" },    // Focused line
    celebrating: { d: "M 10 16 Q 15 24 20 16" }, // Big smile
  };

  const tailVariants = {
    idle: { 
        rotate: [5, -5, 5],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    focused: { 
        rotate: [3, -3, 3],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    celebrating: { 
        rotate: [10, -10, 10],
        transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
    },
  };

  const shadowVariants = {
      animate: {
          scaleX: [1, 0.98, 1],
          opacity: [0.3, 0.2, 0.3],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative w-40 h-40"
        variants={mascotVariants}
        animate={mascotState}
      >
        {/* Tail */}
        <motion.div
          className="absolute bottom-2 -right-4 w-16 h-20"
          style={{ transformOrigin: 'bottom center' }}
          variants={tailVariants}
          animate={mascotState}
        >
          <div className="absolute inset-0 bg-orange-500 rounded-t-[50%] rounded-b-[40%] transform -rotate-12"></div>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-b-[40%]"></div>
        </motion.div>
        
        {/* Body */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-28 h-24 bg-orange-400 rounded-t-[50%] rounded-b-[30%] shadow-lg"></div>

        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-28">
          {/* Ears */}
          <div className="absolute top-0 left-0 w-8 h-12 bg-orange-500 rounded-tl-[50%] rounded-tr-[20%] transform -rotate-30"></div>
          <div className="absolute top-0 right-0 w-8 h-12 bg-orange-500 rounded-tr-[50%] rounded-tl-[20%] transform rotate-30"></div>
          <div className="absolute top-2 left-2 w-6 h-10 bg-zinc-800 rounded-tl-[50%] rounded-tr-[20%] transform -rotate-30"></div>
          <div className="absolute top-2 right-2 w-6 h-10 bg-zinc-800 rounded-tr-[50%] rounded-tl-[20%] transform rotate-30"></div>

          {/* Face */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-orange-400 rounded-[50%]"></div>
          <div className="absolute inset-x-4 -bottom-1 h-20 bg-white rounded-[50%]"></div>
          
          {/* Face Features */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <motion.div
              className="flex gap-5"
              variants={eyesVariants}
              animate={mascotState}
            >
              <div className="w-5 h-6 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner"></div>
              <div className="w-5 h-6 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner"></div>
            </motion.div>

            <motion.svg viewBox="0 0 30 30" className="w-8 h-8 -mt-1">
                <motion.path 
                    variants={mouthVariants}
                    animate={mascotState}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    fill="none" 
                    strokeLinecap="round"
                 />
            </motion.svg>
          </div>
        </div>

        {/* Shadow */}
        <motion.div 
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-4 w-32 bg-black/10 rounded-[50%]"
            style={{ filter: 'blur(5px)'}}
            variants={shadowVariants}
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
