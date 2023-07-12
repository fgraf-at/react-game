import React, {useEffect, useState} from 'react';
import {addPlayer, getPlayersForSession, deletePlayer} from './firebaseService';
import './AddPlayer.css';
import {Link} from "react-router-dom";

function AddPlayer() {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, [])

    const fetchPlayers = () => {
        let sessionId = sessionStorage.getItem('sessionId');
        getPlayersForSession(sessionId)
            .then((players) => {
                setPlayers(players);
            })
            .catch((error) => {
                console.log('Error getting players:', error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            const sessionId= sessionStorage.getItem('sessionId');
            addPlayer(sessionId, { name })
                .then(fetchPlayers)
                .catch((error) => {
                    console.log('Error adding player:', error);
                });
        }
    };

    const handleDelete = (playerId) => {
        const sessionId= sessionStorage.getItem('sessionId');
        deletePlayer(sessionId, playerId)
            .then(fetchPlayers)
            .catch((error) => {
                console.log('Error deleting player:', error);
            });
    }

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
                    players.map((player, index) => (
                        <div key={index} className="player-entry">
                            <p className="player-name">{player.name}</p>
                            <div onClick={() => handleDelete(player.id)} className="delete-icon">
                                x
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Keine Spieler gefunden</div>
                )}
            <div className="link-container">
                <Link className="styled-link" to="/">Zurück</Link>
                <Link className="styled-link" to="/game">Zum Spiel</Link>
            </div>
        </div>
    );
}

export default AddPlayer;
