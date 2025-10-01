import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AnimationPageWrapper = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}   // start hidden + slightly down
      animate={{ opacity: 1, y: 0 }}    // fade in + slide up
      exit={{ opacity: 0, y: -10 }}     // fade out if route changes
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default AnimationPageWrapper;
