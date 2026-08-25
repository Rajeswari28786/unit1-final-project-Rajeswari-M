import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function KidsZone() {
  const navigate = useNavigate();

  const [screenTime, setScreenTime] = useState(0);

  const savedKid = localStorage.getItem("currentKid");

  const currentKid = savedKid
    ? JSON.parse(savedKid)
    : null;

  useEffect(() => {
    if (!currentKid) {
      return;
    }

    // Get previously saved screen time
    const savedTime = localStorage.getItem(
      `screenTime-${currentKid.kidsName}`
    );

    const startingTime = savedTime
      ? parseInt(savedTime)
      : 0;

    setScreenTime(startingTime);

    // Start timer
    const timer = setInterval(() => {
      setScreenTime((previousTime) => {
        const newTime = previousTime + 1;

        // Save screen time
        localStorage.setItem(
  `screenTime-${currentKid.kidsName}`,
  newTime.toString()
);

// Update parent information
const savedUsers =
  localStorage.getItem("brainyBeeUsers");

if (savedUsers) {
  const users = JSON.parse(savedUsers);

  const updatedUsers = users.map((user) => {
    if (user.kidsName === currentKid.kidsName) {
      return {
        ...user,
        screenTime: newTime,
      };
    }

    return user;
  });

  localStorage.setItem(
    "brainyBeeUsers",
    JSON.stringify(updatedUsers)
  );
}

return newTime;
      });
    }, 1000);

    // Stop timer when leaving the page
    return () => {
      clearInterval(timer);
    };
  }, []);

  // Convert seconds into minutes and seconds
  const minutes = Math.floor(screenTime / 60);
  const seconds = screenTime % 60;

  return (
    <div className="kids-zone">

      <h1>
        🎉 Welcome, {currentKid?.kidsName || "Friend"}! 🎉
      </h1>

      <p>
        Get ready to learn, play and have fun!
      </p>

      {/* Screen Time */}
      <div className="screen-time">

        <h2>⏱️ Your Screen Time</h2>

        <p>
          {minutes} minutes {seconds} seconds
        </p>

      </div>

      <div className="games">

        {/* Quiz */}
        <div className="game-card">
        <img src="/images/quiz.png" alt="Quiz" width={200} height={200} />

          <h2>Quiz</h2>

          <p>Test your knowledge!</p>

          <button
            onClick={() => navigate("/quiz")}
          >
            Play Quiz
          </button>

        </div>

        {/* Puzzle */}
        <div className="game-card">
          <img src="/images/puzzle.png" alt="Puzzle" width={200} height={200} />

          <h2>Puzzle</h2>

          <p>Challenge your brain!</p>

          <button onClick={() => navigate("/puzzle")}>
           Play Puzzle
          </button>


        </div>

        {/* Memory Game */}
        <div className="game-card">
          <img src="/images/memory.png" alt="Memory" width={200} height={200} />

          <h2>Memory Game</h2>

          <p>Test your memory!</p>

          <button onClick={() => navigate("/memory")}>
           Play Memory
          </button>


        </div>

      </div>

    </div>
  );
}

export default KidsZone;