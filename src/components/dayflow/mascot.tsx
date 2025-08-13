
"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function Mascot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="relative flex items-end gap-4 rounded-xl bg-secondary p-4"
    >
      <div className="relative h-16 w-16 flex-shrink-0">
        {/* Body */}
        <div className="absolute bottom-0 left-1/2 h-14 w-14 -translate-x-1/2 rounded-md bg-primary/20"></div>
        {/* Head */}
        <div className="absolute bottom-12 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-card border-2 border-primary/30"></div>
        {/* Eyes */}
        <div className="absolute bottom-[56px] left-1/2 -translate-x-1/2 flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary"></div>
            <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
         {/* Antenna */}
         <div className="absolute bottom-[80px] left-1/2 h-3 w-0.5 -translate-x-1/2 bg-primary/50"></div>
         <div className="absolute bottom-[90px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"></div>
      </div>
      <div className="relative rounded-lg bg-card px-4 py-2 text-sm shadow-sm">
        <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-card"></div>
        <p className="relative">
          Welcome! Ready to tackle your tasks? Let's make today productive.
        </p>
      </div>
    </motion.div>
  );
}
