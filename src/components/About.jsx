import React, { useState, useEffect } from "react";

function About() {
  const [userName, setUserName] = useState("");
  const [kidsName, setKidsName] = useState("");

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("brainyBeeUsers");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("brainyBeeUsers", JSON.stringify(users));
  }, [users]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userName.trim() || !kidsName.trim()) {
      alert("Please enter your name and kids name.");
      return;
    }

    const newUser = {
      userName: userName.trim(),
      kidsName: kidsName.trim(),
    };

    setUsers([...users, newUser]);

    setUserName("");
    setKidsName("");

    alert("Account created successfully!");
  };

  return (
    <div className="about-page">

      <div className="about-info">
        <h1>About Brainy Bee Kids</h1>

        <p>
          Brainy Bee Kids is a fun and interactive gaming platform
          designed especially for children.
        </p>

        <p>
          Our goal is to help kids learn through quizzes, puzzles,
          and memory games.
        </p>

        <h2>What We Offer</h2>

        <ul>
          <li>Quizzes</li>
          <li>Puzzles</li>
          <li>Memory Games</li>
          <li>Screen time information</li>
        </ul>
      </div>

      <div className="account-form">

        <h1>Create an Account</h1>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Kids Name</label>

          <input
            type="text"
            placeholder="Enter your kids full name"
            value={kidsName}
            onChange={(event) => setKidsName(event.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="user-list">

          <h2>Registered Users</h2>

          {users.length === 0 ? (
            <p>No users registered yet.</p>
          ) : (
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  {user.userName} - {user.kidsName}
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>

    </div>
  );
}

export default About;