import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiChevronDown,
  FiMessageCircle,
  FiHeadphones,
  FiGlobe
} from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const contactInfo = [
    {
      icon: FiPhone,
      title: '24/7 Customer Support',
      details: '+1 (555) 123-4567',
      description: 'Available round the clock for your assistance',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: FiMail,
      title: 'Email Support',
      details: 'support@skyfly.com',
      description: 'Get detailed responses within 2 hours',
      color: 'bg-accent-100 text-accent-600'
    },
    {
      icon: FiMapPin,
      title: 'Headquarters',
      details: '123 Aviation Blvd, Sky City',
      description: 'Visit our main office for in-person support',
      color: 'bg-gold-100 text-gold-600'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      details: 'Mon-Fri: 6AM-10PM EST',
      description: 'Extended hours for your convenience',
      color: 'bg-green-100 text-green-600'
    }
  ];

  const faqs = [
    {
      question: 'How can I change or cancel my booking?',
      answer: 'You can easily change or cancel your booking through our website by logging into your account and accessing "My Bookings". Changes and cancellations are subject to fare rules and may incur fees. For immediate assistance, contact our 24/7 customer support.'
    },
    {
      question: 'What is your baggage policy?',
      answer: 'Our baggage allowance varies by ticket type and destination. Economy passengers typically get 1 carry-on (up to 7kg) and 1 checked bag (up to 23kg). Business and First class passengers enjoy higher allowances. Check your specific booking for exact details.'
    },
    {
      question: 'How early should I arrive at the airport?',
      answer: 'We recommend arriving 2 hours before domestic flights and 3 hours before international flights. This allows sufficient time for check-in, security screening, and boarding. Premium passengers can use our expedited check-in services.'
    },
    {
      question: 'Do you offer special meals?',
      answer: 'Yes! We offer a variety of special meals including vegetarian, vegan, kosher, halal, and meals for specific dietary requirements. Special meals must be requested at least 24 hours before departure through our website or customer service.'
    },
    {
      question: 'What happens if my flight is delayed or cancelled?',
      answer: 'In case of delays or cancellations, we will notify you immediately via SMS and email. You may be entitled to compensation, rebooking, or refunds depending on the circumstances. Our customer service team will assist you with alternative arrangements.'
    },
    {
      question: 'How can I earn and redeem loyalty points?',
      answer: 'Join our SkyFly Rewards program to earn points on every flight. Points can be redeemed for free flights, upgrades, and exclusive perks. You also earn points through our partner hotels, car rentals, and credit card purchases.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Thank you for your message! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white">
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
            Get in Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            We're here to help make your travel experience exceptional. Reach out to us anytime!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex p-3 sm:p-4 rounded-full mb-3 sm:mb-4 ${info.color}`}>
                <info.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                {info.title}
              </h3>
              <p className="text-primary-600 font-semibold mb-2 text-sm sm:text-base">
                {info.details}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {info.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="cancellation">Cancellation/Changes</option>
                  <option value="baggage">Baggage Issues</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Please describe your inquiry in detail..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Quick Contact Options */}
            <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl border border-primary-100">
              <h4 className="text-lg font-bold text-gray-800 mb-4">
                Need Immediate Help?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <FiPhone className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium">Call Now</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <FiMessageCircle className="h-5 w-5 text-accent-600" />
                  <span className="text-sm font-medium">Live Chat</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <FiHeadphones className="h-5 w-5 text-gold-600" />
                  <span className="text-sm font-medium">Support</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                  >
                    <span className="font-semibold text-gray-800">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="h-5 w-5 text-gray-500" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-8 text-center"
            >
              <FiGlobe className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Visit Our Office
              </h4>
              <p className="text-gray-600 mb-4">
                123 Aviation Boulevard, Sky City, SC 12345
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Get Directions
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;