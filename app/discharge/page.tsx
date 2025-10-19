import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function DischargePlanningPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Discharge Planning</h1>
      <p className="mb-6 text-muted-foreground">
        Access forms, checklists, and resources for safe and effective discharge planning for spinal cord injury patients.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Discharge Checklist</CardTitle>
            <CardDescription>Step-by-step checklist for discharge readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources/discharge-checklist" className="text-primary hover:underline">View Checklist</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Compensation & Referrals</CardTitle>
            <CardDescription>Forms and contacts for compensation, NDIS, and referrals</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources/compensation" className="text-primary hover:underline">View Forms</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient & Family Education</CardTitle>
            <CardDescription>Printable guides and education materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources/education" className="text-primary hover:underline">View Resources</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Follow-up & Community Care</CardTitle>
            <CardDescription>Contacts and forms for follow-up care</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/resources/followup" className="text-primary hover:underline">View Contacts</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
