import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  className = "", 
  message = "Something went wrong", 
  onRetry = null,
  type = "default"
}) => {
  const getErrorContent = () => {
    switch (type) {
      case "phones":
        return {
          icon: "Smartphone",
          title: "Failed to load phones",
          description: "We couldn't load the phone recommendations. Please check your connection and try again."
        };
      case "filters":
        return {
          icon: "Filter",
          title: "Filter error",
          description: "Unable to apply filters. Please refresh and try again."
        };
      case "comparison":
        return {
          icon: "BarChart3",
          title: "Comparison failed",
          description: "We couldn't load the phone comparison. Please try again."
        };
      default:
        return {
          icon: "AlertCircle",
          title: "Something went wrong",
          description: message
        };
    }
  };

  const { icon, title, description } = getErrorContent();

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-card",
      className
    )}>
      <div className="w-16 h-16 bg-gradient-to-br from-error to-red-400 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={32} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center space-x-2 hover-scale"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </button>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        If the problem persists, please refresh the page
      </div>
    </div>
  );
};

export default Error;