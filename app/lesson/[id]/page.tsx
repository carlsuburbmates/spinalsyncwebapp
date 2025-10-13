import { getSubModuleById } from "@/lib/modules-data"
import { LessonHeader } from "@/components/lesson-header"
import { LessonContent } from "@/components/lesson-content"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function LessonPage({ params }: { params: { id: string } }) {
  const subModule = getSubModuleById(params.id)

  if (!subModule) {
    notFound()
  }

  const hasAssessment = subModule.assessment_questions.length > 0

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/modules"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Link>

        <div className="space-y-8">
          <LessonHeader subModule={subModule} />

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <LessonContent content={subModule.content} />
          </div>

          {hasAssessment && (
            <div className="border-t pt-8">
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Ready to Test Your Knowledge?</h3>
                <p className="text-muted-foreground mb-4">
                  Complete the assessment to check your understanding and earn progress towards your badges.
                </p>
                <Link href={`/assessment/${subModule.id}`}>
                  <Button size="lg">Start Assessment</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
