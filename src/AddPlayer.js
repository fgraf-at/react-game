import React, {useEffect, useState} from 'react';
import {addPlayer, getPlayersForSession} from './firebaseService';
import './AddPlayer.css';
import {Link} from "react-router-dom";
function AddPlayer() {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState([]);
    useEffect(() => {
        let sessionId = sessionStorage.getItem('sessionId');
        getPlayersForSession(sessionId)
            .then((querySnapshot) => {
                const players = querySnapshot;
                setPlayers(players);
            })
            .catch((error) => {
                console.log('Error getting players:', error);
            });
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            const sessionId= sessionStorage.getItem('sessionId');
            addPlayer(sessionId, { name })
                .then(() => {
                    // Spieler wurde hinzugefügt, jetzt alle Spieler für die Sitzung abrufen
                    return getPlayersForSession(sessionId);
                })
                .then((querySnapshot) => {
                    const players = querySnapshot;
                    setPlayers(players);
            })
                .catch((error) => {
                    console.log('Error getting players:', error);
                });

        }
    };

    return (
        <div class="add-player-container">
            <h1>Spieler hinzufügen</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name eingeben"
                />
                <button type="submit">Hinzufügen</button>
            </form>
            {players.length > 0 ? (
                players.map((player, index) => <div key={index}>{player.name}</div>)
            ) : (
                <div>No players found.</div>
            )}
            <Link to="/">Zurück</Link>
            <Link to="/game">Zum Spiel</Link>
        </div>
    );
}

export default AddPlayer;
