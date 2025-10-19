import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export interface QuickRefCardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function QuickRefCard({ title, description, children, className = "" }: QuickRefCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
