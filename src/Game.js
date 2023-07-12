import React, { useState, useEffect } from 'react';
import './Game.css';
import Navbar from "./Navbar";
import { getRandomQuestion } from './firebaseService'; // Pfad zu Ihrer Service-Datei anpassen
import { getPlayersForSession } from './firebaseService'; // Pfad zu Ihrer Service-Datei anpassen

function Game() {
    const [question, setQuestion] = useState(null);
    const [players, setPlayers] = useState([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [category, setCategory] = useState(""); // Neu: Zustand für die Kategorie

    const categories = ['never_ever', 'categories', 'truth_or_shot', 'vote']; // Aktualisieren Sie diese Zeile mit Ihren Kategorienamen

    useEffect(() => {
        fetchPlayers();
    }, []);

    const currentPlayer = players[currentPlayerIndex];

    async function fetchPlayers() {
        const sessionId = sessionStorage.getItem('sessionId'); // Hier Ihre Session-ID einsetzen
        const sessionPlayers = await getPlayersForSession(sessionId);
        setPlayers(sessionPlayers);
        fetchQuestion();
    }

    async function fetchQuestion() {
        const randomQuestion = await getRandomQuestion(category || null); // Verwendung des Kategorienzustands
        console.log(randomQuestion)
        setQuestion(randomQuestion);
    }

    function roll() {
        const newIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(newIndex);
        fetchQuestion();
    }

    // Neu: Funktion zum Ändern der Kategorie
    function changeCategory(e) {
        setCategory(e.target.value);
    }

    return (
        <div>
            <Navbar />
            <div className="game-container">
                {/* Neu: Dropdown-Menü zum Auswählen der Kategorie */}
                <select onChange={changeCategory} value={category}>
                    <option value="">Wähle eine Kategorie</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>

                {currentPlayer && question ? (
                    <div className="question-container">
                        <p><strong className="player-name">{currentPlayer.name}</strong> {question.question}  {question.category}</p>
                        <button onClick={roll} className="roll-button">Neue Frage</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Game;
