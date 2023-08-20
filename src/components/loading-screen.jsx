import React, { useState } from "react";
import quiz1 from "./quizzes/quiz1";

const LoadingScreen = () => {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  const currentQuiz = quiz1;

  const handleQuizSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = currentQuiz[quizIndex].correctAnswer;
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setQuizIndex(quizIndex + 1);
    setSelectedOption("");
    setShowResult(false);
  };

  const quizQuestion = currentQuiz[quizIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-70 bg-blue-900 text-white">
      <div className="bg-white rounded-lg p-6 shadow-md text-black">
        <h2 className="text-xl font-semibold mb-4">
          While you wait, let&apos;s have some fun!
        </h2>
        {quizQuestion && (
          <div>
            <p className="text-lg mb-4">{quizQuestion.question}</p>
            {showResult ? (
              <div className="mt-4">
                {selectedOption === quizQuestion.correctAnswer ? (
                  <p className="text-emerald-500">Correct!</p>
                ) : (
                  <p className="text-red-500">
                    Wrong! The correct answer was{" "}
                    {quizQuestion.options[quizQuestion.correctAnswer].label}
                  </p>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Next Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuizSubmit} className="space-y-2">
                {quizQuestion.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.value}
                      checked={selectedOption === option.value}
                      onChange={() => setSelectedOption(option.value)}
                      required
                      className="form-radio"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
