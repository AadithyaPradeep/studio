
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
    idle: { y: ["-5%", "5%", "-5%"], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    focused: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    celebrating: { 
        y: ["0%", "-20%", "0%", "-20%", "0%"],
        rotate: [0, 2, -2, 2, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    },
  };
  
  const armVariants = {
    idle: {
        left: { rotate: [-5, 5, -5], y: [0, -2, 0] },
        right: { rotate: [5, -5, 5], y: [0, -2, 0] },
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
    },
    focused: {
        left: { rotate: 20, x: -5, y: -10 },
        right: { rotate: -20, x: 5, y: -10 },
        transition: { duration: 0.5, ease: "easeOut" },
    },
    celebrating: {
        left: { rotate: [20, -140, 20], y: [0, -15, 0] },
        right: { rotate: [-20, 140, -20], y: [0, -15, 0] },
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    }
  }

  const eyeVariants = {
    idle: { scaleY: [1, 0.1, 1], transition: { duration: 4, repeat: Infinity } },
    focused: { scaleY: 1, transition: { duration: 0.2 } },
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
        scaleX: [1, 0.9, 1],
        opacity: [0.1, 0.05, 0.1],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
        scaleX: [1, 0.85, 1, 0.85, 1],
        opacity: [0.1, 0.2, 0.1, 0.2, 0.1],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    }
  };


  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-40 h-48 relative">
        <motion.div
            className="w-full h-full"
            variants={mascotVariants}
            animate={mascotState}
        >
            {/* Head */}
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-200 rounded-lg shadow-inner z-10">
                <div className="absolute inset-x-0 top-3 flex justify-center gap-6">
                   <motion.div className="w-5 h-7 rounded-full bg-white flex items-center justify-center shadow-inner" variants={eyeVariants} animate={mascotState}>
                        <div className="w-2.5 h-3.5 rounded-full bg-foreground"/>
                    </motion.div>
                     <motion.div className="w-5 h-7 rounded-full bg-white flex items-center justify-center shadow-inner" variants={eyeVariants} animate={mascotState}>
                        <div className="w-2.5 h-3.5 rounded-full bg-foreground"/>
                    </motion.div>
                </div>
                 <svg viewBox="0 0 30 30" className="w-8 h-8 absolute left-1/2 -translate-x-1/2 bottom-2">
                  <motion.path
                    variants={mouthVariants}
                    animate={mascotState}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
            </motion.div>
            
            {/* Body */}
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-32 h-24 bg-gray-300 rounded-xl shadow-md">
                 <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/40"/>
                 </div>
            </div>

            {/* Arms */}
            <motion.div 
                className="absolute top-[85px] left-[2px] w-6 h-16 bg-gray-400 rounded-full origin-top-center"
                variants={armVariants}
                animate={mascotState === 'idle' ? 'idle.left' : mascotState === 'focused' ? 'focused.left' : 'celebrating.left'}
                transition={armVariants.transition}
            />
            <motion.div 
                className="absolute top-[85px] right-[2px] w-6 h-16 bg-gray-400 rounded-full origin-top-center"
                variants={armVariants}
                animate={mascotState === 'idle' ? 'idle.right' : mascotState === 'focused' ? 'focused.right' : 'celebrating.right'}
                transition={armVariants.transition}
            />
        </motion.div>
        {/* Shadow */}
         <motion.div
          className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 h-5 w-32 bg-black/10 rounded-[50%]"
          style={{ filter: "blur(6px)" }}
          variants={shadowVariants}
          animate={mascotState === 'celebrating' ? 'celebrating' : 'base'}
        />
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
