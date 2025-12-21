"use client";

import { Card, Title, BarChart } from "@tremor/react";
import { stockPerformanceData } from "@/lib/sample-data";

interface StockBarChartProps {
  title?: string;
  showLegend?: boolean;
  orientation?: "horizontal" | "vertical";
}

export function StockBarChart({
  title = "Stock Performance",
  showLegend = true,
}: StockBarChartProps) {
  return (
    <Card className="w-full h-full">
      <Title>{title}</Title>
      <BarChart
        className="h-48 mt-4"
        data={stockPerformanceData}
        index="name"
        categories={["value"]}
        colors={["blue"]}
        valueFormatter={(value) => `${value}%`}
        showLegend={showLegend}
        showAnimation={true}
      />
    </Card>
  );
}
