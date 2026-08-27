import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Kids.css";

function Kids() {
  const [kidsName, setKidsName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredName = kidsName.trim();

    if (!enteredName) {
      setError("Please enter your name.");
      return;
    }

    const savedUsers = localStorage.getItem("brainyBeeUsers");

    if (!savedUsers) {
      setError(
        "No registered users found. Please ask your parent to create an account."
      );
      return;
    }

    const users = JSON.parse(savedUsers);

    const registeredKid = users.find(
      (user) =>
        user.kidsName &&
        user.kidsName.toLowerCase() === enteredName.toLowerCase()
    );

    if (registeredKid) {
      localStorage.setItem(
        "currentKid",
        JSON.stringify(registeredKid)
      );

      navigate("/kids-zone");
    } else {
      setError(
        "Sorry, this name is not registered. Please ask your parent to create an account."
      );
    }
  };

  return (
    <div className="kids-page">
    <div className="kids-login">

      <h1>🐝 Welcome to Kids Zone! 🐝</h1>

      <p>Enter your name to get started.</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter your name"
          value={kidsName}
          onChange={(event) => {
            setKidsName(event.target.value);
            setError("");
          }}
        />

        <button type="submit">
          Enter Kids Zone
        </button>

      </form>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

    </div>
    </div>
  );
}

export default Kids;