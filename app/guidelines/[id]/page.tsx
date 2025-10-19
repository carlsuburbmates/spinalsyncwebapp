import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { ClinicalChecklist } from "@/components/clinical-checklist"; // To be implemented
// import { QuickRefCard } from "@/components/quick-ref-card"; // To be implemented
import guidelines, { Guideline } from "../../../lib/guidelines-data";

interface GuidelinePageProps {
  params: { id: string };
}

export default function GuidelinePage({ params }: GuidelinePageProps) {
  const guideline = guidelines.find((g: Guideline) => g.id === params.id);
  if (!guideline) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{guideline.title}</CardTitle>
          <CardDescription>{guideline.summary}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Checklist/Steps */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Checklist</h2>
            <ul className="list-disc pl-6 space-y-2">
              {guideline.checklist.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Quick Actions (e.g., print, share, add to favorites) */}
          <div className="flex gap-4 mt-4">
            {/* Placeholder buttons */}
            <button className="btn btn-primary">Print</button>
            <button className="btn btn-secondary">Share</button>
            <button className="btn btn-accent">Favorite</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
