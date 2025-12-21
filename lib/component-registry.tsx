"use client";

import { ComponentDefinition } from "@/types/widget";
import { MetricsCard } from "@/components/widgets/financial/MetricsCard";
import { PortfolioAreaChart } from "@/components/widgets/financial/PortfolioAreaChart";
import { StockBarChart } from "@/components/widgets/financial/StockBarChart";
import { AllocationDonutChart } from "@/components/widgets/financial/AllocationDonutChart";
import { StockDataTable } from "@/components/widgets/financial/StockDataTable";
import { DashboardHeader } from "@/components/widgets/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/widgets/layout/DashboardSidebar";
import { TextBlock } from "@/components/widgets/ui/TextBlock";
import { ButtonWidget } from "@/components/widgets/ui/ButtonWidget";
import { CardWidget } from "@/components/widgets/ui/CardWidget";

export const componentDefinitions: ComponentDefinition[] = [
  // Layout Components
  {
    type: "header",
    name: "Header",
    category: "layout",
    icon: "LayoutDashboard",
    defaultSize: { width: 800, height: 60 },
    defaultProps: {
      title: "Portfolio Dashboard",
      showSearch: true,
      showNotifications: true,
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Portfolio Dashboard" },
      { name: "showSearch", type: "boolean", label: "Show Search", defaultValue: true },
      { name: "showNotifications", type: "boolean", label: "Show Notifications", defaultValue: true },
    ],
  },
  {
    type: "sidebar",
    name: "Sidebar",
    category: "layout",
    icon: "PanelLeft",
    defaultSize: { width: 200, height: 400 },
    defaultProps: {
      title: "Menu",
      items: ["Dashboard", "Portfolio", "Watchlist", "Transactions", "Settings"],
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Menu" },
    ],
  },

  // Metrics Components
  {
    type: "metrics-card",
    name: "Metrics Card",
    category: "metrics",
    icon: "TrendingUp",
    defaultSize: { width: 280, height: 120 },
    defaultProps: {
      title: "Total Value",
      value: "$119,237.10",
      change: "+2.45%",
      changeType: "positive",
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Total Value" },
      { name: "value", type: "text", label: "Value", defaultValue: "$119,237.10" },
      { name: "change", type: "text", label: "Change", defaultValue: "+2.45%" },
      {
        name: "changeType",
        type: "select",
        label: "Change Type",
        defaultValue: "positive",
        options: [
          { label: "Positive", value: "positive" },
          { label: "Negative", value: "negative" },
          { label: "Neutral", value: "neutral" },
        ],
      },
    ],
  },

  // Chart Components
  {
    type: "area-chart",
    name: "Area Chart",
    category: "charts",
    icon: "AreaChart",
    defaultSize: { width: 500, height: 300 },
    defaultProps: {
      title: "Portfolio Growth",
      showLegend: true,
      showGrid: true,
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Portfolio Growth" },
      { name: "showLegend", type: "boolean", label: "Show Legend", defaultValue: true },
      { name: "showGrid", type: "boolean", label: "Show Grid", defaultValue: true },
    ],
  },
  {
    type: "bar-chart",
    name: "Bar Chart",
    category: "charts",
    icon: "BarChart3",
    defaultSize: { width: 500, height: 300 },
    defaultProps: {
      title: "Stock Performance",
      showLegend: true,
      orientation: "horizontal",
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Stock Performance" },
      { name: "showLegend", type: "boolean", label: "Show Legend", defaultValue: true },
      {
        name: "orientation",
        type: "select",
        label: "Orientation",
        defaultValue: "horizontal",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
      },
    ],
  },
  {
    type: "donut-chart",
    name: "Donut Chart",
    category: "charts",
    icon: "PieChart",
    defaultSize: { width: 350, height: 300 },
    defaultProps: {
      title: "Asset Allocation",
      showLegend: true,
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Asset Allocation" },
      { name: "showLegend", type: "boolean", label: "Show Legend", defaultValue: true },
    ],
  },

  // Table Components
  {
    type: "data-table",
    name: "Data Table",
    category: "tables",
    icon: "Table",
    defaultSize: { width: 700, height: 350 },
    defaultProps: {
      title: "Stock Holdings",
      showPagination: true,
      pageSize: 5,
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Stock Holdings" },
      { name: "showPagination", type: "boolean", label: "Show Pagination", defaultValue: true },
      { name: "pageSize", type: "number", label: "Page Size", defaultValue: 5 },
    ],
  },

  // UI Components
  {
    type: "text-block",
    name: "Text Block",
    category: "ui",
    icon: "Type",
    defaultSize: { width: 300, height: 100 },
    defaultProps: {
      text: "Enter your text here",
      variant: "body",
      align: "left",
    },
    editableProps: [
      { name: "text", type: "text", label: "Text", defaultValue: "Enter your text here" },
      {
        name: "variant",
        type: "select",
        label: "Variant",
        defaultValue: "body",
        options: [
          { label: "Heading 1", value: "h1" },
          { label: "Heading 2", value: "h2" },
          { label: "Heading 3", value: "h3" },
          { label: "Body", value: "body" },
          { label: "Caption", value: "caption" },
        ],
      },
      {
        name: "align",
        type: "select",
        label: "Alignment",
        defaultValue: "left",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" },
        ],
      },
    ],
  },
  {
    type: "button",
    name: "Button",
    category: "ui",
    icon: "Square",
    defaultSize: { width: 120, height: 40 },
    defaultProps: {
      label: "Click me",
      variant: "default",
      size: "default",
    },
    editableProps: [
      { name: "label", type: "text", label: "Label", defaultValue: "Click me" },
      {
        name: "variant",
        type: "select",
        label: "Variant",
        defaultValue: "default",
        options: [
          { label: "Default", value: "default" },
          { label: "Secondary", value: "secondary" },
          { label: "Outline", value: "outline" },
          { label: "Ghost", value: "ghost" },
          { label: "Destructive", value: "destructive" },
        ],
      },
      {
        name: "size",
        type: "select",
        label: "Size",
        defaultValue: "default",
        options: [
          { label: "Small", value: "sm" },
          { label: "Default", value: "default" },
          { label: "Large", value: "lg" },
        ],
      },
    ],
  },
  {
    type: "card",
    name: "Card",
    category: "ui",
    icon: "CreditCard",
    defaultSize: { width: 300, height: 200 },
    defaultProps: {
      title: "Card Title",
      description: "Card description goes here",
      showFooter: false,
    },
    editableProps: [
      { name: "title", type: "text", label: "Title", defaultValue: "Card Title" },
      { name: "description", type: "text", label: "Description", defaultValue: "Card description goes here" },
      { name: "showFooter", type: "boolean", label: "Show Footer", defaultValue: false },
    ],
  },
];

// Component renderer mapping
export const componentRenderers: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "header": DashboardHeader as React.ComponentType<Record<string, unknown>>,
  "sidebar": DashboardSidebar as React.ComponentType<Record<string, unknown>>,
  "metrics-card": MetricsCard as React.ComponentType<Record<string, unknown>>,
  "area-chart": PortfolioAreaChart as React.ComponentType<Record<string, unknown>>,
  "bar-chart": StockBarChart as React.ComponentType<Record<string, unknown>>,
  "donut-chart": AllocationDonutChart as React.ComponentType<Record<string, unknown>>,
  "data-table": StockDataTable as React.ComponentType<Record<string, unknown>>,
  "text-block": TextBlock as React.ComponentType<Record<string, unknown>>,
  "button": ButtonWidget as React.ComponentType<Record<string, unknown>>,
  "card": CardWidget as React.ComponentType<Record<string, unknown>>,
};

export function getComponentDefinition(type: string): ComponentDefinition | undefined {
  return componentDefinitions.find((c) => c.type === type);
}

export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentDefinitions.filter((c) => c.category === category);
}

export const categories = [
  { id: "layout", name: "Layout", icon: "Layout" },
  { id: "metrics", name: "Metrics", icon: "TrendingUp" },
  { id: "charts", name: "Charts", icon: "BarChart3" },
  { id: "tables", name: "Tables", icon: "Table" },
  { id: "ui", name: "UI", icon: "Component" },
];
