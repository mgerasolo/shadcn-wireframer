export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  price: number;
  change: number;
  changePercent: number;
  value: number;
}

export interface PortfolioMetric {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: string | number;
}

export interface AllocationData {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceData {
  name: string;
  value: number;
}
