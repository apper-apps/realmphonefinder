import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-accent text-white",
    secondary: "bg-gradient-to-r from-secondary to-warning text-white",
    success: "bg-gradient-to-r from-success to-green-400 text-white",
    warning: "bg-gradient-to-r from-warning to-orange-400 text-white",
    error: "bg-gradient-to-r from-error to-red-400 text-white",
    outline: "border border-gray-300 text-gray-700 bg-white"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;