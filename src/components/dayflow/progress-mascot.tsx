
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
      y: ["0%", "1.5%", "0%"],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
    focused: {
      y: ["0%", "-1%", "0%"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
      y: ["0%", "-15%", "0%", "-15%", "0%"],
      rotate: [0, 1, -1, 1, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const earVariants = {
    idle: { rotate: [0, -2, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } },
    focused: { rotate: 5, transition: { duration: 0.5, ease: "easeOut" } },
    celebrating: { rotate: [-5, 5, -5], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } },
  };

  const eyesVariants = {
    idle: { scaleY: 1 },
    focused: { scaleY: 0.8, y: 1 },
    celebrating: { scaleY: 1, y: -2 },
  };

  const mouthVariants = {
    idle: { d: "M 12 18 Q 15 19 18 18" },
    focused: { d: "M 13 18 L 17 18" },
    celebrating: { d: "M 10 16 Q 15 24 20 16" },
  };

  const tailVariants = {
    idle: {
      rotate: [8, -8, 8],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
    focused: {
      rotate: [4, -4, 4],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
    },
    celebrating: {
      rotate: [15, -15, 15],
      transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const shadowVariants = {
    animate: {
      scaleX: [1, 0.97, 1],
      opacity: [0.3, 0.2, 0.3],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="relative w-48 h-48"
        variants={mascotVariants}
        animate={mascotState}
      >
        {/* Tail */}
        <motion.div
          className="absolute bottom-6 -right-5 w-20 h-24"
          style={{ transformOrigin: "bottom center" }}
          variants={tailVariants}
          animate={mascotState}
        >
          <div className="absolute inset-0 bg-orange-500 rounded-t-[50%] rounded-b-[40%] transform -rotate-12 shadow-inner"></div>
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-b-[40%]"></div>
        </motion.div>
        
        {/* Body */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-28 bg-orange-400 rounded-t-[50%] rounded-b-[30%] shadow-lg"></div>

        {/* Paws */}
        <div className="absolute bottom-8 left-1/2 -translate-x-[80%] w-8 h-6 bg-orange-500 rounded-t-full z-10"></div>
        <div className="absolute bottom-8 left-1/2 -translate-x-[20%] w-8 h-6 bg-orange-500 rounded-t-full z-10"></div>
        
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32">
          {/* Ears */}
          <motion.div
            className="absolute top-0 left-2 w-10 h-14 transform -rotate-30"
            style={{ transformOrigin: 'bottom center' }}
            variants={earVariants}
            animate={mascotState}
          >
            <div className="absolute inset-0 bg-orange-500 rounded-tl-[50%] rounded-tr-[20%]"></div>
            <div className="absolute top-2 left-2 w-8 h-10 bg-zinc-800 rounded-tl-[50%] rounded-tr-[20%]"></div>
          </motion.div>
          <motion.div
            className="absolute top-0 right-2 w-10 h-14 transform rotate-30"
            style={{ transformOrigin: 'bottom center' }}
            variants={earVariants}
            animate={mascotState}
          >
            <div className="absolute inset-0 bg-orange-500 rounded-tr-[50%] rounded-tl-[20%]"></div>
            <div className="absolute top-2 right-2 w-8 h-10 bg-zinc-800 rounded-tr-[50%] rounded-tl-[20%]"></div>
          </motion.div>

          {/* Face */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-orange-400 rounded-[50%]"></div>
          <div className="absolute inset-x-4 -bottom-1 h-24 bg-white rounded-[50%] shadow-inner"></div>
          
          {/* Muzzle */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-20 h-10 bg-white rounded-t-lg rounded-b-xl"></div>
          
          {/* Face Features */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <motion.div
              className="flex gap-6"
              variants={eyesVariants}
              animate={mascotState}
            >
              <div className="w-5 h-6 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner"></div>
              <div className="w-5 h-6 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner"></div>
            </motion.div>

            <svg viewBox="0 0 30 30" className="w-8 h-8 -mt-1">
              {/* Nose */}
              <path d="M 15 16 C 14 15, 16 15, 15 16 L 14 17 L 16 17 Z" fill="hsl(var(--foreground))" />
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
        </div>

        {/* Shadow */}
        <motion.div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-5 w-36 bg-black/10 rounded-[50%]"
          style={{ filter: "blur(5px)" }}
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
