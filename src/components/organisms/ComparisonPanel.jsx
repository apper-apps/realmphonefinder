import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";

const ComparisonPanel = ({ 
  selectedPhones = [], 
  phones = [], 
  onRemovePhone, 
  onClearAll,
  isVisible = false
}) => {
  const getSelectedPhoneData = () => {
    return phones.filter(phone => selectedPhones.includes(phone.Id));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const compareSpecs = () => {
    const phoneData = getSelectedPhoneData();
    if (phoneData.length < 2) return null;

    const specs = [
      { key: "price", label: "Price", format: formatPrice },
      { key: "ram", label: "RAM" },
      { key: "storage", label: "Storage" },
      { key: "battery", label: "Battery" },
      { key: "camera", label: "Camera" }
    ];

    return specs.map(spec => {
      const values = phoneData.map(phone => phone[spec.key]);
      const isNumeric = spec.key === "price";
      
      let bestIndex = -1;
      let worstIndex = -1;

      if (isNumeric) {
        const numericValues = values.map(v => typeof v === "number" ? v : parseInt(v));
        bestIndex = numericValues.indexOf(Math.min(...numericValues));
        worstIndex = numericValues.indexOf(Math.max(...numericValues));
      } else if (spec.key === "ram" || spec.key === "battery") {
        const numericValues = values.map(v => parseInt(v.toString().replace(/[^\d]/g, "")));
        bestIndex = numericValues.indexOf(Math.max(...numericValues));
        worstIndex = numericValues.indexOf(Math.min(...numericValues));
      }

      return {
        ...spec,
        values,
        bestIndex,
        worstIndex
      };
    });
  };

  const comparisonData = compareSpecs();
  const phoneData = getSelectedPhoneData();

  if (!isVisible || selectedPhones.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 bg-white shadow-floating border-t border-gray-200 z-50 max-h-96 overflow-auto"
      >
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 font-display gradient-text">
              Compare Phones ({selectedPhones.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                icon="X"
              >
                Clear All
              </Button>
            </div>
          </div>

          {phoneData.length === 1 && (
            <div className="text-center py-8 text-gray-600">
              <ApperIcon name="Plus" size={32} className="mx-auto mb-2 text-gray-400" />
              <p>Select another phone to start comparing</p>
            </div>
          )}

          {phoneData.length >= 2 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 font-medium text-gray-600">Specification</th>
                    {phoneData.map((phone) => (
                      <th key={phone.Id} className="text-center py-2 px-4 min-w-48">
                        <div className="space-y-2">
                          <img 
                            src={phone.image} 
                            alt={phone.model}
                            className="w-16 h-16 object-cover rounded-lg mx-auto"
                          />
                          <div>
                            <div className="text-xs text-gray-500">{phone.brand}</div>
                            <div className="font-semibold text-sm text-gray-900">{phone.model}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemovePhone(phone.Id)}
                            icon="X"
                            className="text-gray-400 hover:text-gray-600"
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData?.map((spec, index) => (
                    <tr key={spec.key} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-gray-700">
                        {spec.label}
                      </td>
                      {spec.values.map((value, phoneIndex) => {
                        const isBest = spec.bestIndex === phoneIndex;
                        const isWorst = spec.worstIndex === phoneIndex && phoneData.length > 2;
                        
                        return (
                          <td key={phoneIndex} className="py-3 px-4 text-center">
                            <div className={`inline-flex items-center justify-center px-2 py-1 rounded ${
                              isBest ? "bg-success bg-opacity-20 text-success font-semibold" :
                              isWorst ? "bg-error bg-opacity-20 text-error" :
                              "text-gray-900"
                            }`}>
                              {spec.format ? spec.format(value) : value}
                              {isBest && <ApperIcon name="Crown" size={14} className="ml-1" />}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonPanel;