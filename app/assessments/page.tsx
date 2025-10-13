"use client"

import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { assessments, modules } from "@/lib/data"
import { FileText, ArrowRight } from "lucide-react"

export default function AssessmentsPage() {
  // Group assessments by module
  const assessmentsByModule = assessments.map((assessment) => {
    const module = modules.find((m) => m.module_id === assessment.module_id)
    return {
      ...assessment,
      moduleName: module?.title || "Unknown Module",
      moduleCategory: module?.category || "Unknown",
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Assessments</h2>
        <p className="text-muted-foreground">Test your knowledge and track your progress</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Assessments</CardDescription>
            <CardTitle className="text-3xl">{assessments.length}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl">{assessments.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Assessments List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Available Assessments</h3>
        {assessmentsByModule.length > 0 ? (
          <div className="grid gap-3">
            {assessmentsByModule.map((assessment, index) => (
              <Card key={index} className="transition-colors hover:bg-accent cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {assessment.moduleCategory}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {assessment.type}
                        </Badge>
                        <Badge
                          variant={assessment.difficulty === "Basic" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {assessment.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <Link
                          href={`/modules/${assessment.module_id}`}
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {assessment.moduleName}
                        </Link>
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardDescription>No assessments available yet.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  )
}
