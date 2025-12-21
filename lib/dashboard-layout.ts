import { Widget } from "@/types/widget";
import { generateId } from "./utils";

export function getDefaultDashboardLayout(): Widget[] {
  return [
    // Header
    {
      id: generateId(),
      type: "header",
      position: { x: 220, y: 20 },
      size: { width: 1000, height: 60 },
      props: {
        title: "Portfolio Dashboard",
        showSearch: true,
        showNotifications: true,
      },
    },
    // Sidebar
    {
      id: generateId(),
      type: "sidebar",
      position: { x: 20, y: 20 },
      size: { width: 180, height: 500 },
      props: {
        title: "Menu",
        items: ["Dashboard", "Portfolio", "Watchlist", "Transactions", "Settings"],
      },
    },
    // Metrics Row
    {
      id: generateId(),
      type: "metrics-card",
      position: { x: 220, y: 100 },
      size: { width: 240, height: 110 },
      props: {
        title: "Total Portfolio Value",
        value: "$119,237.10",
        change: "+2.45%",
        changeType: "positive",
      },
    },
    {
      id: generateId(),
      type: "metrics-card",
      position: { x: 480, y: 100 },
      size: { width: 240, height: 110 },
      props: {
        title: "Today's Gain/Loss",
        value: "+$1,234.56",
        change: "+1.05%",
        changeType: "positive",
      },
    },
    {
      id: generateId(),
      type: "metrics-card",
      position: { x: 740, y: 100 },
      size: { width: 240, height: 110 },
      props: {
        title: "Total Return",
        value: "+$24,892.34",
        change: "+26.4% all time",
        changeType: "positive",
      },
    },
    {
      id: generateId(),
      type: "metrics-card",
      position: { x: 1000, y: 100 },
      size: { width: 220, height: 110 },
      props: {
        title: "Dividend Income",
        value: "$3,456.78",
        change: "+$234.12 this month",
        changeType: "positive",
      },
    },
    // Charts Row
    {
      id: generateId(),
      type: "area-chart",
      position: { x: 220, y: 230 },
      size: { width: 500, height: 280 },
      props: {
        title: "Portfolio Growth",
        showLegend: true,
        showGrid: true,
      },
    },
    {
      id: generateId(),
      type: "donut-chart",
      position: { x: 740, y: 230 },
      size: { width: 300, height: 280 },
      props: {
        title: "Asset Allocation",
        showLegend: true,
      },
    },
    {
      id: generateId(),
      type: "bar-chart",
      position: { x: 1060, y: 230 },
      size: { width: 300, height: 280 },
      props: {
        title: "Stock Performance",
        showLegend: true,
        orientation: "horizontal",
      },
    },
    // Data Table
    {
      id: generateId(),
      type: "data-table",
      position: { x: 220, y: 530 },
      size: { width: 800, height: 320 },
      props: {
        title: "Stock Holdings",
        showPagination: true,
        pageSize: 5,
      },
    },
  ];
}
