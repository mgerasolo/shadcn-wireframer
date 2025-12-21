"use client";

import {
  LayoutDashboard,
  Briefcase,
  Eye,
  Receipt,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  title?: string;
  items?: string[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Portfolio: Briefcase,
  Watchlist: Eye,
  Transactions: Receipt,
  Settings: Settings,
};

export function DashboardSidebar({
  title = "Menu",
  items = ["Dashboard", "Portfolio", "Watchlist", "Transactions", "Settings"],
}: DashboardSidebarProps) {
  return (
    <div className="w-full h-full bg-background border-r p-4">
      <h2 className="text-sm font-semibold text-muted-foreground mb-4">
        {title}
      </h2>
      <nav className="space-y-1">
        {items.map((item, index) => {
          const Icon = iconMap[item] || LayoutDashboard;
          return (
            <button
              key={item}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
