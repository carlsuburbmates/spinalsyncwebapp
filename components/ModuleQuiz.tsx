import React, { useState } from 'react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ModuleQuizProps {
  questions: Question[];
  title: string;
}

export const ModuleQuiz: React.FC<ModuleQuizProps> = ({ questions, title }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="quiz-results p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Quiz Complete: {title}</h3>
        <div className="text-lg mb-4">
          Score: {score}/{questions.length} ({percentage}%)
        </div>
        <div className="mb-6">
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4 p-4 border rounded">
              <p className="font-medium mb-2">{question.question}</p>
              <p className={`mb-2 ${selectedAnswers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                Your answer: {question.options[selectedAnswers[index]]}
                {selectedAnswers[index] === question.correctAnswer ? ' ✓' : ' ✗'}
              </p>
              {selectedAnswers[index] !== question.correctAnswer && (
                <p className="text-green-600 mb-2">
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
              )}
              <p className="text-sm text-gray-600">{question.explanation}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={resetQuiz}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container p-6 bg-white rounded-lg border">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="mb-4 text-sm text-gray-600">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <div className="question-content mb-6">
        <h4 className="text-lg font-medium mb-4">{question.question}</h4>
        
        <div className="options space-y-2">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={selectedAnswers[currentQuestion] === index}
                onChange={() => handleAnswerSelect(index)}
                className="form-radio text-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="quiz-controls">
        <button
          onClick={handleNext}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {currentQuestion < questions.length - 1 ? 'Next' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
};
