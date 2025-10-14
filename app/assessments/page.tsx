"use client"

import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { modulesData } from "@/lib/modules-data"
import { FileText, ArrowRight } from "lucide-react"

export default function AssessmentsPage() {
  const assessmentEntries = modulesData.flatMap((module) =>
    module.sub_modules
      .filter((subModule) => subModule.assessment_questions.length > 0)
      .map((subModule) => ({
        moduleId: module.module_id,
        moduleTitle: module.title,
        moduleCategory: module.category,
        subModuleId: subModule.id,
        subModuleTitle: subModule.title,
        difficulty: subModule.metadata.difficulty_level,
        questionCount: subModule.assessment_questions.length,
      })),
  )

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
            <CardTitle className="text-3xl">{assessmentEntries.length}</CardTitle>
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
            <CardTitle className="text-3xl">{assessmentEntries.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Assessments List */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Available Assessments</h3>
        {assessmentEntries.length > 0 ? (
          <div className="grid gap-3">
            {assessmentEntries.map((assessment) => (
              <Card key={assessment.subModuleId} className="transition-colors hover:bg-accent cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {assessment.moduleCategory}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Quiz
                        </Badge>
                        <Badge variant="default" className="text-xs">
                          {assessment.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{assessment.subModuleTitle}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        <Link
                          href={`/modules/${assessment.moduleId}`}
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {assessment.moduleTitle}
                        </Link>
                      </CardDescription>
                      <p className="text-xs text-muted-foreground">
                        {assessment.questionCount} question{assessment.questionCount === 1 ? "" : "s"}
                      </p>
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
