import React from "react";

export interface ClinicalChecklistProps {
  items: string[];
  title?: string;
}

export function ClinicalChecklist({ items, title }: ClinicalChecklistProps) {
  return (
    <div className="mb-6">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <ul className="list-disc pl-6 space-y-2">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
