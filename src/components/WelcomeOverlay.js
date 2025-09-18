import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RefractionImage from './RefractionImage';

const WelcomeOverlay = () => {
  const [countdown, setCountdown] = useState(5);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Start fade out animation when countdown reaches 0
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [countdown]);

  // Floating shapes animation variants
  const floatingShapes = [
    { delay: 0, x: 100, y: 50 },
    { delay: 0.5, x: 200, y: 150 },
    { delay: 1, x: 80, y: 200 },
    { delay: 1.5, x: 300, y: 100 },
    { delay: 2, x: 150, y: 300 },
  ];

  const overlayVariants = {
    initial: {
      x: '-100%',
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  const countdownVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    },
    exit: { 
      scale: 1.5, 
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const shapeVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -100],
      opacity: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center lg:justify-start"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Desktop: Left half overlay */}
          <div className="hidden lg:block w-1/2 h-full relative overflow-hidden">
            {/* Glassmorphism background with neon border */}
            <div className="absolute inset-0 backdrop-blur-xl border-r-2 border-purple-400/60 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              {/* Animated gradient background - behind particles */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/30 to-blue-900/40 z-0"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(88, 28, 135, 0.4), rgba(55, 48, 163, 0.3), rgba(30, 64, 175, 0.4))",
                    "linear-gradient(135deg, rgba(55, 48, 163, 0.4), rgba(30, 64, 175, 0.3), rgba(88, 28, 135, 0.4))",
                    "linear-gradient(135deg, rgba(30, 64, 175, 0.4), rgba(88, 28, 135, 0.3), rgba(55, 48, 163, 0.4))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating shapes - behind dark overlay */}
              {floatingShapes.map((shape, index) => (
                <motion.div
                  key={index}
                  className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-purple-400/15 to-blue-400/10 backdrop-blur-sm z-10"
                  style={{ left: shape.x, top: shape.y }}
                  variants={shapeVariants}
                  animate="animate"
                  transition={{ delay: shape.delay }}
                />
              ))}

              {/* Animated particles - behind dark overlay */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-300/40 rounded-full z-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  variants={particleVariants}
                  animate="animate"
                  transition={{ delay: i * 0.2 }}
                />
              ))}

              {/* Dark tinted overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/75 via-gray-900/70 to-black/80 z-20" />

              {/* Subtle mesh gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse z-30" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-40">
              <motion.div
                className="text-center space-y-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.h2 
                  className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl"
                  style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Welcome to SkyFly
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <RefractionImage 
                    src="/me.jpeg"
                    alt="Ahmed Farouk"
                    width={120}
                    height={120}
                    className="mb-2"
                  />
                  <motion.p 
                    className="text-lg text-white/95 font-light drop-shadow-lg"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
                  >
                    By Ahmed Farouk : +201020647876
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Countdown Timer */}
              <motion.div
                className="mt-16 relative"
                key={countdown}
                variants={countdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="relative">
                  {/* Glowing ring */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 314" }}
                      animate={{ 
                        strokeDasharray: `${(5 - countdown) * 62.8} 314`,
                        rotate: 360 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Countdown number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-6xl font-bold text-white drop-shadow-2xl"
                      style={{ 
                        textShadow: '0 0 30px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {countdown}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile: Top half overlay */}
          <div className="lg:hidden w-full h-1/2 relative overflow-hidden">
            {/* Glassmorphism background with neon border */}
            <div className="absolute inset-0 backdrop-blur-xl border-b-2 border-purple-400/60 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              {/* Animated gradient background - behind particles */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-purple-800/30 to-blue-900/40 z-0"
                animate={{
                  background: [
                    "linear-gradient(180deg, rgba(88, 28, 135, 0.4), rgba(55, 48, 163, 0.3), rgba(30, 64, 175, 0.4))",
                    "linear-gradient(180deg, rgba(55, 48, 163, 0.4), rgba(30, 64, 175, 0.3), rgba(88, 28, 135, 0.4))",
                    "linear-gradient(180deg, rgba(30, 64, 175, 0.4), rgba(88, 28, 135, 0.3), rgba(55, 48, 163, 0.4))"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating shapes - mobile optimized, behind dark overlay */}
              {floatingShapes.slice(0, 3).map((shape, index) => (
                <motion.div
                  key={index}
                  className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-purple-400/15 to-blue-400/10 backdrop-blur-sm z-10"
                  style={{ left: `${(shape.x / 400) * 100}%`, top: `${(shape.y / 400) * 100}%` }}
                  variants={shapeVariants}
                  animate="animate"
                  transition={{ delay: shape.delay }}
                />
              ))}

              {/* Animated particles - mobile optimized, behind dark overlay */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-300/40 rounded-full z-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  variants={particleVariants}
                  animate="animate"
                  transition={{ delay: i * 0.3 }}
                />
              ))}

              {/* Dark tinted overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/75 via-gray-900/70 to-black/80 z-20" />

              {/* Subtle mesh gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent animate-pulse z-30" />
            </div>

            {/* Content - Mobile */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 z-40">
              <motion.div
                className="text-center space-y-4"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                <motion.h2 
                  className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl"
                  style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}
                  animate={{
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Welcome to SkyFly
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <RefractionImage 
                    src="/me.jpeg"
                    alt="Ahmed Farouk"
                    width={80}
                    height={80}
                    className="mb-1"
                  />
                  <motion.p 
                    className="text-xs sm:text-sm text-white/95 font-light drop-shadow-lg text-center"
                    style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
                  >
                    By Ahmed Farouk : +201020647876
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Countdown Timer - Mobile */}
              <motion.div
                className="mt-8 relative"
                key={countdown}
                variants={countdownVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="relative">
                  {/* Glowing ring - smaller for mobile */}
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="url(#gradientMobile)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 314" }}
                      animate={{ 
                        strokeDasharray: `${(5 - countdown) * 62.8} 314`,
                        rotate: 360 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Countdown number - smaller for mobile */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span 
                      className="text-3xl sm:text-4xl font-bold text-white drop-shadow-2xl"
                      style={{ 
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {countdown}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;