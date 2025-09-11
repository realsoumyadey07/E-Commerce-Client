import { motion } from "framer-motion";

export default function ReactLoadingComp() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <motion.h1
        className="text-3xl font-bold text-red-600"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: .9, // slow appear/disappear cycle
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Bijoy Jewellers
      </motion.h1>
    </div>
  );
}


