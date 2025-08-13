import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiStar, FiArrowRight, FiHeart, FiCamera } from 'react-icons/fi';

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState(new Set());
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beach', name: 'Beach Paradise' },
    { id: 'city', name: 'City Breaks' },
    { id: 'mountain', name: 'Mountain Escapes' },
    { id: 'cultural', name: 'Cultural Sites' },
  ];

  const destinationData = [
    {
      id: 1,
      name: 'Santorini',
      country: 'Greece',
      category: 'beach',
      price: 899,
      rating: 4.9,
      description: 'Stunning sunsets and white-washed buildings',
      searchTerm: 'santorini,greece,sunset'
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      category: 'city',
      price: 1299,
      rating: 4.8,
      description: 'Modern metropolis meets ancient tradition',
      searchTerm: 'tokyo,japan,city'
    },
    {
      id: 3,
      name: 'Swiss Alps',
      country: 'Switzerland',
      category: 'mountain',
      price: 1599,
      rating: 4.9,
      description: 'Breathtaking mountain peaks and pristine lakes',
      searchTerm: 'swiss,alps,mountains'
    },
    {
      id: 4,
      name: 'Bali',
      country: 'Indonesia',
      category: 'beach',
      price: 799,
      rating: 4.7,
      description: 'Tropical paradise with rich culture',
      searchTerm: 'bali,indonesia,beach'
    },
    {
      id: 5,
      name: 'Paris',
      country: 'France',
      category: 'cultural',
      price: 999,
      rating: 4.8,
      description: 'City of lights and romance',
      searchTerm: 'paris,france,eiffel'
    },
    {
      id: 6,
      name: 'New York',
      country: 'USA',
      category: 'city',
      price: 699,
      rating: 4.6,
      description: 'The city that never sleeps',
      searchTerm: 'new,york,skyline'
    },
    {
      id: 7,
      name: 'Maldives',
      country: 'Maldives',
      category: 'beach',
      price: 2199,
      rating: 4.9,
      description: 'Crystal clear waters and overwater bungalows',
      searchTerm: 'maldives,beach,tropical'
    },
    {
      id: 8,
      name: 'Machu Picchu',
      country: 'Peru',
      category: 'cultural',
      price: 1199,
      rating: 4.8,
      description: 'Ancient Incan citadel in the clouds',
      searchTerm: 'machu,picchu,peru'
    },
  ];

  useEffect(() => {
    const loadDestinationImages = async () => {
      setLoading(true);
      
      // Predefined working image URLs for each destination
      const imageMap = {
        'Santorini': 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Swiss Alps': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Maldives': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Iceland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'Machu Picchu': 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      };
      
      const destinationsWithImages = destinationData.map((dest) => ({
        ...dest,
        image: imageMap[dest.name] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }));
      
      setDestinations(destinationsWithImages);
      setLoading(false);
    };

    loadDestinationImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredDestinations = selectedCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
            Discover Amazing Destinations
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From pristine beaches to bustling cities, explore the world's most incredible destinations
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm lg:text-base ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-40 sm:h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 sm:p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-4 w-2/3" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Destinations Grid */}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <motion.img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(destination.id);
                      }}
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <FiHeart 
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          favorites.has(destination.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </motion.button>

                    {/* Photo Credit */}
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-1 text-white text-xs bg-black/50 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        <FiCamera className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span className="text-xs">Unsplash</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                        {destination.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <FiStar className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          {destination.rating}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 mb-2 sm:mb-3">
                      <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="text-xs sm:text-sm">{destination.country}</span>
                    </div>
                    
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                      {destination.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg sm:text-2xl font-bold text-primary-600">
                          ${destination.price}
                        </span>
                        <span className="text-gray-500 text-xs sm:text-sm ml-1">per person</span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        <span className="text-sm">Book Now</span>
                        <FiArrowRight className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-lg px-8 py-4"
          >
            View All Destinations
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Destinations;