
"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  loop?: boolean;
  loopDelay?: number;
}

function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
  loop = false,
  loopDelay = 3000,
}: WordPullUpProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        setKey(prev => prev + 1);
      }, loopDelay);
      
      return () => clearInterval(interval);
    }
  }, [loop, loopDelay]);

  return (
    <motion.h1
      key={key}
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className,
      )}
    >
      {words.split(" ").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export { WordPullUp };
