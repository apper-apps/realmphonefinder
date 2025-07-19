import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const PhoneCard = ({ 
  phone, 
  onCompareToggle, 
  isSelected = false,
  index = 0
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getBatteryColor = (battery) => {
    const capacity = parseInt(battery.replace("mAh", ""));
    if (capacity >= 5000) return "success";
    if (capacity >= 4000) return "warning";
    return "default";
  };

  const getRamColor = (ram) => {
    const ramSize = parseInt(ram.replace("GB", ""));
    if (ramSize >= 8) return "primary";
    if (ramSize >= 6) return "secondary";
    return "default";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="phone-card p-6 relative group"
    >
      {/* Compare Checkbox */}
      <div className="absolute top-4 right-4 z-10">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCompareToggle(phone.Id)}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? "bg-primary border-primary" 
              : "border-gray-300 hover:border-primary"
          }`}>
            {isSelected && (
              <ApperIcon name="Check" size={16} className="text-white" />
            )}
          </div>
        </label>
      </div>

      {/* Phone Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img 
          src={phone.image} 
          alt={`${phone.brand} ${phone.model}`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Brand */}
      <div className="text-sm font-medium text-gray-500 mb-1">
        {phone.brand}
      </div>

      {/* Model Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-3 font-display line-clamp-2">
        {phone.model}
      </h3>

      {/* Price */}
      <div className="price-highlight mb-4">
        {formatPrice(phone.price)}
      </div>

      {/* Specifications */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">RAM/Storage</span>
          <div className="flex items-center space-x-2">
            <Badge variant={getRamColor(phone.ram)} size="sm">
              {phone.ram}
            </Badge>
            <Badge variant="outline" size="sm">
              {phone.storage}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Battery</span>
          <Badge variant={getBatteryColor(phone.battery)} size="sm">
            <ApperIcon name="Battery" size={12} className="mr-1" />
            {phone.battery}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Camera</span>
          <span className="text-sm font-medium text-gray-900">
            {phone.camera}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full" 
          icon="Info"
        >
          View Details
        </Button>
        
        <Button 
          variant={isSelected ? "primary" : "ghost"} 
          className="w-full text-sm" 
          onClick={() => onCompareToggle(phone.Id)}
          icon={isSelected ? "Minus" : "Plus"}
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </Button>
      </div>

      {/* Usage Preference Tags */}
      {phone.usagePreference && phone.usagePreference.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1">
          {phone.usagePreference.slice(0, 2).map((usage) => (
            <Badge 
              key={usage} 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              {usage}
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default PhoneCard;