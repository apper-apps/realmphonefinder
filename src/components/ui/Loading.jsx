import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className = "", type = "phones" }) => {
  if (type === "phones") {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-card p-6">
            {/* Image skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded-lg shimmer mb-4"></div>
            
            {/* Brand and model skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
              <div className="h-6 bg-gray-200 rounded shimmer w-32"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="h-8 bg-gray-200 rounded shimmer w-24 mb-4"></div>
            
            {/* Specs skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded shimmer w-full"></div>
              <div className="h-3 bg-gray-200 rounded shimmer w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded shimmer w-5/6"></div>
            </div>
            
            {/* Button skeleton */}
            <div className="h-10 bg-gray-200 rounded-lg shimmer w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "filters") {
    return (
      <div className={cn("bg-white rounded-lg shadow-card p-6", className)}>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded shimmer w-20"></div>
              <div className="h-10 bg-gray-200 rounded-lg shimmer w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default loading for other components
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-accent rounded-full animate-bounce animation-delay-100"></div>
        <div className="w-3 h-3 bg-secondary rounded-full animate-bounce animation-delay-200"></div>
      </div>
    </div>
  );
};

export default Loading;