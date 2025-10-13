"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Modules", href: "/modules" },
  { label: "Assessments", href: "/assessments" },
  { label: "Resources", href: "/resources" },
  { label: "Progress", href: "/progress" },
]

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-2 overflow-x-auto pb-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
