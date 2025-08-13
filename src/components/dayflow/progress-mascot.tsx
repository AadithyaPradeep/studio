
"use client";

import { motion, useAnimation } from "framer-motion";
import { useMemo, useEffect } from "react";

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
  
  const handleInteraction = async () => {
    await controls.start("wink");
    controls.start(mascotState);
  };
  
  const containerVariants = {
    idle: { y: 0, transition: { duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } },
    focused: { y: [0, -5, 0], transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity } },
    celebrating: { 
      y: [0, -20, 0, -20, 0], 
      transition: { duration: 1.5, ease: "easeInOut" } 
    },
    wink: {
      scale: [1, 0.95, 1],
      transition: { duration: 0.5 }
    }
  };

  const eyeVariants = {
    idle: { d: "M 20 32 C 22 28, 26 28, 28 32 M 36 32 C 38 28, 42 28, 44 32", transition: { duration: 0.3 } },
    focused: { d: "M 18 30 C 22 34, 26 34, 30 30 M 34 30 C 38 34, 42 34, 46 30", transition: { duration: 0.3 } },
    celebrating: { d: "M 18 32 C 22 26, 26 26, 30 32 M 34 32 C 38 26, 42 26, 46 32", transition: { duration: 0.3 } },
    wink: { 
      d: "M 18 32 C 22 28, 26 28, 28 32 M 36 31 C 40 31, 40 31, 44 31",
      transition: { duration: 0.1, delay: 0.1 } 
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-48 h-48 relative cursor-pointer"
        onClick={handleInteraction}
        variants={containerVariants}
        animate={controls}
        initial="idle"
      >
        <div className="w-full h-full">
            <svg viewBox="0 0 64 64" width="192" height="192" fill="none">
              {/* Body */}
              <path d="M32 48C38.6274 48 44 53.3726 44 60H20C20 53.3726 25.3726 48 32 48Z" fill="#A3A9F4"/>
              
              {/* Head */}
              <path d="M12 36C12 24.9543 20.9543 16 32 16C43.0457 16 52 24.9543 52 36V48H12V36Z" fill="#3D457F"/>
              
              {/* Ears */}
              <path d="M12 36C12 31.5817 15.5817 28 20 28L14 18L12 36Z" fill="#3D457F"/>
              <path d="M52 36C52 31.5817 48.4183 28 44 28L50 18L52 36Z" fill="#3D457F"/>
              <path d="M16 28.5C16 25.4624 18.4624 23 21.5 23L15 15L16 28.5Z" fill="#A3A9F4"/>
              <path d="M48 28.5C48 25.4624 45.5376 23 42.5 23L49 15L48 28.5Z" fill="#A3A9F4"/>
              
              {/* Face Screen */}
              <path d="M16 46V36C16 27.1634 23.1634 20 32 20C40.8366 20 48 27.1634 48 36V46H16Z" fill="#1C1C3A"/>
              
              {/* Eyes */}
              <motion.path
                  stroke="#80F6E8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={eyeVariants}
                  animate={controls}
              />
            </svg>
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
