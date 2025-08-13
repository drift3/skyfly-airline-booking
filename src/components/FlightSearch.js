import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMapPin, 
  FiCalendar, 
  FiUsers, 
  FiSearch, 
  FiArrowRight,
  FiNavigation,
  FiRefreshCw
} from 'react-icons/fi';
import FlightResults from './FlightResults';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const popularCities = [
    'New York', 'London', 'Paris', 'Tokyo', 'Dubai', 'Singapore',
    'Los Angeles', 'Sydney', 'Rome', 'Barcelona', 'Amsterdam', 'Bangkok'
  ];

  const handleSearch = async () => {
    if (!fromCity || !toCity || !departDate) {
      window.showToast?.({
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      setIsSearching(false);
      setShowResults(true);
      window.showToast?.({
        message: 'Flights found! Check out the best deals.',
        type: 'success'
      });
    }, 2000);
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  return (
    <section id="flight-search" className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display gradient-text mb-3 sm:mb-4 px-4">
            Find Your Perfect Flight
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Search and compare flights from hundreds of airlines to get the best deals
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100"
        >
          {/* Trip Type Selector */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
            {['roundtrip', 'oneway', 'multicity'].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTripType(type)}
                className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
                  tripType === type
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'roundtrip' && 'Round Trip'}
                {type === 'oneway' && 'One Way'}
                {type === 'multicity' && 'Multi-City'}
              </motion.button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* From City */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                From
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  placeholder="Departure city"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  list="cities-from"
                />
                <datalist id="cities-from">
                  {popularCities.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </motion.div>

            {/* Swap Button */}
            <div className="hidden lg:flex items-end justify-center pb-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={swapCities}
                className="p-3 bg-primary-100 hover:bg-primary-200 rounded-full transition-all duration-300"
              >
                <FiRefreshCw className="h-5 w-5 text-primary-600" />
              </motion.button>
            </div>

            {/* To City */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative lg:-ml-6"
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                To
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  placeholder="Destination city"
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  list="cities-to"
                />
                <datalist id="cities-to">
                  {popularCities.map(city => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </motion.div>

            {/* Passengers */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Passengers
              </label>
              <div className="relative">
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <button
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-left text-sm sm:text-base"
                >
                  {passengers} {passengers === 1 ? 'Passenger' : 'Passengers'}
                </button>
                
                <AnimatePresence>
                  {showPassengerDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <button
                          key={num}
                          onClick={() => {
                            setPassengers(num);
                            setShowPassengerDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-primary-50 transition-colors"
                        >
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Departure Date */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Departure Date
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                />
              </div>
            </motion.div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Return Date
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departDate || new Date().toISOString().split('T')[0]}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg disabled:opacity-50 text-sm sm:text-base"
          >
            {isSearching ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Searching Flights...</span>
              </>
            ) : (
              <>
                <FiSearch className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Search Flights</span>
                <FiArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Quick Search Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Popular Routes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { from: 'New York', to: 'London', price: '$599' },
              { from: 'Los Angeles', to: 'Tokyo', price: '$899' },
              { from: 'Miami', to: 'Paris', price: '$699' },
            ].map((route, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border border-primary-100 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  setFromCity(route.from);
                  setToCity(route.to);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FiNavigation className="h-5 w-5 text-primary-600" />
                    <span className="font-medium text-gray-800">
                      {route.from} → {route.to}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-accent-600">
                    {route.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flight Results Modal */}
        <FlightResults
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          searchData={{
            fromCity,
            toCity,
            departDate,
            returnDate,
            passengers,
            tripType
          }}
        />
      </div>
    </section>
  );
};

export default FlightSearch;