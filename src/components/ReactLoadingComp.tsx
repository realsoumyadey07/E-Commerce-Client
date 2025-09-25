import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ReactLoadingComp() {
  const text = "Bijoy Jewellers";
  const [displayText, setDisplayText] = useState(text); // start full text
  const [index, setIndex] = useState(text.length); // start from end
  const [deleting, setDeleting] = useState(true); // start by deleting

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (deleting && index > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, 100);
    } else if (!deleting && index < text.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 150);
    } else if (index === 0 && deleting) {
      // Switch to typing
      timeout = setTimeout(() => setDeleting(false), 600);
    } else if (index === text.length && !deleting) {
      // Switch to deleting
      timeout = setTimeout(() => setDeleting(true), 1200);
    }

    return () => clearTimeout(timeout);
  }, [index, deleting, text]);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <h1 className="text-3xl font-bold text-red-600 font-mono">
        {displayText}
        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-[2px] h-6 bg-red-600 ml-1 align-middle"
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        />
      </h1>
    </div>
  );
}
