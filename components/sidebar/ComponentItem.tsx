"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { ComponentDefinition } from "@/types/widget";
import {
  LayoutDashboard,
  PanelLeft,
  TrendingUp,
  AreaChart,
  BarChart3,
  PieChart,
  Table,
  Type,
  Square,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  PanelLeft,
  TrendingUp,
  AreaChart,
  BarChart3,
  PieChart,
  Table,
  Type,
  Square,
  CreditCard,
};

interface ComponentItemProps {
  component: ComponentDefinition;
}

export function ComponentItem({ component }: ComponentItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `component-${component.type}`,
    data: {
      type: component.type,
      component,
    },
  });

  const Icon = iconMap[component.icon] || Square;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "component-item flex items-center gap-3 p-3 rounded-md border cursor-grab transition-colors",
        isDragging && "opacity-50 cursor-grabbing"
      )}
    >
      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-muted rounded">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{component.name}</div>
        <div className="text-xs text-muted-foreground">
          {component.defaultSize.width} x {component.defaultSize.height}
        </div>
      </div>
    </div>
  );
}
