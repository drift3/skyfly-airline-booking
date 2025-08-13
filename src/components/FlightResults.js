import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiNavigation, 
  FiMapPin, 
  FiWifi,
  FiCoffee,
  FiMonitor,
  FiStar,
  FiFilter,
  FiArrowRight
} from 'react-icons/fi';
import Modal from './Modal';

const FlightResults = ({ isOpen, onClose, searchData }) => {
  const [sortBy, setSortBy] = useState('price');
  const [filterBy, setFilterBy] = useState('all');

  // Mock flight data
  const flights = [
    {
      id: 1,
      airline: 'SkyFly Premium',
      flightNumber: 'SF 101',
      departure: {
        time: '08:30',
        airport: 'JFK',
        city: searchData?.fromCity || 'New York'
      },
      arrival: {
        time: '14:45',
        airport: 'LHR',
        city: searchData?.toCity || 'London'
      },
      duration: '6h 15m',
      stops: 'Non-stop',
      price: 899,
      originalPrice: 1299,
      discount: 31,
      class: 'Economy',
      amenities: ['wifi', 'meals', 'entertainment'],
      rating: 4.8,
      aircraft: 'Boeing 787-9'
    },
    {
      id: 2,
      airline: 'SkyFly Business',
      flightNumber: 'SF 203',
      departure: {
        time: '10:15',
        airport: 'JFK',
        city: searchData?.fromCity || 'New York'
      },
      arrival: {
        time: '16:30',
        airport: 'LHR',
        city: searchData?.toCity || 'London'
      },
      duration: '6h 15m',
      stops: 'Non-stop',
      price: 1599,
      originalPrice: 2199,
      discount: 27,
      class: 'Business',
      amenities: ['wifi', 'meals', 'entertainment', 'lounge'],
      rating: 4.9,
      aircraft: 'Airbus A350'
    },
    {
      id: 3,
      airline: 'SkyFly Express',
      flightNumber: 'SF 305',
      departure: {
        time: '16:20',
        airport: 'JFK',
        city: searchData?.fromCity || 'New York'
      },
      arrival: {
        time: '22:35',
        airport: 'LHR',
        city: searchData?.toCity || 'London'
      },
      duration: '6h 15m',
      stops: 'Non-stop',
      price: 679,
      originalPrice: 899,
      discount: 24,
      class: 'Economy',
      amenities: ['wifi', 'meals'],
      rating: 4.6,
      aircraft: 'Boeing 777-300ER'
    }
  ];

  const amenityIcons = {
    wifi: FiWifi,
    meals: FiCoffee,
    entertainment: FiMonitor,
    lounge: FiStar
  };

  const sortOptions = [
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'duration', label: 'Duration' },
    { value: 'departure', label: 'Departure Time' },
    { value: 'rating', label: 'Rating' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Flights' },
    { value: 'nonstop', label: 'Non-stop Only' },
    { value: 'economy', label: 'Economy Class' },
    { value: 'business', label: 'Business Class' }
  ];

  const sortedFlights = [...flights].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'departure':
        return a.departure.time.localeCompare(b.departure.time);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filteredFlights = sortedFlights.filter(flight => {
    switch (filterBy) {
      case 'nonstop':
        return flight.stops === 'Non-stop';
      case 'economy':
        return flight.class === 'Economy';
      case 'business':
        return flight.class === 'Business';
      default:
        return true;
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Available Flights" size="xl">
      <div className="space-y-6">
        {/* Search Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-lg border border-primary-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiMapPin className="h-4 w-4 text-primary-600" />
                <span className="font-medium">{searchData?.fromCity || 'New York'}</span>
                <FiArrowRight className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{searchData?.toCity || 'London'}</span>
              </div>
              <div className="text-sm text-gray-600">
                {searchData?.departDate || 'Today'} • {searchData?.passengers || 1} passenger(s)
              </div>
            </div>
            <div className="text-sm text-primary-600 font-medium">
              {filteredFlights.length} flights found
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="h-4 w-4 text-gray-600" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Flight Results */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFlights.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  {/* Flight Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {flight.airline}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {flight.flightNumber} • {flight.aircraft}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{flight.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {flight.departure.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.departure.airport}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.departure.city}
                        </div>
                      </div>

                      <div className="flex-1 px-4">
                        <div className="relative">
                          <div className="border-t-2 border-dashed border-gray-300"></div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-100 p-2 rounded-full">
                            <FiNavigation className="h-4 w-4 text-primary-600" />
                          </div>
                        </div>
                        <div className="text-center mt-2">
                          <div className="text-sm font-medium text-gray-600">
                            {flight.duration}
                          </div>
                          <div className="text-xs text-gray-500">
                            {flight.stops}
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">
                          {flight.arrival.time}
                        </div>
                        <div className="text-sm text-gray-600">
                          {flight.arrival.airport}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.arrival.city}
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="flex items-center space-x-3 mt-4">
                      {flight.amenities.map((amenity) => {
                        const Icon = amenityIcons[amenity];
                        return Icon ? (
                          <div key={amenity} className="flex items-center space-x-1 text-xs text-gray-600">
                            <Icon className="h-3 w-3" />
                            <span className="capitalize">{amenity}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  {/* Class and Price */}
                  <div className="text-center lg:text-left">
                    <div className="inline-flex px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-2">
                      {flight.class}
                    </div>
                    {flight.discount > 0 && (
                      <div className="text-sm text-gray-500 line-through mb-1">
                        ${flight.originalPrice}
                      </div>
                    )}
                    <div className="text-3xl font-bold text-gray-800 mb-1">
                      ${flight.price}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                    {flight.discount > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {flight.discount}%
                      </div>
                    )}
                  </div>

                  {/* Book Button */}
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary w-full lg:w-auto px-8 py-3"
                      onClick={() => {
                        window.showToast?.({
                          message: `Flight ${flight.flightNumber} selected! Redirecting to booking...`,
                          type: 'success'
                        });
                        setTimeout(() => onClose(), 1500);
                      }}
                    >
                      Select Flight
                    </motion.button>
                    <div className="text-xs text-gray-500 mt-2">
                      Free cancellation within 24h
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-12">
            <FiNavigation className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No flights found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FlightResults;