"use client";

import { Button } from "@/components/ui/button";

interface ButtonWidgetProps {
  label?: string;
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
}

export function ButtonWidget({
  label = "Click me",
  variant = "default",
  size = "default",
}: ButtonWidgetProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button variant={variant} size={size}>
        {label}
      </Button>
    </div>
  );
}
