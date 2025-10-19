import React from "react";
import Link from "next/link";

export interface SidebarItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface InteractiveSidebarProps {
  items: SidebarItem[];
  title?: string;
}

export function InteractiveSidebar({ items, title }: InteractiveSidebarProps) {
  return (
    <nav className="space-y-2">
      {title && <div className="font-bold text-lg mb-4">{title}</div>}
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-accent ${item.active ? "bg-accent font-semibold" : ""}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
