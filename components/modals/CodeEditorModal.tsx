"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Widget } from "@/types/widget";
import { getComponentDefinition } from "@/lib/component-registry";
import { useCanvasStore } from "@/lib/canvas-store";
import { Copy, Check } from "lucide-react";

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-muted">
      Loading editor...
    </div>
  ),
});

interface CodeEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widget: Widget | null;
}

export function CodeEditorModal({
  open,
  onOpenChange,
  widget,
}: CodeEditorModalProps) {
  const { updateWidgetCode } = useCanvasStore();
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (widget) {
      const generatedCode = generateComponentCode(widget);
      setCode(widget.code || generatedCode);
    }
  }, [widget]);

  const handleSave = () => {
    if (widget) {
      updateWidgetCode(widget.id, code);
    }
    onOpenChange(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!widget) return null;

  const definition = getComponentDefinition(widget.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Code Editor - {definition?.name || widget.type}
          </DialogTitle>
        </DialogHeader>

        <div className="monaco-container border rounded-md overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="typescript"
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
            }}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function generateComponentCode(widget: Widget): string {
  const definition = getComponentDefinition(widget.type);
  if (!definition) return `// Unknown component: ${widget.type}`;

  const propsString = Object.entries(widget.props)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `  ${key}="${value}"`;
      } else if (typeof value === "boolean") {
        return value ? `  ${key}` : `  ${key}={false}`;
      } else if (typeof value === "number") {
        return `  ${key}={${value}}`;
      } else if (Array.isArray(value)) {
        return `  ${key}={${JSON.stringify(value)}}`;
      }
      return `  ${key}={${JSON.stringify(value)}}`;
    })
    .join("\n");

  const componentName = definition.name.replace(/\s+/g, "");
  const importPath = getImportPath(widget.type);

  return `import { ${componentName} } from "${importPath}";

// Widget: ${widget.id}
// Position: (${Math.round(widget.position.x)}, ${Math.round(widget.position.y)})
// Size: ${Math.round(widget.size.width)} x ${Math.round(widget.size.height)}

export function MyComponent() {
  return (
    <${componentName}
${propsString}
    />
  );
}`;
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
