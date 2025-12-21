"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  categories,
  getComponentsByCategory,
} from "@/lib/component-registry";
import { ComponentItem } from "./ComponentItem";
import {
  Layout,
  TrendingUp,
  BarChart3,
  Table,
  Component,
} from "lucide-react";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  layout: Layout,
  metrics: TrendingUp,
  charts: BarChart3,
  tables: Table,
  ui: Component,
};

export function ComponentLibrary() {
  return (
    <div className="h-full flex flex-col border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Components</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Drag components to the canvas
        </p>
      </div>

      <Tabs defaultValue="layout" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 grid grid-cols-5">
          {categories.map((category) => {
            const Icon = categoryIcons[category.id] || Component;
            return (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-2"
                title={category.name}
              >
                <Icon className="h-4 w-4" />
              </TabsTrigger>
            );
          })}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="flex-1 mt-0"
          >
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {getComponentsByCategory(category.id).map((component) => (
                  <ComponentItem key={component.type} component={component} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
