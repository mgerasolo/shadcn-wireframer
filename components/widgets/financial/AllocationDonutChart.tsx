"use client";

import { Card, Title, DonutChart, Legend } from "@tremor/react";
import { allocationData } from "@/lib/sample-data";

interface AllocationDonutChartProps {
  title?: string;
  showLegend?: boolean;
}

export function AllocationDonutChart({
  title = "Asset Allocation",
  showLegend = true,
}: AllocationDonutChartProps) {
  return (
    <Card className="w-full h-full">
      <Title>{title}</Title>
      <DonutChart
        className="h-40 mt-4"
        data={allocationData}
        category="value"
        index="name"
        valueFormatter={(value) => `${value}%`}
        colors={["blue", "emerald", "amber", "rose", "violet"]}
        showAnimation={true}
      />
      {showLegend && (
        <Legend
          className="mt-3"
          categories={allocationData.map((d) => d.name)}
          colors={["blue", "emerald", "amber", "rose", "violet"]}
        />
      )}
    </Card>
  );
}
