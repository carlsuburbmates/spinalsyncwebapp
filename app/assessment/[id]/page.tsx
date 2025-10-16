"use client"

import { useState, useEffect, use, useCallback, useMemo } from "react"
import { getSubModuleById } from "@/lib/modules-data"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizResults } from "@/components/quiz-results"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

type AssessmentPageProps = {
  params: Promise<{ id: string }>
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const { id } = use(params)
  const subModule = getSubModuleById(id)
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([])

  useEffect(() => {
    if (subModule) {
      setAnsweredQuestions(new Array(subModule.assessment_questions.length).fill(false))
    }
  }, [subModule])

  if (!subModule || subModule.assessment_questions.length === 0) {
    notFound()
  }
  const subModuleId = subModule.id

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (!answeredQuestions[currentQuestionIndex]) {
        if (isCorrect) {
          setScore((prev) => prev + 1)
        }
        setAnsweredQuestions((prev) => {
          const updated = [...prev]
          updated[currentQuestionIndex] = true
          return updated
        })
      }
    },
    [answeredQuestions, currentQuestionIndex],
  )

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < subModule.assessment_questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      setShowResults(true)
    }
  }, [currentQuestionIndex, subModule.assessment_questions.length])

  const handleRetry = useCallback(() => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
    setAnsweredQuestions(new Array(subModule.assessment_questions.length).fill(false))
  }, [subModule.assessment_questions.length])

  useEffect(() => {
    if (answeredQuestions[currentQuestionIndex]) {
      const timer = setTimeout(() => {
        handleNext()
      }, 3000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [answeredQuestions, currentQuestionIndex, handleNext])

  useEffect(() => {
    if (!showResults) return

    let cancelled = false

    async function persistProgress() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (cancelled || !user) return

      await fetch("/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          subModuleId,
          score,
          completedAt: new Date().toISOString(),
        }),
      })
    }

    void persistProgress()

    return () => {
      cancelled = true
    }
  }, [showResults, score, subModuleId, supabase])

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {!showResults && (
          <Link href={`/lesson/${id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Lesson
          </Link>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Assessment</h1>
            <p className="text-lg text-muted-foreground">{subModule.title}</p>
          </div>

          {showResults ? (
            <QuizResults
              score={score}
              totalQuestions={subModule.assessment_questions.length}
              subModuleId={subModuleId}
              onRetry={handleRetry}
            />
          ) : (
            <QuizQuestion
              question={subModule.assessment_questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={subModule.assessment_questions.length}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>
    </div>
  )
}
