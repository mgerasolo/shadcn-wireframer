"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { Canvas } from "@/components/canvas/Canvas";
import { ComponentLibrary } from "@/components/sidebar/ComponentLibrary";
import { PropertyPanel } from "@/components/properties/PropertyPanel";
import { CodeEditorModal } from "@/components/modals/CodeEditorModal";
import { Button } from "@/components/ui/button";
import { useCanvasStore } from "@/lib/canvas-store";
import { getDefaultDashboardLayout } from "@/lib/dashboard-layout";
import { exportAsJSON, exportAsReactCode, copyToClipboard } from "@/lib/export";
import { Widget } from "@/types/widget";
import {
  LayoutTemplate,
  Download,
  Code2,
  Trash2,
  FileJson,
  Check,
} from "lucide-react";

export default function Home() {
  const { widgets, loadWidgets, clearCanvas } = useCanvasStore();
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [selectedWidgetForCode, setSelectedWidgetForCode] = useState<Widget | null>(null);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleOpenCodeEditor = (widget: Widget) => {
    setSelectedWidgetForCode(widget);
    setCodeModalOpen(true);
  };

  const handleLoadDashboard = () => {
    const layout = getDefaultDashboardLayout();
    loadWidgets(layout);
  };

  const handleExportJSON = async () => {
    const json = exportAsJSON(widgets);
    const success = await copyToClipboard(json);
    if (success) {
      showExportMessage("JSON copied to clipboard!");
    }
  };

  const handleExportCode = async () => {
    const code = exportAsReactCode(widgets);
    const success = await copyToClipboard(code);
    if (success) {
      showExportMessage("React code copied to clipboard!");
    }
  };

  const handleDownloadJSON = () => {
    const json = exportAsJSON(widgets);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wireframe-layout.json";
    a.click();
    URL.revokeObjectURL(url);
    showExportMessage("JSON file downloaded!");
  };

  const showExportMessage = (message: string) => {
    setExportMessage(message);
    setTimeout(() => setExportMessage(null), 2000);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="h-14 border-b bg-background flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-lg">ShadCN Wireframer</h1>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
            v1.0
          </span>
        </div>

        <div className="flex items-center gap-2">
          {exportMessage && (
            <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-md">
              <Check className="h-4 w-4" />
              {exportMessage}
            </div>
          )}

          <Button variant="outline" size="sm" onClick={handleLoadDashboard}>
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Load Dashboard
          </Button>

          <Button variant="outline" size="sm" onClick={clearCanvas}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>

          <div className="w-px h-6 bg-border mx-1" />

          <Button variant="outline" size="sm" onClick={handleExportJSON}>
            <FileJson className="h-4 w-4 mr-2" />
            Copy JSON
          </Button>

          <Button variant="outline" size="sm" onClick={handleExportCode}>
            <Code2 className="h-4 w-4 mr-2" />
            Copy Code
          </Button>

          <Button variant="outline" size="sm" onClick={handleDownloadJSON}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library */}
        <div className="w-64 flex-shrink-0">
          <DndContext>
            <ComponentLibrary />
          </DndContext>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-hidden">
          <Canvas onOpenCodeEditor={handleOpenCodeEditor} />
        </div>

        {/* Right Sidebar - Property Panel */}
        <div className="w-72 flex-shrink-0">
          <PropertyPanel />
        </div>
      </div>

      {/* Code Editor Modal */}
      <CodeEditorModal
        open={codeModalOpen}
        onOpenChange={setCodeModalOpen}
        widget={selectedWidgetForCode}
      />
    </div>
  );
}
