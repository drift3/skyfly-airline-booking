import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiArrowDown } from 'react-icons/fi';

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use a reliable travel-themed image
    const travelImages = [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Airplane wing
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Travel suitcase
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Beautiful landscape
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Beach paradise
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'  // Mountain landscape
    ];
    
    const randomImage = travelImages[Math.floor(Math.random() * travelImages.length)];
    setBackgroundImage(randomImage);
    
    // Preload the image
    const img = new Image();
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      // Fallback to a solid gradient if image fails
      setBackgroundImage('');
      setIsLoading(false);
    };
    img.src = randomImage;
  }, []);

  const scrollToSearch = () => {
    const searchSection = document.querySelector('#flight-search');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-gold-500" />
        
        {!isLoading && backgroundImage && (
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-display text-white text-shadow-lg leading-tight"
          >
            Fly Beyond
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="block bg-gradient-to-r from-accent-400 to-gold-400 bg-clip-text text-transparent"
            >
              Expectations
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Discover the world with SkyFly's premium airline experience. 
            Book flights to amazing destinations with unmatched comfort and style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToSearch}
              className="btn-accent text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-2xl w-full sm:w-auto"
            >
              Book Your Flight
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 sm:space-x-3 text-white hover:text-accent-300 transition-colors duration-300 group w-full sm:w-auto"
            >
              <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-full group-hover:bg-white/30 transition-all duration-300">
                <FiPlay className="h-4 w-4 sm:h-6 sm:w-6 ml-1" />
              </div>
              <span className="text-sm sm:text-lg font-medium">Watch Our Story</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-12 sm:pt-16 max-w-2xl mx-auto px-4"
          >
            {[
              { number: '150+', label: 'Destinations' },
              { number: '50M+', label: 'Happy Travelers' },
              { number: '99.9%', label: 'On-Time Performance' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-display">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-xs sm:text-sm md:text-base mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={scrollToSearch}
          className="text-white/80 hover:text-white transition-colors duration-300 flex flex-col items-center space-y-1 sm:space-y-2 group"
        >
          <span className="text-xs sm:text-sm font-medium group-hover:text-accent-300 transition-colors">
            
          </span>
          <FiArrowDown className="h-4 w-4 sm:h-6 sm:w-6" />
        </motion.button>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full hidden lg:block"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/3 right-16 w-12 h-12 bg-accent-400/20 backdrop-blur-sm rounded-lg hidden lg:block"
      />
    </section>
  );
};

export default Hero;