"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import { portfolioGrowthData } from "@/lib/sample-data";

interface PortfolioAreaChartProps {
  title?: string;
  showLegend?: boolean;
  showGrid?: boolean;
}

export function PortfolioAreaChart({
  title = "Portfolio Growth",
  showLegend = true,
}: PortfolioAreaChartProps) {
  return (
    <Card className="w-full h-full">
      <Title>{title}</Title>
      <AreaChart
        className="h-48 mt-4"
        data={portfolioGrowthData}
        index="date"
        categories={["value"]}
        colors={["blue"]}
        valueFormatter={(value) =>
          `$${Intl.NumberFormat("us").format(value).toString()}`
        }
        showLegend={showLegend}
        showGridLines={true}
        showAnimation={true}
      />
    </Card>
  );
}
