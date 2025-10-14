import React, { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface BreathingExercise {
  id: string
  name: string
  duration: number // seconds
  instructions: string[]
  completed: boolean
  streak: number
}

interface BreathingExerciseTrackerProps {
  exercises: BreathingExercise[]
  onExerciseComplete?: (exerciseId: string) => void
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function BreathingExerciseTracker({ exercises, onExerciseComplete }: BreathingExerciseTrackerProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const activeExercise = useMemo(
    () => exercises.find((exercise) => exercise.id === activeId) ?? null,
    [activeId, exercises],
  )

  useEffect(() => {
    if (!activeExercise) {
      setIsRunning(false)
      setTimeRemaining(0)
      return
    }
    setTimeRemaining(activeExercise.duration)
    setIsRunning(true)
  }, [activeExercise])

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) {
      return
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          if (activeExercise) {
            onExerciseComplete?.(activeExercise.id)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning, timeRemaining, activeExercise, onExerciseComplete])

  function startExercise(id: string) {
    if (activeId === id) return
    setActiveId(id)
  }

  function pauseResume() {
    if (!activeExercise) return
    setIsRunning((prev) => !prev)
  }

  function stopExercise() {
    setActiveId(null)
    setIsRunning(false)
    setTimeRemaining(0)
  }

  const overallCompleted = exercises.filter((exercise) => exercise.completed).length
  const overallProgress = exercises.length === 0 ? 0 : Math.round((overallCompleted / exercises.length) * 100)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Breathing Exercise Tracker</CardTitle>
        <CardDescription>Structured routines to strengthen respiratory muscles and improve airway clearance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              Completed Exercises: {overallCompleted} / {exercises.length}
            </p>
            <Badge variant={overallProgress === 100 ? "default" : "secondary"}>{overallProgress}%</Badge>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <Separator />

        <div className="grid gap-4">
          {exercises.map((exercise) => {
            const isActive = exercise.id === activeId
            const isPaused = isActive && !isRunning && timeRemaining > 0
            const currentTime = isActive ? timeRemaining : exercise.duration
            const percentComplete = isActive
              ? Math.round(((exercise.duration - timeRemaining) / exercise.duration) * 100)
              : exercise.completed
                ? 100
                : 0

            return (
              <Card key={exercise.id} className={isActive ? "border-primary" : undefined}>
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{exercise.name}</CardTitle>
                    {exercise.completed ? (
                      <Badge variant="default">Completed</Badge>
                    ) : (
                      <Badge variant="outline">{formatTime(exercise.duration)}</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {exercise.instructions[0]}
                    {exercise.instructions.length > 1 ? "…" : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{isActive ? "Time Remaining" : "Estimated Time"}</span>
                      <span>{formatTime(currentTime)}</span>
                    </div>
                    <Progress value={percentComplete} className="h-2" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">Instructions</p>
                    <ul className="list-disc ml-4 space-y-1">
                      {exercise.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {!isActive && !exercise.completed && (
                      <Button variant="outline" onClick={() => startExercise(exercise.id)}>
                        Start Exercise
                      </Button>
                    )}
                    {isActive && (
                      <>
                        <Button variant="outline" onClick={pauseResume}>
                          {isPaused ? "Resume" : "Pause"}
                        </Button>
                        <Button variant="ghost" onClick={stopExercise}>
                          Stop
                        </Button>
                      </>
                    )}
                    {exercise.completed && !isActive && (
                      <Badge variant="secondary">Streak: {exercise.streak} days</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
