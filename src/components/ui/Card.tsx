"use client";

import { InfoIcon } from "@/components/icons";
import { toolTipDescriptions } from "@/lib/data-examples";
import { useState } from "react";

type CardProps = {
  icon?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  tooltipKey?: keyof typeof toolTipDescriptions;
  className?: string;
  staggerIndex?: number;
  highlight?: boolean;
};

export function Card({
  icon,
  title,
  value,
  tooltipKey,
  className = "",
  staggerIndex = 0,
  highlight = false,
}: CardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipText = tooltipKey ? toolTipDescriptions[tooltipKey] : "";

  return (
    <div
      className={`glassmorphism rounded-lg p-5 transition-all duration-300 ${
        highlight ? "card-glow ring-2 ring-primary" : ""
      } fade-in slide-up stagger-${staggerIndex} ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          {icon && <span className="text-primary">{icon}</span>}
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {tooltipKey && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Bilgi"
            >
              <InfoIcon className="w-4 h-4" />
            </button>
            {showTooltip && (
              <div className="absolute right-0 w-64 p-3 mt-2 z-50 text-sm rounded-md shadow-lg bg-popover text-popover-foreground border">
                {tooltipText}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="text-lg">{value}</div>
    </div>
  );
}
