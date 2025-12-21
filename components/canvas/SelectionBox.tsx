"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Widget } from "@/types/widget";
import { useCanvasStore } from "@/lib/canvas-store";
import { Code, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SelectionBoxProps {
  widget: Widget;
  onOpenCodeEditor: (widget: Widget) => void;
}

export function SelectionBox({ widget, onOpenCodeEditor }: SelectionBoxProps) {
  const { updateWidgetSize, removeWidget } = useCanvasStore();
  const [isResizing, setIsResizing] = useState(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startSizeRef = useRef({ width: 0, height: 0 });

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);
      startPosRef.current = { x: e.clientX, y: e.clientY };
      startSizeRef.current = { width: widget.size.width, height: widget.size.height };
    },
    [widget.size]
  );

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startPosRef.current.x;
      const deltaY = e.clientY - startPosRef.current.y;

      const newWidth = Math.max(100, startSizeRef.current.width + deltaX);
      const newHeight = Math.max(50, startSizeRef.current.height + deltaY);

      updateWidgetSize(widget.id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, widget.id, updateWidgetSize]);

  return (
    <>
      {/* Toolbar */}
      <div className="absolute -top-10 left-0 flex items-center gap-1 bg-background border rounded-md shadow-sm p-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation();
            onOpenCodeEditor(widget);
          }}
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            removeWidget(widget.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Resize handle */}
      <div
        className="resize-handle"
        onMouseDown={handleResizeStart}
        style={{ cursor: isResizing ? "se-resize" : "se-resize" }}
      />
    </>
  );
}
