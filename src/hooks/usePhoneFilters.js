import { useState, useEffect, useCallback } from "react";
import { phoneService } from "@/services/api/phoneService";
import { toast } from "react-toastify";
import FilterChip from "@/components/molecules/FilterChip";

export const usePhoneFilters = () => {
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhones, setSelectedPhones] = useState([]);
  
const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
    selectedBrand: "all",
    selectedRam: "all",
    batteryAbove5000: false,
    sortBy: "",
    usagePreferences: []
  });

  const [metadata, setMetadata] = useState({
    availableBrands: [],
    availableRamSizes: [],
    priceRange: { min: 0, max: 300000 }
  });

  // Load initial data
  const loadPhones = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const phoneData = await phoneService.getAll();
      const brands = phoneService.getAvailableBrands();
      const ramSizes = phoneService.getAvailableRamSizes();
      const priceRange = phoneService.getPriceRange();
      
      setPhones(phoneData);
      setFilteredPhones(phoneData);
      setMetadata({
        availableBrands: brands,
        availableRamSizes: ramSizes,
        priceRange
      });
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load phones. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters
  const applyFilters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filtered = await phoneService.filterPhones(filters);
      setFilteredPhones(filtered);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to apply filters. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []);

  // Clear all filters
const clearFilters = useCallback(() => {
    setFilters({
      minPrice: null,
      maxPrice: null,
      selectedBrand: "all",
      selectedRam: "all",
      batteryAbove5000: false,
      sortBy: "",
      usagePreferences: []
    });
    toast.success("Filters cleared");
  }, []);

  // Compare phone management
  const togglePhoneComparison = useCallback((phoneId) => {
    setSelectedPhones(prev => {
      const isSelected = prev.includes(phoneId);
      let newSelection;
      
      if (isSelected) {
        newSelection = prev.filter(id => id !== phoneId);
        toast.info("Phone removed from comparison");
      } else {
        if (prev.length >= 4) {
          toast.warning("You can compare up to 4 phones at once");
          return prev;
        }
        newSelection = [...prev, phoneId];
        toast.success("Phone added to comparison");
      }
      
      return newSelection;
    });
  }, []);

  const clearComparison = useCallback(() => {
    setSelectedPhones([]);
    toast.info("Comparison cleared");
  }, []);

  const removeFromComparison = useCallback((phoneId) => {
    setSelectedPhones(prev => prev.filter(id => id !== phoneId));
    toast.info("Phone removed from comparison");
  }, []);

  // Load phones on mount
  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  // Apply filters when they change
  useEffect(() => {
    if (phones.length > 0) {
      applyFilters();
    }
  }, [filters, phones.length, applyFilters]);

  return {
    // Data
    phones: filteredPhones,
    loading,
    error,
    filters,
    metadata,
    selectedPhones,
    
    // Actions
    updateFilters,
    clearFilters,
    togglePhoneComparison,
    clearComparison,
    removeFromComparison,
    retry: loadPhones
  };
};