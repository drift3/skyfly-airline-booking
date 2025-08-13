import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPercent, 
  FiClock, 
  FiArrowRight, 
  FiChevronLeft, 
  FiChevronRight,
  FiTag,
  FiStar,
  FiCalendar,
  FiMapPin
} from 'react-icons/fi';

const SpecialOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const offers = [
    {
      id: 1,
      title: 'Summer Paradise',
      subtitle: 'Beach Destinations',
      discount: '40%',
      originalPrice: 1299,
      salePrice: 779,
      destination: 'Maldives & Bali',
      validUntil: '2024-08-31',
      description: 'Escape to tropical paradise with our exclusive summer deals',
      features: ['Free Resort Transfer', 'Complimentary Meals', 'Flexible Booking'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-blue-500 to-cyan-500',
      badge: 'Limited Time'
    },
    {
      id: 2,
      title: 'City Explorer',
      subtitle: 'Urban Adventures',
      discount: '30%',
      originalPrice: 899,
      salePrice: 629,
      destination: 'Tokyo & Seoul',
      validUntil: '2024-07-15',
      description: 'Discover vibrant cities with unbeatable prices',
      features: ['City Tours Included', 'Airport Lounge Access', '24/7 Support'],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-purple-500 to-pink-500',
      badge: 'Best Seller'
    },
    {
      id: 3,
      title: 'European Getaway',
      subtitle: 'Cultural Journey',
      discount: '35%',
      originalPrice: 1199,
      salePrice: 779,
      destination: 'Paris & Rome',
      validUntil: '2024-09-30',
      description: 'Immerse yourself in European culture and history',
      features: ['Museum Passes', 'Local Guide', 'Premium Seats'],
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-amber-500 to-orange-500',
      badge: 'Popular'
    },
    {
      id: 4,
      title: 'Adventure Awaits',
      subtitle: 'Mountain Escapes',
      discount: '25%',
      originalPrice: 1599,
      salePrice: 1199,
      destination: 'Swiss Alps',
      validUntil: '2024-12-31',
      description: 'Experience breathtaking mountain adventures',
      features: ['Ski Pass Included', 'Mountain Lodge', 'Equipment Rental'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gradient: 'from-green-500 to-teal-500',
      badge: 'New'
    }
  ];

  const featuredDeals = [
    {
      title: 'Last Minute Deals',
      description: 'Save up to 60% on flights departing within 7 days',
      icon: FiClock,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Group Bookings',
      description: 'Special rates for groups of 10 or more passengers',
      icon: FiTag,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Loyalty Rewards',
      description: 'Earn points and unlock exclusive member benefits',
      icon: FiStar,
      color: 'bg-gold-100 text-gold-600'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, offers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section id="offers" className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display gradient-text mb-3 sm:mb-4 px-4">
            Exclusive Special Offers
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Don't miss out on these incredible deals and limited-time offers
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative mb-12 sm:mb-16">
          <div 
            className="relative h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${offers[currentSlide].image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${offers[currentSlide].gradient} opacity-80`} />
                
                {/* Content */}
                <div className="relative h-full flex items-start sm:items-center py-6 sm:py-8 lg:py-12">
                  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start lg:items-center min-h-0">
                      {/* Text Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-2 lg:order-1 space-y-3 sm:space-y-4 flex flex-col justify-center"
                      >
                        {/* Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
                        >
                          <FiPercent className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm font-medium">{offers[currentSlide].badge}</span>
                        </motion.div>

                        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-display leading-tight">
                          {offers[currentSlide].title}
                        </h3>
                        
                        <p className="text-sm sm:text-base lg:text-lg opacity-90">
                          {offers[currentSlide].subtitle}
                        </p>
                        
                        <p className="text-xs sm:text-sm lg:text-base opacity-80 line-clamp-3 sm:line-clamp-2">
                          {offers[currentSlide].description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {offers[currentSlide].features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                              className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm"
                            >
                              {feature}
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-white text-gray-800 font-semibold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base w-full sm:w-auto"
                        >
                          <span>Book This Deal</span>
                          <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.button>
                      </motion.div>

                      {/* Price Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-6 text-gray-800 shadow-2xl order-1 lg:order-2 mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none flex-shrink-0"
                      >
                        <div className="text-center space-y-1.5 sm:space-y-2 lg:space-y-3">
                          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500">
                            {offers[currentSlide].discount}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">OFF</div>
                          
                          <div className="flex items-center justify-center space-x-1">
                            <FiMapPin className="h-3 w-3 text-primary-600 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium line-clamp-1">
                              {offers[currentSlide].destination}
                            </span>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="text-sm sm:text-base text-gray-400 line-through">
                              ${offers[currentSlide].originalPrice}
                            </div>
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600">
                              ${offers[currentSlide].salePrice}
                            </div>
                            <div className="text-xs text-gray-500">per person</div>
                          </div>
                          
                          <div className="flex items-center justify-center space-x-1 text-xs text-gray-600">
                            <FiCalendar className="h-3 w-3 flex-shrink-0" />
                            <span className="line-clamp-1">Valid until {offers[currentSlide].validUntil}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
            >
              <FiChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
            >
              <FiChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Featured Deals */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {featuredDeals.map((deal, index) => (
            <motion.div
              key={deal.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 sm:mb-6 ${deal.color}`}>
                <deal.icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                {deal.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                {deal.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-6 sm:p-8 lg:p-12 text-white text-center"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            Never Miss a Deal
          </h3>
          <p className="text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive offers
          </p>
          
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white text-sm sm:text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;