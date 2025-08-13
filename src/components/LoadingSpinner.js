import React from 'react';
import { motion } from 'framer-motion';
import { FiNavigation } from 'react-icons/fi';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Plane */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`${sizeClasses[size]} bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center`}
      >
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <FiNavigation className="text-white w-1/2 h-1/2" />
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`${textSizes[size]} text-gray-600 font-medium`}
      >
        {text}
      </motion.p>

      {/* Progress Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-primary-500 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;