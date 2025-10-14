import React, { useState, useEffect } from 'react';

interface Exercise {
  id: string;
  name: string;
  duration: number;
  instructions: string[];
  completed: boolean;
  streak: number;
}

interface BreathingExerciseTrackerProps {
  exercises: Exercise[];
  onExerciseComplete: (exerciseId: string) => void;
}

export const BreathingExerciseTracker: React.FC<BreathingExerciseTrackerProps> = ({
  exercises,
  onExerciseComplete
}) => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setIsRunning(false);
            if (activeExercise) {
              onExerciseComplete(activeExercise);
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, activeExercise, onExerciseComplete]);

  const startExercise = (exercise: Exercise) => {
    setActiveExercise(exercise.id);
    setTimeRemaining(exercise.duration);
    setCurrentStep(0);
    setIsRunning(true);
  };

  const pauseResume = () => {
    setIsRunning(!isRunning);
  };

  const stopExercise = () => {
    setActiveExercise(null);
    setTimeRemaining(0);
    setIsRunning(false);
    setCurrentStep(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeExerciseData = exercises.find(e => e.id === activeExercise);

  return (
    <div className="breathing-tracker p-6 bg-blue-50 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Breathing Exercise Tracker</h3>
      {/* ...existing code... */}
    </div>
  );
};
