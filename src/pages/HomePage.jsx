import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import FilterPanel from "@/components/organisms/FilterPanel";
import PhoneGrid from "@/components/organisms/PhoneGrid";
import ComparisonPanel from "@/components/organisms/ComparisonPanel";
import { usePhoneFilters } from "@/hooks/usePhoneFilters";

const HomePage = () => {
  const {
    phones,
    loading,
    error,
    filters,
    metadata,
    selectedPhones,
    updateFilters,
    clearFilters,
    togglePhoneComparison,
    clearComparison,
    removeFromComparison,
    retry
  } = usePhoneFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={updateFilters}
              availableBrands={metadata.availableBrands}
              availableRamSizes={metadata.availableRamSizes}
              priceRange={metadata.priceRange}
              onClearFilters={clearFilters}
              loading={loading}
            />
          </div>

          {/* Mobile Filters - Collapsible */}
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <FilterPanel
                filters={filters}
                onFiltersChange={updateFilters}
                availableBrands={metadata.availableBrands}
                availableRamSizes={metadata.availableRamSizes}
                priceRange={metadata.priceRange}
                onClearFilters={clearFilters}
                loading={loading}
              />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <PhoneGrid
              phones={phones}
              loading={loading}
              error={error}
              onRetry={retry}
              selectedPhones={selectedPhones}
              onCompareToggle={togglePhoneComparison}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

      {/* Floating Comparison Panel */}
      <ComparisonPanel
        selectedPhones={selectedPhones}
        phones={phones}
        onRemovePhone={removeFromComparison}
        onClearAll={clearComparison}
        isVisible={selectedPhones.length > 0}
      />

      {/* Floating Compare Button - Mobile */}
      {selectedPhones.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-6 right-6 lg:hidden z-40"
        >
          <button
            className="w-14 h-14 bg-gradient-to-r from-secondary to-warning text-white rounded-full shadow-floating flex items-center justify-center animate-pulse-slow"
            onClick={() => {
              // Scroll to comparison panel
              const comparisonPanel = document.querySelector('[data-comparison-panel]');
              if (comparisonPanel) {
                comparisonPanel.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="text-sm font-bold">{selectedPhones.length}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;