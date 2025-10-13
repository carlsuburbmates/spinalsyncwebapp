"use client"

import { useState } from "react"
import type { AssessmentQuestion } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Info } from "lucide-react"

interface QuizQuestionProps {
  question: AssessmentQuestion
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

export function QuizQuestion({ question, questionNumber, totalQuestions, onAnswer }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    const correct = selectedAnswer === question.correct_answer
    setIsCorrect(correct)
    setHasAnswered(true)
    onAnswer(correct)
  }

  const handleNext = () => {
    setSelectedAnswer("")
    setHasAnswered(false)
    setIsCorrect(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={hasAnswered}>
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrectAnswer = option === question.correct_answer
              const showCorrect = hasAnswered && isCorrectAnswer
              const showIncorrect = hasAnswered && isSelected && !isCorrect

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-colors ${
                    showCorrect
                      ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                      : showIncorrect
                        ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                        : isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-accent"
                  }`}
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                    {option}
                  </Label>
                  {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
                  {showIncorrect && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
                </div>
              )
            })}
          </div>
        </RadioGroup>

        {hasAnswered && (
          <Alert
            className={
              isCorrect
                ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
            }
          >
            <Info
              className={`h-5 w-5 ${isCorrect ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
            />
            <AlertDescription className="text-sm leading-relaxed ml-2">
              <strong className="block mb-1">{isCorrect ? "Correct!" : "Explanation:"}</strong>
              {question.explanation}
            </AlertDescription>
          </Alert>
        )}

        {!hasAnswered ? (
          <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full">
            {questionNumber < totalQuestions ? "Next Question" : "View Results"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
