import React from "react";

function About() {
  return (
    <div className="about-page">

      {/* Left side - About the app */}
      <div className="about-info">
        <h1>About Brainy Bee Kids</h1>

        <p>
          Brainy Bee Kids is a fun and interactive learning platform
          designed especially for children.
        </p>

        <p>
          Our goal is to make kids playing through puzzles
          , Quiz, and Memory Games to improve their knowledge and skills.
          And also gives the screen time information and progress of the kids to their parents.
        </p>

        <h2>What We Offer</h2>

        <ul>
          <li>Quizzes</li>
          <li>Puzzles</li>
          <li>Memory Games</li>
          <li>Screen time information of the kids for parents</li>
        </ul>
      </div>

      {/* Right side - Create account form */}
      <div className="account-form">
        <h1>Create an Account</h1>

        <form>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
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
      </div>

    </div>
  );
}

export default About;