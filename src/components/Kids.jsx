import React from "react";
import { Link } from "react-router-dom";

function Kids() {
  return (
    <div className="kids-page">
      <h1>Welcome to the Kids Zone!</h1>
      <p>Choose an activity and have fun playing!</p>

      <div className="activity-container">

        <Link to="/quiz" className="activity-card">
          <img
            src="/images/quiz.png"
            alt="Quizzes"
          />
          <h2>Quizzes</h2>
          <p>Test your knowledge with fun quizzes!</p>
        </Link>

        <Link to="/puzzles" className="activity-card">
          <img
            src="/images/puzzle.png"
            alt="Puzzles"
          />
          <h2>Puzzles</h2>
          <p>Challenge your brain with exciting puzzles!</p>
        </Link>

        <Link to="/memory-games" className="activity-card">
          <img
            src="/images/memory.png"
            alt="Memory Games"
          />
          <h2>Memory Games</h2>
          <p>Improve your memory while having fun!</p>
        </Link>

      </div>
    </div>
  );
}

export default Kids;