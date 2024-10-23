import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import img0 from "./assets/forca0.png";
import img1 from "./assets/forca1.png";
import img2 from "./assets/forca2.png";
import img3 from "./assets/forca3.png";
import img4 from "./assets/forca4.png";
import img5 from "./assets/forca5.png";
import img6 from "./assets/forca6.png";
import "./reset.css";
import "./style.css";
import palavras from "./palavras.js";

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const images = [img0, img1, img2, img3, img4, img5, img6];

function getRandomWord() {
  return palavras[Math.floor(Math.random() * palavras.length)];
}

function App() {
  const [chosenWord, setChosenWord] = useState("");
  const [hiddenWord, setHiddenWord] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle"); // idle, playing, won, lost
  const [guess, setGuess] = useState("");

  useEffect(() => {
    if (gameStatus === "playing" && hiddenWord.join("") === chosenWord) {
      setGameStatus("won");
    }
  }, [hiddenWord, chosenWord, gameStatus]);

  function startGame() {
    const word = getRandomWord();
    setChosenWord(word);
    setHiddenWord(Array(word.length).fill("_"));
    setUsedLetters([]);
    setMistakes(0);
    setGameStatus("playing");
  }

  function handleLetterClick(letter) {
    if (usedLetters.includes(letter) || gameStatus !== "playing") return;

    setUsedLetters([...usedLetters, letter]);

    if (chosenWord.includes(letter.toLowerCase())) {
      const updatedHiddenWord = hiddenWord.map((char, index) =>
        chosenWord[index] === letter.toLowerCase() ? letter : char
      );
      setHiddenWord(updatedHiddenWord);
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes === images.length - 1) {
        setGameStatus("lost");
      }
    }
  }

  function handleGuessChange(event) {
    setGuess(event.target.value);
  }

  function handleGuessSubmit() {
    if (guess.toLowerCase() === chosenWord.toLowerCase()) {
      setHiddenWord(chosenWord.split(""));
      setGameStatus("won");
    } else {
      setMistakes(images.length - 1);
      setGameStatus("lost");
    }
  }

  return (
    <div className="game-container">
      <div className="game">
        <div className="hangman-image">
          <img src={images[mistakes]} alt={`Mistake ${mistakes}`} />
        </div>

        <div className="word">
          <ul className={`word ${gameStatus === "won" ? "won" : ""}`}>
            {hiddenWord.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>

        <div className="keyboard">
          {alphabet.map((letter, index) => (
            <button
              key={index}
              className={usedLetters.includes(letter) ? "disabled" : "active"}
              onClick={() => handleLetterClick(letter)}
              disabled={
                usedLetters.includes(letter) || gameStatus !== "playing"
              }
            >
              {letter}
            </button>
          ))}
        </div>

        <div className="guess-container">
          <p>Já sabe a palavra? Tente adivinhar:</p>
          <input
            type="text"
            value={guess}
            onChange={handleGuessChange}
            disabled={gameStatus !== "playing"}
          />
          <button
            onClick={handleGuessSubmit}
            disabled={gameStatus !== "playing"}
          >
            Chutar
          </button>
        </div>

        {gameStatus === "won" && (
          <div className="message">Parabéns, você venceu!</div>
        )}
        {gameStatus === "lost" && (
          <div className="message">
            Você perdeu! A palavra era: {chosenWord}
          </div>
        )}

        <button onClick={startGame} className="restart-button">
          {gameStatus === "idle" ? "Começar Jogo" : "Reiniciar Jogo"}
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));
