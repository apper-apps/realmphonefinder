import React from "react";
import { motion } from "framer-motion";
import PhoneCard from "@/components/molecules/PhoneCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PhoneGrid = ({ 
  phones = [], 
  loading = false, 
  error = null, 
  onRetry = null,
  selectedPhones = [],
  onCompareToggle,
  onClearFilters
}) => {
  if (loading) {
    return <Loading type="phones" />;
  }

  if (error) {
    return (
      <Error 
        type="phones" 
        message={error} 
        onRetry={onRetry}
      />
    );
  }

  if (!phones || phones.length === 0) {
    return (
      <Empty 
        type="phones" 
        onAction={onClearFilters}
        actionText="Clear Filters"
      />
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-display">
          <span className="gradient-text">{phones.length}</span> Phone{phones.length !== 1 ? "s" : ""} Found
        </h2>
        
        {selectedPhones.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{selectedPhones.length} selected for comparison</span>
          </div>
        )}
      </div>

      {/* Phone Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {phones.map((phone, index) => (
          <PhoneCard
            key={phone.Id}
            phone={phone}
            index={index}
            isSelected={selectedPhones.includes(phone.Id)}
            onCompareToggle={onCompareToggle}
          />
        ))}
      </motion.div>

      {/* Load More / Pagination could go here */}
      {phones.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Showing {phones.length} result{phones.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneGrid;