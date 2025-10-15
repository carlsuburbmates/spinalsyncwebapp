import React from 'react'
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { QuizQuestion } from "@/components/quiz-question"
import type { AssessmentQuestion } from "@/lib/types"
import { vi } from "vitest"

describe("QuizQuestion", () => {
  const baseQuestion: AssessmentQuestion = {
    id: "q1",
    question: "Which strategy best prevents UTIs after SCI?",
    options: [
      "Hold urine for as long as possible",
      "Maintain a clean intermittent catheter routine",
      "Use antibiotics daily without review",
      "Drink less than 500ml per day",
    ],
    correct_answer: "Maintain a clean intermittent catheter routine",
    explanation: "Regular clean intermittent catheterisation keeps bladder pressures low and reduces infection risk.",
  }

  it("allows selecting an answer and reports correctness", async () => {
    const user = userEvent.setup()
    const handleAnswer = vi.fn()

    render(
      <QuizQuestion
        question={baseQuestion}
        questionNumber={1}
        totalQuestions={2}
        onAnswer={handleAnswer}
      />,
    )

    const answer = screen.getByLabelText(baseQuestion.options[1])
    await user.click(answer)

    await user.click(screen.getByRole("button", { name: /submit answer/i }))

    expect(handleAnswer).toHaveBeenCalledWith(true)
    expect(screen.getByText(/correct!/i)).toBeInTheDocument()
    expect(screen.getByText(/next question/i)).toBeInTheDocument()
  })

  it("shows explanation for incorrect answers and resets on next", async () => {
    const user = userEvent.setup()
    const handleAnswer = vi.fn()

    render(
      <QuizQuestion
        question={baseQuestion}
        questionNumber={1}
        totalQuestions={1}
        onAnswer={handleAnswer}
      />,
    )

    const wrongAnswer = screen.getByLabelText(baseQuestion.options[0])
    await user.click(wrongAnswer)
    await user.click(screen.getByRole("button", { name: /submit answer/i }))

    expect(handleAnswer).toHaveBeenCalledWith(false)
    expect(screen.getByText(/explanation:/i)).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /view results/i }))
    expect(screen.getByRole("button", { name: /submit answer/i })).toBeInTheDocument()
    expect(screen.queryByText(/explanation:/i)).not.toBeInTheDocument()
  })
})
