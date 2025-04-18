"use client";

import { Card } from "@/components/ui/Card";

type DataGridProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataGrid({ children, className = "" }: DataGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

type DataItemProps = {
  icon?: React.ReactNode;
  title: string;
  value: React.ReactNode;
  tooltipKey?: string;
  staggerIndex?: number;
  highlight?: boolean;
};

export function DataItem({
  icon,
  title,
  value,
  tooltipKey,
  staggerIndex,
  highlight,
}: DataItemProps) {
  return (
    <Card
      icon={icon}
      title={title}
      value={value}
      tooltipKey={tooltipKey as any}
      staggerIndex={staggerIndex}
      highlight={highlight}
    />
  );
}
