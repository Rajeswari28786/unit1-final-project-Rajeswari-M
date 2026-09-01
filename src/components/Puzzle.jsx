import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Puzzle.css";

function Puzzle() {
  const navigate = useNavigate();

  const [placedPieces, setPlacedPieces] = useState({});
  const [completed, setCompleted] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState(null);

  const pieces = [
    {
      id: 1,
      name: "Piece 1",
      image: "/images/piece-1.png",
    },
    {
      id: 2,
      name: "Piece 2",
      image: "/images/piece-2.png",
    },
    {
      id: 3,
      name: "Piece 3",
      image: "/images/piece-3.png",
    },
    {
      id: 4,
      name: "Piece 4",
      image: "/images/piece-4.png",
    },
  ];

  // Start dragging
  const handleDragStart = (event, pieceId) => {
    console.log("Dragging piece:", pieceId);

    setDraggedPiece(pieceId);

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "text/plain",
      String(pieceId)
    );
  };

  // Allow dropping
  const handleDragOver = (event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
  };

  // Drop
  const handleDrop = (event, position) => {
    event.preventDefault();

    console.log("Dropped on position:", position);

    let pieceId = Number(
      event.dataTransfer.getData("text/plain")
    );

    // Fallback in case browser doesn't provide dataTransfer
    if (!pieceId) {
      pieceId = draggedPiece;
    }

    console.log("Piece received:", pieceId);

    if (!pieceId) {
      console.log("No piece found");
      return;
    }

    // Check correct position
    if (pieceId !== position) {
      alert(
        `❌ Wrong position!\n\nPiece ${pieceId} belongs in position ${pieceId}.`
      );

      setDraggedPiece(null);
      return;
    }

    // Don't place if slot already contains a piece
    if (placedPieces[position]) {
      return;
    }

    const updatedPieces = {
      ...placedPieces,
      [position]: pieceId,
    };

    setPlacedPieces(updatedPieces);
    setDraggedPiece(null);

    console.log("Placed pieces:", updatedPieces);

    // Puzzle completed
    if (Object.keys(updatedPieces).length === 4) {
      setCompleted(true);
    }
  };

  const getPieceForPosition = (position) => {
    const pieceId = placedPieces[position];

    return pieces.find(
      (piece) => piece.id === pieceId
    );
  };

  return (
    <div className="puzzle-page">

      <h1>Image Puzzle</h1>

      <p>Drag each piece into the correct place!</p>

      {/* ==============================
          PUZZLE BOARD
      =============================== */}

      <div className="puzzle-board">

        {[1, 2, 3, 4].map((position) => {
          const piece = getPieceForPosition(position);

          return (
            <div
              key={position}
              className="puzzle-slot"

              onDragOver={handleDragOver}

              onDrop={(event) =>
                handleDrop(event, position)
              }
            >
              {piece ? (
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="puzzle-piece-placed"
                  draggable={false}
                />
              ) : (
                <span>
                  Drop Piece Here
                </span>
              )}
            </div>
          );
        })}

      </div>

      {/* ==============================
          DRAGGABLE PIECES
      =============================== */}

      {!completed && (
        <div className="pieces-container">

          {pieces.map((piece) => {

            // Check whether already placed
            const alreadyPlaced =
              Object.values(placedPieces).includes(
                piece.id
              );

            if (alreadyPlaced) {
              return null;
            }

            return (
              <div
                key={piece.id}

                className="draggable-piece"

                draggable={true}

                onDragStart={(event) =>
                  handleDragStart(
                    event,
                    piece.id
                  )
                }

                onDragEnd={() =>
                  setDraggedPiece(null)
                }
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                  draggable={false}
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                />
              </div>
            );
          })}

        </div>
      )}

      {/* ==============================
          SUCCESS
      =============================== */}

      {completed && (
        <div className="success-message">

          <h2>
            🎉 Puzzle Successfully Completed! 🎉
          </h2>

          <p>
            Great job! You completed the puzzle!
          </p>

          <button
            onClick={() =>
              navigate("/kids-zone")
            }
          >
            Back to Kids Zone
          </button>

        </div>
      )}

    </div>
  );
}

export default Puzzle;
