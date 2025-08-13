import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight, FiMessageCircle } from 'react-icons/fi';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      text: 'SkyFly exceeded all my expectations! The booking process was seamless, and the flight experience was absolutely premium. The crew was incredibly professional and the amenities were top-notch.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      trip: 'New York to Paris',
      date: 'March 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      rating: 5,
      text: 'As a frequent business traveler, I can confidently say SkyFly offers the best value for premium travel. Their punctuality and service quality are unmatched in the industry.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      trip: 'Singapore to Tokyo',
      date: 'February 2024'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      rating: 5,
      text: 'My family vacation started perfectly with SkyFly. The kids were entertained throughout the flight, and the staff went above and beyond to make our journey comfortable.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      trip: 'Barcelona to Bali',
      date: 'January 2024'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'London, UK',
      rating: 5,
      text: 'The attention to detail is remarkable. From the moment I booked online to landing at my destination, every aspect of the journey was handled with care and professionalism.',
      image: 'https://randomuser.me/api/portraits/men/46.jpg',
      trip: 'London to Dubai',
      date: 'April 2024'
    },
    {
      id: 5,
      name: 'Priya Patel',
      location: 'Mumbai, India',
      rating: 5,
      text: 'SkyFly made my dream honeymoon trip possible with their amazing deals and exceptional service. The romantic ambiance and premium amenities made it truly special.',
      image: 'https://randomuser.me/api/portraits/women/72.jpg',
      trip: 'Mumbai to Maldives',
      date: 'December 2023'
    }
  ];

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display gradient-text mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have experienced the SkyFly difference
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-primary-200">
                <FiMessageCircle className="h-12 w-12" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Customer Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center md:text-left"
                >
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 mx-auto md:mx-0 shadow-lg flex items-center justify-center">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-32 h-32 rounded-full object-cover absolute inset-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="text-white text-2xl font-bold">
                        {testimonials[currentTestimonial].name.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full">
                      <FiStar className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="md:col-span-2"
                >
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonials[currentTestimonial].location}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 text-sm text-gray-500">
                        <div>{testimonials[currentTestimonial].trip}</div>
                        <div>{testimonials[currentTestimonial].date}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          >
            <FiChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-primary-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { number: '4.9/5', label: 'Average Rating' },
            { number: '50M+', label: 'Happy Customers' },
            { number: '99.9%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Customer Support' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of satisfied travelers and experience the SkyFly difference for yourself
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
            onClick={() => {
              const searchSection = document.querySelector('#flight-search');
              if (searchSection) {
                searchSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Your Flight Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;