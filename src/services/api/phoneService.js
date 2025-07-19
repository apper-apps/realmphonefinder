import phoneData from "@/services/mockData/phones.json";

// Add realistic delay for better UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const phoneService = {
  async getAll() {
    await delay(300);
    return [...phoneData];
  },

  async getById(id) {
    await delay(200);
    const phone = phoneData.find(p => p.Id === parseInt(id));
    if (!phone) {
      throw new Error(`Phone with Id ${id} not found`);
    }
    return { ...phone };
  },

  async filterPhones(filters) {
    await delay(250);
    let filteredPhones = [...phoneData];

    // Budget filter
    if (filters.minPrice !== null && filters.minPrice >= 0) {
      filteredPhones = filteredPhones.filter(phone => phone.price >= filters.minPrice);
    }
    
    if (filters.maxPrice !== null && filters.maxPrice > 0) {
      filteredPhones = filteredPhones.filter(phone => phone.price <= filters.maxPrice);
    }

    // Brand filter
    if (filters.selectedBrand && filters.selectedBrand !== "all") {
      filteredPhones = filteredPhones.filter(phone => 
        phone.brand.toLowerCase() === filters.selectedBrand.toLowerCase()
      );
    }

    // RAM filter
    if (filters.selectedRam && filters.selectedRam !== "all") {
      filteredPhones = filteredPhones.filter(phone => 
        phone.ram.toLowerCase().includes(filters.selectedRam.toLowerCase())
      );
    }

    // Battery filter (5000mAh+)
    if (filters.batteryAbove5000) {
      filteredPhones = filteredPhones.filter(phone => {
        const batteryCapacity = parseInt(phone.battery.replace("mAh", ""));
        return batteryCapacity >= 5000;
      });
    }

    // Sort by price
    if (filters.sortBy === "price-low-high") {
      filteredPhones.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high-low") {
      filteredPhones.sort((a, b) => b.price - a.price);
    }

    return filteredPhones;
  },

  async getBestPicks(maxPrice = 50000) {
    await delay(200);
    const bestPicks = phoneData
      .filter(phone => phone.price <= maxPrice)
      .sort((a, b) => {
        // Sort by value proposition (higher RAM/better specs for lower price)
        const aValue = (parseInt(a.ram) * 1000) / a.price;
        const bValue = (parseInt(b.ram) * 1000) / b.price;
        return bValue - aValue;
      })
      .slice(0, 6);

    return bestPicks;
  },

  getAvailableBrands() {
    const brands = [...new Set(phoneData.map(phone => phone.brand))];
    return brands.sort();
  },

  getAvailableRamSizes() {
    const ramSizes = [...new Set(phoneData.map(phone => phone.ram))];
    return ramSizes.sort((a, b) => parseInt(a) - parseInt(b));
  },

  getPriceRange() {
    const prices = phoneData.map(phone => phone.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }
};