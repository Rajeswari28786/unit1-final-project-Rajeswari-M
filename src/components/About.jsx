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
        <h1>ABOUT</h1>

        <p>
          Brainy Bee Kids is a gaming app designed to help children learn with fun.
        </p>

        <p>
          Our goal is to make kids play through quizzes, puzzles,
          and memory games inorder to have fun and to improve their skills.
        </p>

        <p> It also helps parents monitor their children’s screen time and track their progress. </p>
      </div>

      <div className="account-form">

        <h1>SIGN UP</h1>
        <h2>Sign up here to create an account</h2>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          /> <br></br>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
          /><br></br>

          <label>Kids Name</label>

          <input
            type="text"
            placeholder="Enter your kids full name"
            value={kidsName}
            onChange={(event) => setKidsName(event.target.value)}
          /><br></br>

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
          /><br></br>

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
          /><br></br>

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