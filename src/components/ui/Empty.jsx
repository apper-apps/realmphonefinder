import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  className = "", 
  type = "phones",
  onAction = null,
  actionText = "Clear Filters"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "phones":
        return {
          icon: "Search",
          title: "No phones found",
          description: "We couldn't find any phones matching your criteria. Try adjusting your filters to see more options.",
          actionIcon: "RotateCcw"
        };
      case "comparison":
        return {
          icon: "BarChart3",
          title: "No phones selected",
          description: "Select phones using the compare checkbox to see a detailed comparison.",
          actionText: "Browse Phones",
          actionIcon: "Smartphone"
        };
      case "search":
        return {
          icon: "SearchX",
          title: "No results found",
          description: "Try searching with different keywords or browse our phone categories.",
          actionText: "Clear Search",
          actionIcon: "X"
        };
      default:
        return {
          icon: "Package",
          title: "Nothing here yet",
          description: "There's nothing to display at the moment.",
          actionIcon: "Plus"
        };
    }
  };

  const { icon, title, description, actionIcon } = getEmptyContent();

  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center bg-white rounded-lg shadow-card",
      className
    )}>
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={36} className="text-gray-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display gradient-text">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="btn-secondary flex items-center space-x-2 hover-scale"
        >
          <ApperIcon name={actionIcon} size={16} />
          <span>{actionText}</span>
        </button>
      )}
      
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          💡 Tip: Try different price ranges
        </span>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
          📱 Browse all brands
        </span>
      </div>
    </div>
  );
};

export default Empty;