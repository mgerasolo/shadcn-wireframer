"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useCanvasStore } from "@/lib/canvas-store";
import { getComponentDefinition, componentDefinitions } from "@/lib/component-registry";
import { Widget } from "@/types/widget";
import { RenderedWidget } from "./RenderedWidget";
import { SelectionBox } from "./SelectionBox";
import { cn } from "@/lib/utils";

interface CanvasProps {
  onOpenCodeEditor: (widget: Widget) => void;
}

export function Canvas({ onOpenCodeEditor }: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const {
    widgets,
    selectedWidgetId,
    selectWidget,
    addWidget,
    updateWidgetPosition,
  } = useCanvasStore();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);

    // If it's an existing widget, calculate the offset from the mouse to the widget position
    const widget = widgets.find((w) => w.id === active.id);
    if (widget && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const pointerEvent = event.activatorEvent as PointerEvent;
      setDragOffset({
        x: pointerEvent.clientX - rect.left - widget.position.x,
        y: pointerEvent.clientY - rect.top - widget.position.y,
      });
    }
  }, [widgets]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();

      // Check if we're dropping on the canvas
      const pointerEvent = event.activatorEvent as PointerEvent;
      const dropX = pointerEvent.clientX + event.delta.x;
      const dropY = pointerEvent.clientY + event.delta.y;

      // Check if drop is within canvas bounds
      if (
        dropX < canvasRect.left ||
        dropX > canvasRect.right ||
        dropY < canvasRect.top ||
        dropY > canvasRect.bottom
      ) {
        return;
      }

      const activeIdStr = active.id as string;

      // Check if it's a new component from the sidebar
      if (activeIdStr.startsWith("component-")) {
        const componentType = activeIdStr.replace("component-", "");
        const definition = getComponentDefinition(componentType);

        if (definition) {
          const position = {
            x: dropX - canvasRect.left - definition.defaultSize.width / 2,
            y: dropY - canvasRect.top - definition.defaultSize.height / 2,
          };

          addWidget(
            componentType,
            position,
            definition.defaultSize,
            definition.defaultProps
          );
        }
      } else {
        // It's an existing widget being moved
        const widget = widgets.find((w) => w.id === activeIdStr);
        if (widget) {
          const newPosition = {
            x: dropX - canvasRect.left - dragOffset.x,
            y: dropY - canvasRect.top - dragOffset.y,
          };

          // Ensure widget stays within canvas bounds
          newPosition.x = Math.max(0, Math.min(newPosition.x, canvasRect.width - widget.size.width));
          newPosition.y = Math.max(0, Math.min(newPosition.y, canvasRect.height - widget.size.height));

          updateWidgetPosition(activeIdStr, newPosition);
        }
      }
    },
    [addWidget, updateWidgetPosition, widgets, dragOffset]
  );

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        selectWidget(null);
      }
    },
    [selectWidget]
  );

  const handleWidgetClick = useCallback(
    (e: React.MouseEvent, widgetId: string) => {
      e.stopPropagation();
      selectWidget(widgetId);
    },
    [selectWidget]
  );

  // Get active component for drag overlay
  const getActiveComponent = () => {
    if (!activeId) return null;

    if (activeId.startsWith("component-")) {
      const componentType = activeId.replace("component-", "");
      const definition = getComponentDefinition(componentType);
      if (definition) {
        return (
          <div
            className="bg-background border rounded-lg shadow-lg opacity-80"
            style={{
              width: definition.defaultSize.width,
              height: definition.defaultSize.height,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {definition.name}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={canvasRef}
        className="relative w-full h-full canvas-grid bg-muted/30 overflow-auto"
        onClick={handleCanvasClick}
      >
        {widgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            widget={widget}
            isSelected={widget.id === selectedWidgetId}
            onClick={(e) => handleWidgetClick(e, widget.id)}
            onOpenCodeEditor={onOpenCodeEditor}
          />
        ))}
      </div>
      <DragOverlay>{getActiveComponent()}</DragOverlay>
    </DndContext>
  );
}

interface DraggableWidgetProps {
  widget: Widget;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
  onOpenCodeEditor: (widget: Widget) => void;
}

function DraggableWidget({
  widget,
  isSelected,
  onClick,
  onOpenCodeEditor,
}: DraggableWidgetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const { updateWidgetPosition, selectWidget } = useCanvasStore();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).classList.contains("resize-handle")) {
        return;
      }

      e.preventDefault();
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX - widget.position.x,
        y: e.clientY - widget.position.y,
      };
      selectWidget(widget.id);
    },
    [widget.position, widget.id, selectWidget]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      updateWidgetPosition(widget.id, { x: Math.max(0, newX), y: Math.max(0, newY) });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, widget.id, updateWidgetPosition]);

  return (
    <div
      className={cn(
        "absolute bg-background rounded-lg shadow-sm border transition-shadow",
        isSelected && "widget-selected",
        isDragging && "dragging cursor-grabbing"
      )}
      style={{
        left: widget.position.x,
        top: widget.position.y,
        width: widget.size.width,
        height: widget.size.height,
      }}
      onClick={onClick}
      onMouseDown={handleMouseDown}
    >
      <RenderedWidget widget={widget} />
      {isSelected && (
        <SelectionBox widget={widget} onOpenCodeEditor={onOpenCodeEditor} />
      )}
    </div>
  );
}
