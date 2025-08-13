import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({ 
  message, 
  type = 'success', 
  duration = 4000, 
  onClose,
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: FiCheck,
    error: FiX,
    warning: FiAlertCircle,
    info: FiInfo
  };

  const colors = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    warning: 'bg-yellow-500 border-yellow-600',
    info: 'bg-blue-500 border-blue-600'
  };

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed ${positions[position]} z-50 max-w-sm`}
        >
          <div className={`${colors[type]} text-white px-6 py-4 rounded-lg shadow-2xl border-l-4 backdrop-blur-sm`}>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="flex-shrink-0 hover:bg-white/20 p-1 rounded transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Manager Component
export const ToastManager = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Expose addToast globally
  React.useEffect(() => {
    window.showToast = addToast;
    return () => {
      delete window.showToast;
    };
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

export default Toast;