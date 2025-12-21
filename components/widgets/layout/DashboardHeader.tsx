"use client";

import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DashboardHeaderProps {
  title?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
}

export function DashboardHeader({
  title = "Portfolio Dashboard",
  showSearch = true,
  showNotifications = true,
}: DashboardHeaderProps) {
  return (
    <div className="w-full h-full flex items-center justify-between px-4 bg-background border-b">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-[200px]"
            />
          </div>
        )}
        {showNotifications && (
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
