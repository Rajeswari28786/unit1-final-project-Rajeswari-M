import React, { useState } from "react";

function Parents() {
  const [userName, setUserName] = useState("");
  const [parent, setParent] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const enteredName = userName.trim();

    if (!enteredName) {
      setError("Please enter your name.");
      return;
    }

    const savedUsers = localStorage.getItem("brainyBeeUsers");

    if (!savedUsers) {
      setError("No registered users found.");
      return;
    }

    const users = JSON.parse(savedUsers);

    const registeredParent = users.find(
      (user) =>
        user.userName &&
        user.userName.toLowerCase() ===
          enteredName.toLowerCase()
    );

    if (registeredParent) {
      setParent(registeredParent);
      setError("");
    } else {
      setError(
        "Parent name not found. Please create an account first."
      );
    }
  };

  if (parent) {
    return (
      <div className="parent-dashboard">

        <h1>👋 Welcome, {parent.userName}!</h1>

        <h2>Parent Dashboard</h2>

        <div className="child-info">

          <h2>👧 Kids Information</h2>

          <p>
            <strong>Kids Name:</strong>{" "}
            {parent.kidsName}
          </p>

          <p>
  <strong>⏱️ Screen Time:</strong>{" "}
  {parent.screenTime
    ? `${Math.floor(parent.screenTime / 60)} minutes ${
        parent.screenTime % 60
      } seconds`
    : "0 minutes 0 seconds"}
</p>

          <p>
            <strong>🧠 Quiz Score:</strong>{" "}
            {parent.quizScore !== undefined
              ? `${parent.quizScore}/5`
              : "No quiz completed yet"}
          </p>

        </div>

        <button
          onClick={() => {
            setParent(null);
            setUserName("");
          }}
        >
          Logout
        </button>

      </div>
    );
  }

  return (
    <div className="parent-login">

      <h1>👨‍👩‍👧 Parents Dashboard</h1>

      <p>
        Enter your registered name to check your child's progress.
      </p>

      <form onSubmit={handleLogin}>

        <label>Parent Name</label>

        <input
          type="text"
          placeholder="Enter your registered name"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
            setError("");
          }}
        />

        <button type="submit">
          Login
        </button>

      </form>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

    </div>
  );
}

export default Parents;