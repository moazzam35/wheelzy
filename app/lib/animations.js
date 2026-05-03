export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, x: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const staggerContainer = {
  hidden: {},
  visible: { 
    transition: { staggerChildren: 0.12, delayChildren: 0.1 } 
  }
};

export const cardHover = {
  rest: { 
    scale: 1, y: 0, 
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)" 
  },
  hover: { 
    scale: 1.03, y: -12, 
    boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

export const imageZoom = {
  rest: { scale: 1 },
  hover: { scale: 1.08, transition: { duration: 0.5, ease: "easeOut" } }
};

export const clipReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { 
    clipPath: "inset(0 0% 0 0)", 
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, scale: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const viewportConfig = { once: true, margin: "-100px" };
