"use client" 

import * as React from "react"

import { motion } from "framer-motion";
 
export function ShiningText({text, className = ""}: {text: string, className?: string}) {
  return (
    <motion.h1
      key="shining-text-16s"
      className={`bg-[linear-gradient(110deg,#404040,35%,#fff,50%,#404040,75%,#404040)] bg-[length:200%_100%] bg-clip-text font-bold text-transparent ${className}`}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 12,
        ease: "linear",
        repeatDelay: 0,
      }}
      style={{ willChange: 'background-position' }}
    >
      {text}
    </motion.h1>
  );
}
