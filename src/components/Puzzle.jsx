import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Puzzle() {
  const navigate = useNavigate();

  // The correct position for each piece
  const correctPositions = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };

  const [placedPieces, setPlacedPieces] = useState({});
  const [completed, setCompleted] = useState(false);

  const pieces = [
    { id: 1, name: "Piece 1", image: "/images/puzzle-piece-1.jpg" },
    { id: 2, name: "Piece 2", image: "/images/puzzle-piece-2.png" },
    { id: 3, name: "Piece 3", image: "/images/puzzle-piece-3.png" },
    { id: 4, name: "Piece 4", image: "/images/puzzle-piece-4.png" },
  ];

  const handleDragStart = (event, pieceId) => {
    event.dataTransfer.setData("pieceId", pieceId);
  };

  const handleDrop = (event, position) => {
    event.preventDefault();

    const pieceId = Number(event.dataTransfer.getData("pieceId"));

    if (correctPositions[pieceId] === position) {
      const updatedPieces = {
        ...placedPieces,
        [position]: pieceId,
      };

      setPlacedPieces(updatedPieces);

      // Check whether all 4 pieces are correctly placed
      if (Object.keys(updatedPieces).length === 4) {
        setCompleted(true);
      }
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const getPieceForPosition = (position) => {
    const pieceId = placedPieces[position];

    return pieces.find((piece) => piece.id === pieceId);
  };

  return (
    <div className="puzzle-page">

      <h1>🧩 Jigsaw Puzzle</h1>

      <p>Drag each piece into the correct place!</p>

      {/* Puzzle Board */}
      <div className="puzzle-board">

        {[1, 2, 3, 4].map((position) => {
          const piece = getPieceForPosition(position);

          return (
            <div
              key={position}
              className="puzzle-slot"
              onDragOver={allowDrop}
              onDrop={(event) => handleDrop(event, position)}
            >
              {piece ? (
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="puzzle-piece placed"
                />
              ) : (
                <span>Drop Here</span>
              )}
            </div>
          );
        })}

      </div>

      {/* Pieces */}
      {!completed && (
        <div className="pieces-container">

          {pieces.map((piece) => {
            const alreadyPlaced = Object.values(placedPieces).includes(
              piece.id
            );

            if (alreadyPlaced) {
              return null;
            }

            return (
              <div
                key={piece.id}
                draggable
                onDragStart={(event) =>
                  handleDragStart(event, piece.id)
                }
                className="draggable-piece"
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                />
              </div>
            );
          })}

        </div>
      )}

      {/* Success Message */}
      {completed && (
        <div className="success-message">
          <h2>🎉 Puzzle Successfully Completed! 🎉</h2>

          <p>Great job! You completed the puzzle!</p>

          <button onClick={() => navigate("/kids-zone")}>
            Back to Kids Zone
          </button>
        </div>
      )}

    </div>
  );
}

export default Puzzle;
