import {
  StockHolding,
  PortfolioMetric,
  ChartDataPoint,
  AllocationData,
  PerformanceData,
} from "@/types/financial-data";

export const stockHoldings: StockHolding[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 150,
    price: 185.92,
    change: 2.34,
    changePercent: 1.27,
    value: 27888.0,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 50,
    price: 141.8,
    change: -1.2,
    changePercent: -0.84,
    value: 7090.0,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    shares: 100,
    price: 378.91,
    change: 4.56,
    changePercent: 1.22,
    value: 37891.0,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 75,
    price: 155.34,
    change: 1.89,
    changePercent: 1.23,
    value: 11650.5,
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    shares: 40,
    price: 495.22,
    change: 12.45,
    changePercent: 2.58,
    value: 19808.8,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 60,
    price: 248.48,
    change: -5.32,
    changePercent: -2.1,
    value: 14908.8,
  },
];

export const portfolioMetrics: PortfolioMetric[] = [
  {
    title: "Total Portfolio Value",
    value: "$119,237.10",
    change: "+$2,847.23 (2.45%)",
    changeType: "positive",
  },
  {
    title: "Today's Gain/Loss",
    value: "+$1,234.56",
    change: "+1.05%",
    changeType: "positive",
  },
  {
    title: "Total Return",
    value: "+$24,892.34",
    change: "+26.4% all time",
    changeType: "positive",
  },
  {
    title: "Dividend Income",
    value: "$3,456.78",
    change: "+$234.12 this month",
    changeType: "positive",
  },
];

export const portfolioGrowthData: ChartDataPoint[] = [
  { date: "Jan", value: 85000 },
  { date: "Feb", value: 88500 },
  { date: "Mar", value: 92000 },
  { date: "Apr", value: 89500 },
  { date: "May", value: 95000 },
  { date: "Jun", value: 98500 },
  { date: "Jul", value: 102000 },
  { date: "Aug", value: 99500 },
  { date: "Sep", value: 105000 },
  { date: "Oct", value: 110000 },
  { date: "Nov", value: 115000 },
  { date: "Dec", value: 119237 },
];

export const stockPerformanceData: PerformanceData[] = [
  { name: "AAPL", value: 27.5 },
  { name: "MSFT", value: 22.3 },
  { name: "NVDA", value: 45.2 },
  { name: "GOOGL", value: 12.8 },
  { name: "AMZN", value: 18.6 },
  { name: "TSLA", value: -8.4 },
];

export const allocationData: AllocationData[] = [
  { name: "Technology", value: 45, color: "blue" },
  { name: "Healthcare", value: 20, color: "emerald" },
  { name: "Finance", value: 15, color: "amber" },
  { name: "Consumer", value: 12, color: "rose" },
  { name: "Energy", value: 8, color: "violet" },
];
