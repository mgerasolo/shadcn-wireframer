"use client";

import React from "react";
import { Widget } from "@/types/widget";
import { componentRenderers, getComponentDefinition } from "@/lib/component-registry";

interface RenderedWidgetProps {
  widget: Widget;
}

export function RenderedWidget({ widget }: RenderedWidgetProps) {
  const definition = getComponentDefinition(widget.type);
  const Component = componentRenderers[widget.type];

  if (!Component || !definition) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        Unknown component: {widget.type}
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <Component {...widget.props} />
    </div>
  );
}
