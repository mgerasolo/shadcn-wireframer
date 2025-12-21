"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardWidgetProps {
  title?: string;
  description?: string;
  showFooter?: boolean;
}

export function CardWidget({
  title = "Card Title",
  description = "Card description goes here",
  showFooter = false,
}: CardWidgetProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content area. Add your content here.
        </p>
      </CardContent>
      {showFooter && (
        <CardFooter>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
