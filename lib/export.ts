import { Widget } from "@/types/widget";
import { getComponentDefinition } from "./component-registry";

export function exportAsJSON(widgets: Widget[]): string {
  const exportData = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    widgets: widgets.map((widget) => ({
      id: widget.id,
      type: widget.type,
      position: widget.position,
      size: widget.size,
      props: widget.props,
    })),
  };

  return JSON.stringify(exportData, null, 2);
}

export function exportAsReactCode(widgets: Widget[]): string {
  const imports = new Set<string>();
  const componentCode: string[] = [];

  widgets.forEach((widget) => {
    const definition = getComponentDefinition(widget.type);
    if (!definition) return;

    const componentName = definition.name.replace(/\s+/g, "");
    const importPath = getImportPath(widget.type);

    imports.add(`import { ${componentName} } from "${importPath}";`);

    const propsString = Object.entries(widget.props)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`;
        } else if (typeof value === "boolean") {
          return value ? key : `${key}={false}`;
        } else if (typeof value === "number") {
          return `${key}={${value}}`;
        } else if (Array.isArray(value)) {
          return `${key}={${JSON.stringify(value)}}`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ");

    componentCode.push(`      {/* ${definition.name} */}
      <div
        style={{
          position: "absolute",
          left: ${Math.round(widget.position.x)},
          top: ${Math.round(widget.position.y)},
          width: ${Math.round(widget.size.width)},
          height: ${Math.round(widget.size.height)},
        }}
      >
        <${componentName} ${propsString} />
      </div>`);
  });

  return `"use client";

import React from "react";
${Array.from(imports).join("\n")}

export function GeneratedLayout() {
  return (
    <div className="relative w-full min-h-screen">
${componentCode.join("\n\n")}
    </div>
  );
}
`;
}

function getImportPath(type: string): string {
  const pathMap: Record<string, string> = {
    "header": "@/components/widgets/layout/DashboardHeader",
    "sidebar": "@/components/widgets/layout/DashboardSidebar",
    "metrics-card": "@/components/widgets/financial/MetricsCard",
    "area-chart": "@/components/widgets/financial/PortfolioAreaChart",
    "bar-chart": "@/components/widgets/financial/StockBarChart",
    "donut-chart": "@/components/widgets/financial/AllocationDonutChart",
    "data-table": "@/components/widgets/financial/StockDataTable",
    "text-block": "@/components/widgets/ui/TextBlock",
    "button": "@/components/widgets/ui/ButtonWidget",
    "card": "@/components/widgets/ui/CardWidget",
  };

  return pathMap[type] || "@/components/widgets";
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
