import React, { useState } from "react";
import QRCode from "qrcode.react";
import "./styles.css";

const questions = [
  {
    question: "Which is the longest river in India?",
    options: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"],
    answer: 0,
  },
  {
    question: "Which monument is called the 'Symbol of Love' in India?",
    options: ["Qutub Minar", "Taj Mahal", "Red Fort", "India Gate"],
    answer: 1,
  },
  {
    question: "Which Indian festival celebrates the victory of good over evil?",
    options: ["Holi", "Diwali", "Dussehra", "Raksha Bandhan"],
    answer: 2,
  },
  {
    question: "Who was the first Indian woman to go into space?",
    options: [
      "Sunita Williams",
      "Kalpana Chawla",
      "Indira Gandhi",
      "Rani Lakshmibai",
    ],
    answer: 1,
  },
  {
    question: "What is the national animal of India?",
    options: ["Elephant", "Peacock", "Tiger", "Lion"],
    answer: 2,
  },
];

const App = () => {
  const [playerName, setPlayerName] = useState("");
  const [joined, setJoined] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);

  const handleAnswerSelection = (index) => {
    if (index === questions[currentQuestionIndex].answer) {
      setScore(score + 2);
    } else {
      setScore(score - 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setPlayers([...players, { name: playerName, score }]);
      setJoined(false);
    }
  };

  return (
    <div className="App">
      {!joined ? (
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#f4f4f9",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h1>Join the Game</h1>
          <QRCode value="http://localhost:5173" size={256} />
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            onClick={() => {
              if (playerName.length > 2) setJoined(true);
            }}
          >
            Join
          </button>
        </div>
      ) : (
        <div>
          {currentQuestionIndex < questions.length ? (
            <div>
              <h2>{questions[currentQuestionIndex].question}</h2>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  class="button-in-game"
                  key={index}
                  onClick={() => handleAnswerSelection(index)}
                >
                  {option}
                </button>
              ))}
              <div class="score-card">
                <p>
                  Score: <span class="score">{score}</span>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2>Game Over</h2>
              <p>Your final score: {score}</p>
            </div>
          )}
        </div>
      )}

      <div>
        <h2 class="h2-class">All Players</h2>
        <div class="list-container">
          <ul>
            {players.map((player, index) => (
              <li class=" " key={index}>
                {player.name}: {player.score} points
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
