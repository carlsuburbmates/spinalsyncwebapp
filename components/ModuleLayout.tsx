import React from "react";

interface ModuleLayoutProps {
  title: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function ModuleLayout({ title, children, sidebar }: ModuleLayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {sidebar && (
        <aside className="w-full md:w-64 bg-muted/30 border-r p-4 hidden md:block">
          {sidebar}
        </aside>
      )}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </main>
    </div>
  );
}
