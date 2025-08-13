
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
    idle: { y: ["-2%", "2%"], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    focused: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    celebrating: { 
        y: ["0%", "-15%", "0%"],
        rotate: [0, 3, -3, 0],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
  };
  
  const armVariants = {
    idle: {
        left: { rotate: [-8, 8, -8], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
        right: { rotate: [8, -8, 8], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } },
    },
    focused: {
        left: { rotate: 25, y: -5, x: -5, transition: { duration: 0.5, ease: "easeOut" } },
        right: { rotate: -25, y: -5, x: 5, transition: { duration: 0.5, ease: "easeOut" } },
    },
    celebrating: {
        left: { rotate: [0, -150, 0], y: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
        right: { rotate: [0, 150, 0], y: [0, -10, 0], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
    }
  }

  const eyeVariants = {
    idle: { scaleY: [1, 0.1, 1], transition: { duration: 4, repeat: Infinity, delay: 1 } },
    focused: { scaleY: 0.8, transition: { duration: 0.2 } },
    celebrating: { 
        d: "M 4 8 C 4 2, 10 2, 10 8 C 10 2, 4 2, 4 8 Z",
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
  }

  const mouthVariants = {
    idle: { d: "M 6 12 Q 12 14 18 12 L 17 15 Q 12 17 7 15 Z" },
    focused: { d: "M 8 13 L 16 13 L 16 14 L 8 14 Z", transition: { duration: 0.3 } },
    celebrating: { 
        d: "M 5 10 Q 12 20 19 10 L 17 13 Q 12 23 7 13 Z",
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
  };

  const antennaVariants = {
    idle: {
      left: { rotate: [-5, 5, -5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }},
      right: { rotate: [5, -5, 5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }}
    },
    focused: { left: { rotate: 0 }, right: { rotate: 0 } },
    celebrating: {
      left: { rotate: [-15, 15, -15], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }},
      right: { rotate: [15, -15, 15], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }}
    }
  }

  const shadowVariants = {
    base: {
        scaleX: [1, 0.95],
        opacity: [0.1, 0.08],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
        scaleX: [1, 0.8],
        opacity: [0.1, 0.15],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-48 h-48 relative">
        <motion.div
            className="w-full h-full"
            variants={mascotVariants}
            animate={mascotState}
        >
            {/* Main Body */}
            <motion.div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-28 h-24 bg-gray-300 rounded-t-[30px] rounded-b-[50px] shadow-inner">
                 <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-cyan-300 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-cyan-400"/>
                 </div>
            </motion.div>

             {/* Arms */}
             <motion.div
                className="absolute top-[85px] left-[18px] w-8 h-16 bg-gray-400/80 rounded-full origin-top-center z-[-1]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
                variants={armVariants}
                animate={mascotState === 'idle' ? 'idle.left' : mascotState === 'focused' ? 'focused.left' : 'celebrating.left'}
            />
            <motion.div 
                className="absolute top-[85px] right-[18px] w-8 h-16 bg-gray-400/80 rounded-full origin-top-center z-[-1]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}
                variants={armVariants}
                animate={mascotState === 'idle' ? 'idle.right' : mascotState === 'focused' ? 'focused.right' : 'celebrating.right'}
            />

            {/* Head */}
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-28 z-10">
                {/* Antennas */}
                <motion.div className="absolute top-[-8px] left-[20px] h-8 w-2 bg-gray-400 rounded-t-full origin-bottom" variants={antennaVariants} animate={mascotState === 'idle' ? 'idle.left' : mascotState === 'focused' ? 'focused.left' : 'celebrating.left'} >
                    <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full" />
                </motion.div>
                <motion.div className="absolute top-[-8px] right-[20px] h-8 w-2 bg-gray-400 rounded-t-full origin-bottom" variants={antennaVariants} animate={mascotState === 'idle' ? 'idle.right' : mascotState === 'focused' ? 'focused.right' : 'celebrating.right'} >
                     <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full" />
                </motion.div>

                {/* Head Shape */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gray-300 rounded-t-[20px]">
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-gray-400 rounded-b-md" />
                </div>
                 {/* Top head piece */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-400 rounded-t-md" />
                
                {/* Ear pieces */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-10 h-16 bg-gray-400 rounded-lg" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-10 h-16 bg-gray-400 rounded-lg" />

                {/* Face */}
                 <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div className="flex gap-5">
                       <svg viewBox="0 0 14 10" className="w-7 h-5 overflow-visible">
                            <motion.path
                                d="M 2 8 C 2 3, 12 3, 12 8 Z"
                                fill="#67E8F9"
                                variants={eyeVariants}
                                animate={mascotState}
                            />
                        </svg>
                        <svg viewBox="0 0 14 10" className="w-7 h-5 overflow-visible">
                            <motion.path
                                d="M 2 8 C 2 3, 12 3, 12 8 Z"
                                fill="#67E8F9"
                                variants={eyeVariants}
                                animate={mascotState}
                            />
                        </svg>
                    </div>
                     <svg viewBox="0 0 24 24" className="w-12 h-12 mt-1">
                      <motion.path
                        variants={mouthVariants}
                        animate={mascotState}
                        fill="#67E8F9"
                      />
                    </svg>
                 </div>

            </motion.div>

        </motion.div>
        {/* Shadow */}
         <motion.div
          className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-4 w-32 bg-black/10 rounded-[50%]"
          style={{ filter: "blur(5px)" }}
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

    