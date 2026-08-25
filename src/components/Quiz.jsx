import React, { useState } from "react";

function Quiz() {
  const questions = [
    {
      question: "How many countries had the World Cup games this year?",
      options: ["1", "2", "4", "3"],
      answer: "3",
    },
    {
      question: "What will the winning team get?",
      options: ["a trophy", "hats", "ribbons", "crown"],
      answer: "a trophy",
    },
    {
      question: "Which of these is NOT a color on the World Cup ball?",
      options: ["red", "Yellow", "Green", "blue"],
      answer: "Yellow",
    },
    {
      question: "The World Cup happens every ______ years?",
      options: ["2", "4", "6", "8"],
      answer: "4",
    },
    {
      question: "Which team won the 2026 World Cup?",
      options: ["Argentina", "Spain", "France", "England"],
      answer: "Spain",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let totalScore = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        totalScore++;
      }
    });

    setScore(totalScore);

    // Get currently logged-in kid
    const savedKid = localStorage.getItem("currentKid");

    if (savedKid) {
      const currentKid = JSON.parse(savedKid);

      // Get registered users
      const savedUsers = localStorage.getItem("brainyBeeUsers");

      if (savedUsers) {
        const users = JSON.parse(savedUsers);

        // Update the quiz score for the child's parent account
        const updatedUsers = users.map((user) => {
          if (user.kidsName === currentKid.kidsName) {
            return {
              ...user,
              quizScore: totalScore,
            };
          }

          return user;
        });

        localStorage.setItem(
          "brainyBeeUsers",
          JSON.stringify(updatedUsers)
        );
      }
    }
  };

  return (
    <div className="quiz-page">

      <h1> 🐝 Brainy Bee Kids Quiz 🐝</h1>

      <p>Choose the correct answer for each question!</p>

      <form onSubmit={handleSubmit}>

        {questions.map((question, index) => (
          <div className="question-card" key={index}>

            <h2>
              {index + 1}. {question.question}
            </h2>

            {question.options.map((option) => (
              <label
                key={option}
                className="answer-option"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() =>
                    handleAnswerChange(index, option)
                  }
                />

                {option}
              </label>
            ))}

          </div>
        ))}

        <button type="submit">
          Submit Quiz
        </button>

      </form>

      {score !== null && (
        <div className="score-card">

          <h2>🎉 Quiz Completed! 🎉</h2>

          <p>Your score is:</p>

          <h1>
            {score} / {questions.length}
          </h1>

          {score === questions.length && (
            <p>
              🌟 Amazing! You got all the answers correct!
            </p>
          )}

          {score >= 3 && score < questions.length && (
            <p>
              👏 Great job! Keep learning!
            </p>
          )}

          {score < 3 && (
            <p>
              💪 Good try! Keep practicing!
            </p>
          )}

        </div>
      )}

    </div>
  );
}

export default Quiz;