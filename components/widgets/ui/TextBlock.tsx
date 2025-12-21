"use client";

import { cn } from "@/lib/utils";

interface TextBlockProps {
  text?: string;
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
  align?: "left" | "center" | "right";
}

export function TextBlock({
  text = "Enter your text here",
  variant = "body",
  align = "left",
}: TextBlockProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  const variantClass = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-medium",
    body: "text-base",
    caption: "text-sm text-muted-foreground",
  }[variant];

  const Component = variant.startsWith("h") ? variant : "p";

  return (
    <div className={cn("w-full h-full flex items-center p-2", alignClass)}>
      {variant === "h1" && (
        <h1 className={cn(variantClass, "w-full", alignClass)}>{text}</h1>
      )}
      {variant === "h2" && (
        <h2 className={cn(variantClass, "w-full", alignClass)}>{text}</h2>
      )}
      {variant === "h3" && (
        <h3 className={cn(variantClass, "w-full", alignClass)}>{text}</h3>
      )}
      {(variant === "body" || variant === "caption") && (
        <p className={cn(variantClass, "w-full", alignClass)}>{text}</p>
      )}
    </div>
  );
}
