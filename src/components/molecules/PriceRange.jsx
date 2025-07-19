import React from "react";
import Input from "@/components/atoms/Input";

const PriceRange = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange,
  priceRange = { min: 0, max: 300000 }
}) => {
  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 font-display">
        Budget Range
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          label="Min Price (Rs.)"
          placeholder="0"
          value={minPrice || ""}
          onChange={(e) => onMinPriceChange(e.target.value ? parseInt(e.target.value) : null)}
          min={priceRange.min}
          max={priceRange.max}
          icon="DollarSign"
        />
        
        <Input
          type="number"
          label="Max Price (Rs.)"
          placeholder="300000"
          value={maxPrice || ""}
          onChange={(e) => onMaxPriceChange(e.target.value ? parseInt(e.target.value) : null)}
          min={priceRange.min}
          max={priceRange.max}
          icon="DollarSign"
        />
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <div>Range: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}</div>
        {(minPrice || maxPrice) && (
          <div className="font-medium text-primary">
            Selected: {formatPrice(minPrice || priceRange.min)} - {formatPrice(maxPrice || priceRange.max)}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceRange;