"use client";

import React from "react";
import { useCanvasStore } from "@/lib/canvas-store";
import { getComponentDefinition } from "@/lib/component-registry";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropDefinition } from "@/types/widget";

export function PropertyPanel() {
  const { widgets, selectedWidgetId, updateWidgetProps, updateWidgetPosition, updateWidgetSize } =
    useCanvasStore();

  const selectedWidget = widgets.find((w) => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="h-full flex flex-col border-l bg-background">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Select a widget to edit properties
        </div>
      </div>
    );
  }

  const definition = getComponentDefinition(selectedWidget.type);

  if (!definition) {
    return (
      <div className="h-full flex flex-col border-l bg-background">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          Unknown component type
        </div>
      </div>
    );
  }

  const handlePropChange = (name: string, value: unknown) => {
    updateWidgetProps(selectedWidget.id, { [name]: value });
  };

  const handlePositionChange = (axis: "x" | "y", value: number) => {
    updateWidgetPosition(selectedWidget.id, {
      ...selectedWidget.position,
      [axis]: value,
    });
  };

  const handleSizeChange = (dimension: "width" | "height", value: number) => {
    updateWidgetSize(selectedWidget.id, {
      ...selectedWidget.size,
      [dimension]: value,
    });
  };

  return (
    <div className="h-full flex flex-col border-l bg-background">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Properties</h2>
        <p className="text-xs text-muted-foreground mt-1">{definition.name}</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Position & Size */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Position & Size</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="pos-x">X</Label>
                <Input
                  id="pos-x"
                  type="number"
                  value={Math.round(selectedWidget.position.x)}
                  onChange={(e) =>
                    handlePositionChange("x", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pos-y">Y</Label>
                <Input
                  id="pos-y"
                  type="number"
                  value={Math.round(selectedWidget.position.y)}
                  onChange={(e) =>
                    handlePositionChange("y", parseInt(e.target.value) || 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size-w">Width</Label>
                <Input
                  id="size-w"
                  type="number"
                  value={Math.round(selectedWidget.size.width)}
                  onChange={(e) =>
                    handleSizeChange("width", parseInt(e.target.value) || 100)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size-h">Height</Label>
                <Input
                  id="size-h"
                  type="number"
                  value={Math.round(selectedWidget.size.height)}
                  onChange={(e) =>
                    handleSizeChange("height", parseInt(e.target.value) || 50)
                  }
                />
              </div>
            </div>
          </div>

          {/* Component Props */}
          {definition.editableProps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Component Properties</h3>
              <div className="space-y-4">
                {definition.editableProps.map((prop) => (
                  <PropEditor
                    key={prop.name}
                    prop={prop}
                    value={selectedWidget.props[prop.name] ?? prop.defaultValue}
                    onChange={(value) => handlePropChange(prop.name, value)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface PropEditorProps {
  prop: PropDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}

function PropEditor({ prop, value, onChange }: PropEditorProps) {
  switch (prop.type) {
    case "text":
      return (
        <div className="space-y-2">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Input
            id={prop.name}
            type="text"
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );

    case "number":
      return (
        <div className="space-y-2">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Input
            id={prop.name}
            type="number"
            value={(value as number) || 0}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Switch
            id={prop.name}
            checked={value as boolean}
            onCheckedChange={onChange}
          />
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Select
            value={value as string}
            onValueChange={onChange}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );

    case "color":
      return (
        <div className="space-y-2">
          <Label htmlFor={prop.name}>{prop.label}</Label>
          <Input
            id={prop.name}
            type="color"
            value={(value as string) || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 p-1"
          />
        </div>
      );

    default:
      return null;
  }
}
