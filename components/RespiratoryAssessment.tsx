import React, { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

interface AssessmentQuestion {
  id: string
  question: string
  type: "scale" | "boolean" | "multiple"
  options?: string[]
  scaleMax?: number
  correctAnswer?: string | number
  explanation?: string
}

const defaultQuestions: AssessmentQuestion[] = [
  {
    id: "resp-q1",
    question: "How would you rate the person's breathing comfort right now?",
    type: "scale",
    scaleMax: 10,
  },
  {
    id: "resp-q2",
    question: "Is the person experiencing shortness of breath at rest?",
    type: "boolean",
    options: ["Yes", "No"],
    correctAnswer: "No",
    explanation: "Breathlessness at rest can indicate impending respiratory fatigue or infection and warrants escalation.",
  },
  {
    id: "resp-q3",
    question: "Select the best next action if oxygen saturation drops below 92% despite positioning and airway clearance.",
    type: "multiple",
    options: ["Continue monitoring without changes", "Initiate assisted cough techniques", "Seek urgent medical review", "Encourage slow breathing"],
    correctAnswer: 2,
    explanation: "Persistent oxygen saturation <92% requires medical review after first-line interventions.",
  },
]

interface RespiratoryAssessmentProps {
  questions?: AssessmentQuestion[]
  onComplete?: (responses: Record<string, string | number>) => void
}

export function RespiratoryAssessment({ questions = defaultQuestions, onComplete }: RespiratoryAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | number>>({})
  const [showSummary, setShowSummary] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = Math.round(((currentQuestionIndex + (showSummary ? 1 : 0)) / questions.length) * 100)

  const score = useMemo(() => {
    return questions.reduce((total, question) => {
      if (question.correctAnswer == null) return total
      const response = responses[question.id]
      if (response === question.correctAnswer) {
        return total + 1
      }
      return total
    }, 0)
  }, [questions, responses])

  function updateResponse(value: string | number) {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  function goToNextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
      setShowSummary(true)
      onComplete?.(responses)
    } else {
      setCurrentQuestionIndex((index) => index + 1)
    }
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((index) => Math.max(0, index - 1))
  }

  function resetAssessment() {
    setResponses({})
    setCurrentQuestionIndex(0)
    setShowSummary(false)
  }

  function renderQuestion() {
    switch (currentQuestion.type) {
      case "scale": {
        const scaleMax = currentQuestion.scaleMax ?? 10
        const value = (responses[currentQuestion.id] as number) ?? Math.round(scaleMax / 2)
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>No discomfort</span>
              <span>Severe discomfort</span>
            </div>
            <input
              type="range"
              min={0}
              max={scaleMax}
              value={value}
              onChange={(event) => updateResponse(Number(event.target.value))}
              className="w-full"
            />
            <div className="text-center text-sm font-medium">Current rating: {value} / {scaleMax}</div>
          </div>
        )
      }
      case "boolean":
      case "multiple": {
        const options = currentQuestion.options ?? []
        const value = responses[currentQuestion.id]
        return (
          <div className="grid gap-2">
            {options.map((option, index) => {
              const selected = value === (currentQuestion.type === "multiple" ? index : option)
              const choiceValue = currentQuestion.type === "multiple" ? index : option
              return (
                <button
                  key={option}
                  className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    selected ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                  }`}
                  onClick={() => updateResponse(choiceValue)}
                >
                  <span>{option}</span>
                  {selected && <Badge variant="secondary">Selected</Badge>}
                </button>
              )
            })}
          </div>
        )
      }
      default:
        return null
    }
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Respiratory Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>No assessment questions configured.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Respiratory Health Assessment</CardTitle>
        <CardDescription>Rapid screening to identify respiratory red flags in people with spinal cord injury.</CardDescription>
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

        {!showSummary ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
            </div>
            {renderQuestion()}
          </div>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Screening complete. {score} of {questions.length} responses aligned with guideline targets. Review responses below.
              </AlertDescription>
            </Alert>
            <div className="space-y-3">
              {questions.map((question) => {
                const response = responses[question.id]
                const correct =
                  question.correctAnswer == null ? undefined : response === question.correctAnswer
                return (
                  <Card key={question.id} className="border-muted">
                    <CardHeader>
                      <CardTitle className="text-base">{question.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        {correct === undefined ? null : correct ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span>
                          Response: {typeof response === "number" ? response.toString() : response ?? "Not recorded"}
                        </span>
                      </div>
                      {question.explanation && (
                        <p className="text-muted-foreground">{question.explanation}</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <Button variant="ghost" onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0 || showSummary}>
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {showSummary ? (
            <Button variant="ghost" onClick={resetAssessment}>
              Restart
            </Button>
          ) : (
            <Button
              onClick={goToNextQuestion}
              disabled={
                responses[currentQuestion.id] == null &&
                !(currentQuestion.type === "scale" && responses[currentQuestion.id] !== undefined)
              }
            >
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
