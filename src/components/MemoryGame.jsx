import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MemoryGame() {
  const navigate = useNavigate();

  // 2 pairs = 4 cards
  const initialCards = [
    {
      id: 1,
      name: "Bee",
      image: "/images/bee.png",
    },
    {
      id: 2,
      name: "Flower",
      image: "/images/sunflower.png",
    },
    {
      id: 3,
      name: "Bee",
      image: "/images/bee.png",
    },
    {
      id: 4,
      name: "Flower",
      image: "/images/sunflower.png",
    },
  ];

  const [cards, setCards] = useState(
    [...initialCards].sort(() => Math.random() - 0.5)
  );

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [message, setMessage] = useState("");

  const handleCardClick = (card) => {
    // Don't allow clicking the same card twice
    if (flippedCards.some((item) => item.id === card.id)) {
      return;
    }

    // Don't allow already matched cards
    if (matchedCards.includes(card.name)) {
      return;
    }

    // Only allow two cards at a time
    if (flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [
      ...flippedCards,
      card,
    ];

    setFlippedCards(newFlippedCards);

    // Check for match
    if (newFlippedCards.length === 2) {
      const firstCard = newFlippedCards[0];
      const secondCard = newFlippedCards[1];

      if (firstCard.name === secondCard.name) {
        // Match successful
        const newMatchedCards = [
          ...matchedCards,
          firstCard.name,
        ];

        setMatchedCards(newMatchedCards);
        setMessage("✅ Match successful!");

        setTimeout(() => {
          setFlippedCards([]);
        }, 700);

        // All pairs matched
        if (newMatchedCards.length === 2) {
          setTimeout(() => {
            setMessage(
              "🎉 Matching Successful! Great Job! 🎉"
            );
          }, 800);
        }
      } else {
        // Not a match
        setMessage("❌ Not a match. Try again!");

        setTimeout(() => {
          setFlippedCards([]);
          setMessage("");
        }, 1000);
      }
    }
  };

  const isFlipped = (card) => {
    return (
      flippedCards.some(
        (item) => item.id === card.id
      ) ||
      matchedCards.includes(card.name)
    );
  };

  const restartGame = () => {
    setCards(
      [...initialCards].sort(
        () => Math.random() - 0.5
      )
    );

    setFlippedCards([]);
    setMatchedCards([]);
    setMessage("");
  };

  return (
    <div className="memory-page">

      <h1>Memory Match Game</h1>

      <p>
        Find the matching pictures!
      </p>

      {/* Memory Cards */}
      <div className="memory-board">

        {cards.map((card) => (
          <div
            key={card.id}
            className={`memory-card ${
              isFlipped(card)
                ? "flipped"
                : ""
            }`}
            onClick={() =>
              handleCardClick(card)
            }
          >

            {isFlipped(card) ? (
              <img
                src={card.image}
                alt={card.name}
              />
            ) : (
              <span>❓</span>
            )}

          </div>
        ))}

      </div>

      {/* Message */}
      {message && (
        <div className="memory-message">
          <h2>{message}</h2>
        </div>
      )}

      {/* Game completed */}
      {matchedCards.length === 2 && (
        <div className="success-message">

          <h2>
            🎉 Matching Successful! 🎉
          </h2>

          <p>
            You found all the matching pictures!
          </p>

          <button onClick={restartGame}>
            🔄 Play Again
          </button>

          <button
            onClick={() =>
              navigate("/kids-zone")
            }
          >
            ⬅️ Back to Kids Zone
          </button>

        </div>
      )}

    </div>
  );
}

export default MemoryGame;
