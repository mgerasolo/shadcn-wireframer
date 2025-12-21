"use client";

import { Card, Text, Metric, Flex, BadgeDelta } from "@tremor/react";

interface MetricsCardProps {
  title?: string;
  value?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export function MetricsCard({
  title = "Total Value",
  value = "$119,237.10",
  change = "+2.45%",
  changeType = "positive",
}: MetricsCardProps) {
  const deltaType =
    changeType === "positive"
      ? "increase"
      : changeType === "negative"
      ? "decrease"
      : "unchanged";

  return (
    <Card className="w-full h-full">
      <Flex alignItems="start">
        <div>
          <Text>{title}</Text>
          <Metric>{value}</Metric>
        </div>
        <BadgeDelta deltaType={deltaType}>{change}</BadgeDelta>
      </Flex>
    </Card>
  );
}
