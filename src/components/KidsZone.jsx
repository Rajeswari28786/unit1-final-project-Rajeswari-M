import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KidsZone.css";

// ==============================
// Reusable Child Component
// ==============================
function GameCard({ title, description, image, path }) {
  const navigate = useNavigate();

  return (
    <div className="game-card">
      <img
        src={image}
        alt={title}
        width={200}
        height={200}
      />

      <h2>{title}</h2>

      <p>{description}</p>

      <button onClick={() => navigate(path)}>
        Play {title}
      </button>
    </div>
  );
}

// ==============================
// Reusable Component
// ==============================
function ScreenTime({ screenTime }) {
  const minutes = Math.floor(screenTime / 60);
  const seconds = screenTime % 60;

  return (
    <div className="screen-time">
      <h2>Your Screen Time</h2>

      <p>
        {minutes} minutes {seconds} seconds
      </p>
    </div>
  );
}

// ==============================
// Parent Component
// ==============================
function KidsZone() {
  const [screenTime, setScreenTime] = useState(0);

  // Get current kid from localStorage
  const savedKid = localStorage.getItem("currentKid");

  const currentKid = savedKid
    ? JSON.parse(savedKid)
    : null;

  // Game data
  const games = [
    {
      title: "Quiz",
      description: "Test your knowledge!",
      image: "/images/quiz.png",
      path: "/quiz",
    },
    {
      title: "Puzzle",
      description: "Challenge your brain!",
      image: "/images/puzzle.png",
      path: "/puzzle",
    },
    {
      title: "Memory Game",
      description: "Test your memory!",
      image: "/images/memory.png",
      path: "/memory",
    },
  ];

  // React Hook
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

    // Set initial screen time
    setScreenTime(startingTime);

    // Start timer
    const timer = setInterval(() => {
      setScreenTime((previousTime) => {
        const newTime = previousTime + 1;

        // Save screen time for current kid
        localStorage.setItem(
          `screenTime-${currentKid.kidsName}`,
          newTime.toString()
        );

        // Update parent user information
        const savedUsers =
          localStorage.getItem("brainyBeeUsers");

        if (savedUsers) {
          const users = JSON.parse(savedUsers);

          const updatedUsers = users.map((user) => {
            if (
              user.kidsName === currentKid.kidsName
            ) {
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

    // Cleanup timer
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="kids-zone">

      <h1>
        Welcome,{" "}
        {currentKid?.kidsName || "Friend"}! 
      </h1>

      <p>
        Get ready to learn, play and grow!
      </p>

      {/* Reusable component */}
      <ScreenTime screenTime={screenTime} />

      {/* Game Cards */}
      <div className="games">

        {games.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            description={game.description}
            image={game.image}
            path={game.path}
          />
        ))}

      </div>

    </div>
  );
}

export default KidsZone;
