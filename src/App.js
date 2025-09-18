import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FlightSearch from './components/FlightSearch';
import Destinations from './components/Destinations';
import About from './components/About';
import SpecialOffers from './components/SpecialOffers';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundElements from './components/BackgroundElements';
import ScrollProgress from './components/ScrollProgress';
import WelcomeOverlay from './components/WelcomeOverlay';
import { ToastManager } from './components/Toast';

function App() {
  return (
    <Router basename="/skyfly-airline-booking">
      <div className="App relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-x-hidden">
        <WelcomeOverlay />
        <ScrollProgress />
        <BackgroundElements />
        <Navbar />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <FlightSearch />
                <Destinations />
                <About />
                <SpecialOffers />
                <Testimonials />
                <Contact />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
        
        <Footer />
        <ToastManager />
      </div>
    </Router>
  );
}

export default App;