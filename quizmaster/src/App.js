import React, { useState } from 'react';
import './App.css';

/**
 * Main Container for QuizMaster
 * Features:
 *   - Displays one question at a time (multiple-choice)
 *   - Allows answer selection
 *   - Calculates score and shows at end
 *   - Allows quiz restart
 *
 * Uses: React JS, ES6+, no extra libraries.
 * Color scheme: 
 *   -- primary: #1976d2 (answers, buttons)
 *   -- accent: #ff9800
 *   -- secondary: #ffffff
 *   -- light theme, with dark text on light background for card
 */

// Quiz data: you can replace these questions for your own.
const QUESTIONS = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Jane Austen"],
    answer: 0
  },
  {
    question: "What does 'CSS' stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2
  },
  {
    question: "2 + 2 * 2 = ?",
    options: ["6", "8", "4", "10"],
    answer: 0
  }
];

// PUBLIC_INTERFACE
function QuizMaster() {
  // State management for current question, selected options and score
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null); // stores index of selected answer for current question
  const [answers, setAnswers] = useState([]); // all selected indices for score calc
  const [showScore, setShowScore] = useState(false);

  // PUBLIC_INTERFACE
  function handleOptionClick(idx) {
    setSelected(idx);
  }

  // PUBLIC_INTERFACE
  function handleNext() {
    let updatedAnswers = [...answers, selected];
    if (current < QUESTIONS.length - 1) {
      setAnswers(updatedAnswers);
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setAnswers(updatedAnswers);
      setShowScore(true);
    }
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowScore(false);
  }

  function calcScore() {
    return answers.reduce(
      (score, sel, idx) => (sel === QUESTIONS[idx].answer ? score + 1 : score),
      0
    );
  }

  // Styles for card using color specs (primary: #1976d2, accent: #ff9800, secondary: #fff)
  const cardStyle = {
    background: "#fff",
    color: "#222",
    borderRadius: "16px",
    boxShadow: "0 2px 24px rgba(20,40,100,0.1)",
    maxWidth: 420,
    margin: "0 auto",
    padding: "40px 32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const optionBtnStyle = (isSelected) => ({
    width: "100%",
    textAlign: "left",
    margin: "8px 0",
    background: isSelected ? "#1976d2" : "#f5f7fa",
    color: isSelected ? "#fff" : "#222",
    border: `2px solid ${isSelected ? "#1976d2" : "#e0e0e0"}`,
    borderRadius: 8,
    padding: "14px 16px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s, color 0.2s"
  });

  const nextBtnStyle = {
    background: "#ff9800",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "12px 32px",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: selected === null && !showScore ? "not-allowed" : "pointer",
    opacity: selected === null && !showScore ? 0.7 : 1,
    marginTop: 32,
    letterSpacing: ".04em"
  };

  const restartBtnStyle = {
    ...nextBtnStyle,
    background: "#1976d2"
  };

  return (
    <div className="app">
      <nav className="navbar" style={{ background: "#1976d2" }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo" style={{ color: "#fff" }}>
              <span className="logo-symbol" style={{ color: "#ff9800", fontWeight: 700 }}>*</span> QuizMaster
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={cardStyle}>
            {!showScore ? (
              <>
                <div className="subtitle" style={{ color: "#1976d2", marginBottom: 8, fontWeight: 600 }}>
                  Question {current + 1} / {QUESTIONS.length}
                </div>
                <h1 className="title"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    margin: "0 0 24px 0",
                    color: "#222"
                  }}>
                  {QUESTIONS[current].question}
                </h1>
                <div style={{ width: "100%", marginBottom: 16 }}>
                  {QUESTIONS[current].options.map((opt, idx) => (
                    <button
                      key={idx}
                      className="btn"
                      type="button"
                      style={optionBtnStyle(selected === idx)}
                      onClick={() => handleOptionClick(idx)}
                      disabled={selected !== null}
                      aria-selected={selected === idx}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  style={nextBtnStyle}
                  className="btn btn-large"
                  onClick={handleNext}
                  disabled={selected === null}
                >
                  {current === QUESTIONS.length - 1 ? "Submit" : "Next"}
                </button>
              </>
            ) : (
              <>
                <h1 className="title"
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 700,
                    margin: "0 0 24px 0",
                    color: "#222"
                  }}>
                  Quiz Complete!
                </h1>
                <div style={{ fontSize: "1.18rem", color: "#1976d2", marginBottom: 24, fontWeight: 600 }}>
                  Your Score: <span style={{ color: "#ff9800", fontWeight: 700 }}>{calcScore()}</span> / {QUESTIONS.length}
                </div>
                <button
                  style={restartBtnStyle}
                  className="btn btn-large"
                  onClick={handleRestart}
                >
                  Restart Quiz
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuizMaster;