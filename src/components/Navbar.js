import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiNavigation, FiMapPin, FiTag, FiPhone, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Destinations', href: '#destinations', icon: FiMapPin },
    { name: 'About', href: '#about', icon: FiNavigation },
    { name: 'Offers', href: '#offers', icon: FiTag },
    { name: 'Contact', href: '#contact', icon: FiPhone },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg">
                <FiNavigation className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-display gradient-text">
                SkyFly
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                    scrolled
                      ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-white hover:text-accent-300 hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <FiUser className="h-4 w-4" />
                <span>Sign In</span>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-72 sm:w-80 bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header - Remove duplicate logo */}
                <div className="flex items-center justify-end p-4 sm:p-6 border-b border-gray-200">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FiX className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-4 sm:py-6">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center space-x-3 w-full px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Sign In Button */}
                <div className="p-4 sm:p-6 border-t border-gray-200">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center space-x-2 text-sm sm:text-base py-2 sm:py-3"
                  >
                    <FiUser className="h-4 w-4" />
                    <span>Sign In</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;