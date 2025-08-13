import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, 
  FiShield, 
  FiHeart, 
  FiGlobe, 
  FiUsers, 
  FiClock,
  FiStar,
  FiNavigation
} from 'react-icons/fi';

const About = () => {
  const [aboutImage, setAboutImage] = useState('');
  const [isInView, setIsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    // Load about section image with fallbacks
    const imageOptions = [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Airplane wing
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Travel suitcase
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', // Landscape
      'https://picsum.photos/1200/800?random=1' // Final fallback
    ];
    
    const tryLoadImage = async (urls) => {
      for (const url of urls) {
        try {
          const img = new Image();
          img.src = url;
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
          setAboutImage(url);
          return;
        } catch (error) {
          console.log(`Failed to load image: ${url}`);
        }
      }
      // If all fail, use a gradient background
      setAboutImage('');
    };
    
    tryLoadImage(imageOptions);

    // Set up intersection observer for stats animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      icon: FiGlobe, 
      number: 150, 
      suffix: '+', 
      label: 'Destinations Worldwide',
      color: 'text-primary-600'
    },
    { 
      icon: FiUsers, 
      number: 50, 
      suffix: 'M+', 
      label: 'Happy Customers',
      color: 'text-accent-600'
    },
    { 
      icon: FiNavigation, 
      number: 500, 
      suffix: '+', 
      label: 'Modern Aircraft',
      color: 'text-gold-600'
    },
    { 
      icon: FiClock, 
      number: 99.9, 
      suffix: '%', 
      label: 'On-Time Performance',
      color: 'text-green-600'
    },
  ];

  const values = [
    {
      icon: FiAward,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from booking to landing.',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: FiShield,
      title: 'Safety First',
      description: 'Your safety is our top priority with rigorous maintenance and safety protocols.',
      color: 'bg-accent-100 text-accent-600'
    },
    {
      icon: FiHeart,
      title: 'Customer Care',
      description: 'We treat every passenger like family, ensuring comfort and satisfaction.',
      color: 'bg-gold-100 text-gold-600'
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      description: 'Connecting you to destinations worldwide with our extensive route network.',
      color: 'bg-green-100 text-green-600'
    },
  ];

  const AnimatedCounter = ({ number, suffix, duration = 2 }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!isInView) return;
      
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * number));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [number, duration]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return <span>{count}{suffix}</span>;
  };

  return (
    <section id="about" className="py-12 sm:py-20 bg-white">
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
            About SkyFly
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Soaring above expectations since 1995, we've been connecting dreams to destinations
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Your Journey, Our Passion
            </h3>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              For over 25 years, SkyFly has been more than just an airline – we've been 
              your trusted partner in exploration. From our humble beginnings with a single 
              aircraft to becoming a global aviation leader, our commitment to excellence 
              has never wavered.
            </p>
            
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              We believe that travel should be extraordinary, not ordinary. That's why we've 
              invested in state-of-the-art aircraft, world-class service, and innovative 
              technology to make your journey as memorable as your destination.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full"
              >
                <FiStar className="h-5 w-5 text-primary-600" />
                <span className="text-primary-700 font-medium">5-Star Service</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-accent-50 px-4 py-2 rounded-full"
              >
                <FiAward className="h-5 w-5 text-accent-600" />
                <span className="text-accent-700 font-medium">Award Winning</span>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 bg-gold-50 px-4 py-2 rounded-full"
              >
                <FiShield className="h-5 w-5 text-gold-600" />
                <span className="text-gold-700 font-medium">Safety Certified</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Fallback gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-gold-500 w-full h-96" />
              
              {aboutImage && (
                <motion.img
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1 }}
                  src={aboutImage}
                  alt="SkyFly crew and aircraft"
                  className="relative w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">25+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-600">200+</div>
                    <div className="text-sm text-gray-600">Expert Crew</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20"
            />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-gold-400 to-accent-400 rounded-lg opacity-30"
            />
          </motion.div>
        </div>

        {/* Animated Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className={`inline-flex p-3 rounded-full mb-4 ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              <div className={`text-4xl font-bold font-display mb-2 ${stat.color}`}>
                <AnimatedCounter 
                  number={stat.number} 
                  suffix={stat.suffix}
                  duration={2 + index * 0.2}
                />
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and shape the experience we deliver
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-full mb-4 ${value.color}`}>
                <value.icon className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Experience SkyFly?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join millions of satisfied travelers who choose SkyFly for their journeys
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;