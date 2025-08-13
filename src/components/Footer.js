import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiNavigation, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp
} from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    'Company': [
      { name: 'About Us', href: '#about' },
      { name: 'Our Fleet', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Investor Relations', href: '#' }
    ],
    'Travel': [
      { name: 'Destinations', href: '#destinations' },
      { name: 'Flight Status', href: '#' },
      { name: 'Check-in', href: '#' },
      { name: 'Baggage Info', href: '#' },
      { name: 'Travel Guides', href: '#' }
    ],
    'Support': [
      { name: 'Customer Service', href: '#contact' },
      { name: 'FAQ', href: '#contact' },
      { name: 'Booking Help', href: '#' },
      { name: 'Special Assistance', href: '#' },
      { name: 'Feedback', href: '#' }
    ],
    'Legal': [
      { name: 'Terms of Service', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' },
      { name: 'Sitemap', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: FiFacebook, href: '#', color: 'hover:text-blue-600' },
    { icon: FiTwitter, href: '#', color: 'hover:text-sky-500' },
    { icon: FiInstagram, href: '#', color: 'hover:text-pink-600' },
    { icon: FiLinkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  const contactInfo = [
    { icon: FiPhone, text: '+1 (555) 123-4567' },
    { icon: FiMail, text: 'support@skyfly.com' },
    { icon: FiMapPin, text: '123 Aviation Blvd, Sky City' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 sm:p-3 rounded-lg">
                <FiNavigation className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold font-display">
                SkyFly
              </span>
            </div>
            
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Your trusted partner in aviation, connecting dreams to destinations 
              worldwide with premium service and unmatched comfort.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2 sm:space-x-3 text-gray-300"
                >
                  <info.icon className="h-3 w-3 sm:h-4 sm:w-4 text-primary-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{info.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">
                  {category}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-primary-400 transition-colors duration-300 text-xs sm:text-sm"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Subscribe to our newsletter for exclusive deals and travel inspiration
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 sm:space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-400 text-xs sm:text-sm text-center md:text-left"
            >
              © 2025 SkyFly Airlines. All rights reserved - Ahmed Farouk.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 sm:space-x-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-gray-400 ${social.color} transition-all duration-300`}
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              ))}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-300 text-xs sm:text-sm"
            >
              <span>Back to Top</span>
              <FiArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        viewport={{ once: true }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-r from-primary-600 to-accent-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <FiArrowUp className="h-4 w-4 sm:h-6 sm:w-6" />
      </motion.button>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-gold-500"></div>
    </footer>
  );
};

export default Footer;