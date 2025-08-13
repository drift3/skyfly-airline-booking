import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Gradient Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-r from-accent-300/15 to-gold-400/15 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-primary-300/10 to-blue-400/10 rounded-full blur-2xl"
      />

      {/* Geometric Shapes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/3 w-32 h-32 border border-primary-200/30 rounded-lg transform rotate-45"
      />
      
      <motion.div
        animate={{
          rotate: [360, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/3 right-10 w-24 h-24 border-2 border-accent-200/40 rounded-full"
      />
      
      <motion.div
        animate={{
          x: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-2/3 left-10 w-16 h-16 bg-gradient-to-r from-gold-300/20 to-accent-300/20 transform rotate-45"
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          className="absolute w-2 h-2 bg-primary-400/40 rounded-full"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${20 + (i * 5)}%`,
          }}
        />
      ))}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary-50/30" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-50/20 via-transparent to-transparent" />
      
      {/* Mesh Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default BackgroundElements;