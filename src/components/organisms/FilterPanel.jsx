import React from "react";
import { motion } from "framer-motion";
import PriceRange from "@/components/molecules/PriceRange";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FilterPanel = ({
  filters,
  onFiltersChange,
  availableBrands = [],
  availableRamSizes = [],
  priceRange = { min: 0, max: 300000 },
  onClearFilters,
  loading = false
}) => {
  const brandOptions = [
    { value: "all", label: "All Brands" },
    ...availableBrands.map(brand => ({ value: brand.toLowerCase(), label: brand }))
  ];

  const ramOptions = [
    { value: "all", label: "Any RAM" },
    ...availableRamSizes.map(ram => ({ value: ram.toLowerCase(), label: ram }))
  ];

  const sortOptions = [
    { value: "", label: "Default Sort" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return filters.minPrice || 
           filters.maxPrice || 
           (filters.selectedBrand && filters.selectedBrand !== "all") ||
           (filters.selectedRam && filters.selectedRam !== "all") ||
           filters.batteryAbove5000 ||
           filters.sortBy;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-card p-6 h-fit sticky top-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-display gradient-text">
          Filters
        </h2>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            icon="RotateCcw"
            className="text-gray-500"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <PriceRange
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => handleFilterChange("minPrice", value)}
          onMaxPriceChange={(value) => handleFilterChange("maxPrice", value)}
          priceRange={priceRange}
        />

        {/* Brand Selection */}
        <div>
          <Select
            label="Brand"
            options={brandOptions}
            value={filters.selectedBrand || "all"}
            onChange={(e) => handleFilterChange("selectedBrand", e.target.value)}
            icon="Smartphone"
          />
        </div>

        {/* RAM Filter */}
        <div>
          <Select
            label="RAM Size"
            options={ramOptions}
            value={filters.selectedRam || "all"}
            onChange={(e) => handleFilterChange("selectedRam", e.target.value)}
          />
        </div>

        {/* Battery Filter */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.batteryAbove5000 || false}
              onChange={(e) => handleFilterChange("batteryAbove5000", e.target.checked)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <div className="flex items-center space-x-2">
              <ApperIcon name="Battery" size={16} className="text-success" />
              <span className="text-sm font-medium text-gray-700">
                5000mAh+ Battery
              </span>
            </div>
          </label>
        </div>

        {/* Sort Options */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy || ""}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            icon="ArrowUpDown"
          />
        </div>

        {/* Filter Summary */}
        {hasActiveFilters() && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Active Filters:
            </h4>
            <div className="space-y-1 text-xs text-gray-600">
              {filters.minPrice && (
                <div>• Min Price: Rs. {filters.minPrice.toLocaleString()}</div>
              )}
              {filters.maxPrice && (
                <div>• Max Price: Rs. {filters.maxPrice.toLocaleString()}</div>
              )}
              {filters.selectedBrand && filters.selectedBrand !== "all" && (
                <div>• Brand: {filters.selectedBrand}</div>
              )}
              {filters.selectedRam && filters.selectedRam !== "all" && (
                <div>• RAM: {filters.selectedRam}</div>
              )}
              {filters.batteryAbove5000 && (
                <div>• Battery: 5000mAh+</div>
              )}
              {filters.sortBy && (
                <div>• Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterPanel;