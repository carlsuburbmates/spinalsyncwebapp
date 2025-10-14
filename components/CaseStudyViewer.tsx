import React, { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, Info, XCircle } from "lucide-react"

interface CaseStudyQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  learningPoint: string
}

interface CaseStudy {
  id: string
  title: string
  module: string
  patient: {
    age: number
    gender: string
    injuryLevel: string
    timePostInjury: string
  }
  scenario: string
  questions: CaseStudyQuestion[]
}

interface CaseStudyViewerProps {
  caseStudy: CaseStudy
  onComplete?: (score: number) => void
}

export function CaseStudyViewer({ caseStudy, onComplete }: CaseStudyViewerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [showLearningPoints, setShowLearningPoints] = useState(false)

  const questions = caseStudy.questions
  const currentQuestion = questions[currentQuestionIndex]

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      const response = answers[question.id]
      if (response === question.correctAnswer) {
        return total + 1
      }
      return total
    }, 0)
  }, [answers, questions])

  function handleAnswerSelect(questionId: string, optionIndex: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
  }

  function goToNextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
      setShowSummary(true)
      onComplete?.(score)
    } else {
      setCurrentQuestionIndex((index) => index + 1)
    }
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((index) => Math.max(0, index - 1))
  }

  function resetCaseStudy() {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setShowSummary(false)
    setShowLearningPoints(false)
  }

  const progress = Math.round(((currentQuestionIndex + (showSummary ? 1 : 0)) / questions.length) * 100)

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{caseStudy.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>No questions have been added to this case study yet.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{caseStudy.title}</CardTitle>
            <CardDescription>{caseStudy.scenario}</CardDescription>
          </div>
          <Badge variant="outline">{caseStudy.module}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-4">
          <div>
            <span className="font-semibold">Patient Age:</span> {caseStudy.patient.age}
          </div>
          <div>
            <span className="font-semibold">Gender:</span> {caseStudy.patient.gender}
          </div>
          <div>
            <span className="font-semibold">Injury Level:</span> {caseStudy.patient.injuryLevel}
          </div>
          <div>
            <span className="font-semibold">Time Post-Injury:</span> {caseStudy.patient.timePostInjury}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>
              Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
            </span>
            <Badge variant="secondary">{progress}% complete</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Separator />

        {showSummary ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Summary</h3>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  You answered {score} out of {questions.length} questions correctly.
                </AlertDescription>
              </Alert>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const selectedAnswer = answers[question.id]
                const correct = selectedAnswer === question.correctAnswer

                return (
                  <Card key={question.id} className="border-muted">
                    <CardHeader>
                      <CardTitle className="text-base">Question {index + 1}</CardTitle>
                      <CardDescription>{question.question}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex
                          const isCorrect = question.correctAnswer === optionIndex

                          return (
                            <div
                              key={option}
                              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                                isSelected
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                                    : "border-red-500 bg-red-50 dark:bg-red-950/20"
                                  : "border-border"
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : isSelected ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                              ) : (
                                <span className="h-4 w-4 rounded-full border border-muted-foreground" />
                              )}
                              <span>{option}</span>
                            </div>
                          )
                        })}
                      </div>
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription>{question.explanation}</AlertDescription>
                      </Alert>
                      {showLearningPoints && (
                        <div className="rounded-md bg-muted p-3 text-sm">
                          <p className="font-semibold">Learning Point</p>
                          <p>{question.learningPoint}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
              <p className="text-sm text-muted-foreground">Select the best answer:</p>
            </div>
            <div className="grid gap-2">
              {currentQuestion.options.map((option, optionIndex) => {
                const selected = answers[currentQuestion.id] === optionIndex
                return (
                  <button
                    key={option}
                    className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      selected ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion.id, optionIndex)}
                  >
                    <span>{option}</span>
                    {selected && <Badge variant="primary">Selected</Badge>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        {!showSummary ? (
          <>
            <Button variant="ghost" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={resetCaseStudy}>
                Reset
              </Button>
              <Button onClick={goToNextQuestion} disabled={answers[currentQuestion.id] == null}>
                {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="default" onClick={() => setShowLearningPoints((prev) => !prev)}>
              {showLearningPoints ? "Hide Learning Points" : "Show Learning Points"}
            </Button>
            <Button variant="ghost" onClick={resetCaseStudy}>
              Retake Case Study
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
