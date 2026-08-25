import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Kids from "./components/Kids";
import KidsZone from "./components/KidsZone";
import Quiz from "./components/Quiz";
import Puzzle from "./components/Puzzle";
import MemoryGame from "./components/MemoryGame";
import Parents from "./components/Parents";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        {/* Header */}
        <header className="header">
          <div className="logo">
            <h1>Brainy Bee Kids</h1>
            <h3>🐝Learn, Play and Grow!🐝</h3>
          </div>

          {/* Custom Navigation Menu */}
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/kids">Kids</Link>
            <Link to="/parents">Parents</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/kids-zone" element={<KidsZone />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/puzzle" element={<Puzzle />} />
            <Route path="/memory" element={<MemoryGame />} />
            <Route path="/parents" element={<Parents />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Brainy Bee Kids. All rights reserved.</p>
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;