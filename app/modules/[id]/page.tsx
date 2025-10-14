import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { getModuleById } from "@/lib/modules-data"
import { BookOpen, Clock, Target, AlertCircle, ArrowRight } from "lucide-react"

type ModulePageProps = {
  params: Promise<{ id: string }>
}

export default async function ModuleDetailPage({ params }: ModulePageProps) {
  const { id } = await params
  const moduleId = Number.parseInt(id, 10)
  const currentModule = getModuleById(moduleId)

  if (!currentModule) {
    notFound()
  }

  const totalDuration = currentModule.sub_modules.reduce((sum, sm) => sum + sm.metadata.duration, 0)

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline">{currentModule.category}</Badge>
          <span className="text-sm text-muted-foreground">Module {currentModule.order}</span>
          {currentModule.priority === "Critical" && (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Critical
            </Badge>
          )}
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {totalDuration} min total
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{currentModule.title}</h1>
        <p className="text-lg text-muted-foreground">{currentModule.summary}</p>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Micro-Lessons</h2>
        </div>
        <div className="grid gap-3">
          {currentModule.sub_modules.map((subModule, index) => {
            const priorityColors = {
              Critical: "border-red-200 dark:border-red-900",
              Important: "border-orange-200 dark:border-orange-900",
            }

            const difficultyColors = {
              Novice: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
              Competent: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
              Advanced: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
            }

            return (
              <Link key={subModule.id} href={`/lesson/${subModule.id}`}>
                <Card
                  className={`transition-colors hover:bg-accent cursor-pointer border-l-4 ${
                    priorityColors[subModule.metadata.priority]
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-muted-foreground">Lesson {index + 1}</span>
                          <Badge className={difficultyColors[subModule.metadata.difficulty_level]}>
                            <Target className="w-3 h-3 mr-1" />
                            {subModule.metadata.difficulty_level}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {subModule.metadata.duration} min
                          </Badge>
                          <Badge variant="outline">{subModule.metadata.injury_level}</Badge>
                        </div>
                        <CardTitle className="text-base">{subModule.title}</CardTitle>
                        <CardDescription className="text-sm">{subModule.description}</CardDescription>
                        {subModule.assessment_questions.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Includes {subModule.assessment_questions.length} assessment questions
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Start */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">Ready to start learning?</h3>
              <p className="text-sm text-muted-foreground">Begin with the first micro-lesson</p>
            </div>
            <Link href={`/lesson/${currentModule.sub_modules[0]?.id}`}>
              <Button>Start Module</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
