import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterChip = ({ 
  label, 
  active = false, 
  onClick = () => {}, 
  onRemove = null,
  className = ""
}) => {
  return (
    <div
      className={cn(
        "filter-chip cursor-pointer",
        active ? "filter-chip-active" : "filter-chip-inactive",
        className
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {active && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-0.5"
        >
          <ApperIcon name="X" size={12} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;