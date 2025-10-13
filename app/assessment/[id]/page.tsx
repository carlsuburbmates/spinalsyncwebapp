"use client"

import { useState, useEffect } from "react"
import { getSubModuleById } from "@/lib/modules-data"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizResults } from "@/components/quiz-results"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function AssessmentPage({ params }: { params: { id: string } }) {
  const subModule = getSubModuleById(params.id)
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

  const handleAnswer = (isCorrect: boolean) => {
    if (!answeredQuestions[currentQuestionIndex]) {
      if (isCorrect) {
        setScore(score + 1)
      }
      const newAnswered = [...answeredQuestions]
      newAnswered[currentQuestionIndex] = true
      setAnsweredQuestions(newAnswered)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < subModule.assessment_questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
    setAnsweredQuestions(new Array(subModule.assessment_questions.length).fill(false))
  }

  useEffect(() => {
    if (answeredQuestions[currentQuestionIndex]) {
      const timer = setTimeout(() => {
        handleNext()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [answeredQuestions, currentQuestionIndex])

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {!showResults && (
          <Link
            href={`/lesson/${params.id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
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
              subModuleId={subModule.id}
              subModuleTitle={subModule.title}
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
