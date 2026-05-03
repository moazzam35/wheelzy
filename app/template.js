"use client";
import { motion } from "framer-motion";
import { pageTransition } from "@/app/lib/animations";

export default function Template({ children }) {
  // WHY: Template re-renders on route changes, allowing AnimatePresence to trigger exit animations.
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
    >
      {children}
    </motion.div>
  );
}
