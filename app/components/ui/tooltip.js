// src/components/ui/tooltip.js
import { useState } from "react";

export const TooltipProvider = ({ children }) => {
  return (
    <div className="tooltip-provider">
      {children}
    </div>
  );
};

export const TooltipTrigger = ({ children, tooltipText }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className="tooltip-trigger"
    >
      {children}
      {isVisible && (
        <div className="tooltip-content">
          {tooltipText}
        </div>
      )}
    </div>
  );
};
