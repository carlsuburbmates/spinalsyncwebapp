"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, RotateCcw, ArrowRight } from "lucide-react"
import Link from "next/link"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  subModuleId: string
  subModuleTitle: string
  onRetry: () => void
}

export function QuizResults({ score, totalQuestions, subModuleId, subModuleTitle, onRetry }: QuizResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = percentage >= 80

  return (
    <Card>
      <CardHeader>
        <div className="text-center space-y-4">
          <div
            className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
              passed ? "bg-green-100 dark:bg-green-950" : "bg-orange-100 dark:bg-orange-950"
            }`}
          >
            {passed ? (
              <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
            ) : (
              <Target className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            )}
          </div>
          <div>
            <CardTitle className="text-2xl mb-2">{passed ? "Congratulations!" : "Keep Learning"}</CardTitle>
            <p className="text-muted-foreground">
              {passed
                ? "You've successfully completed this assessment"
                : "You're making progress! Review the material and try again"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Your Score</span>
            <span className="font-semibold text-lg">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3" />
          <p className="text-sm text-muted-foreground text-center">
            {score} out of {totalQuestions} questions correct
          </p>
        </div>

        {passed && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
            <p className="text-sm text-center text-green-800 dark:text-green-300">
              You've earned progress towards your badges and certifications!
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Link href={`/lesson/${subModuleId}`}>
            <Button variant="outline" className="w-full bg-transparent">
              Review Lesson
            </Button>
          </Link>
          <Button onClick={onRetry} variant="outline" className="w-full bg-transparent">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry Assessment
          </Button>
          <Link href="/modules">
            <Button className="w-full">
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
