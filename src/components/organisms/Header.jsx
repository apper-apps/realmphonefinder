import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-primary via-accent to-primary py-8 mb-8"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <ApperIcon name="Smartphone" size={24} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-display">
              PhoneFinder PK
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-lg text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
            Find your perfect smartphone in Pakistan with intelligent filtering and real-time comparison
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-6 text-white text-opacity-90">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Smartphone" size={16} />
              <span className="text-sm">25+ Latest Models</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Filter" size={16} />
              <span className="text-sm">Smart Filtering</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="BarChart3" size={16} />
              <span className="text-sm">Compare Features</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="MapPin" size={16} />
              <span className="text-sm">Pakistan Prices</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;