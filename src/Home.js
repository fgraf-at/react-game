import React, { useEffect, useState } from 'react';
import { getPlayersForSession} from './firebaseService';
import './Home.css';
import {Link} from "react-router-dom";
function Home() {
  const [ setPlayers] = useState([]);

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
  }, []);



  return (
    <div className="home-container">
        <h1>Willkommen beim Trinkspiel!</h1>
        <p>Hier würde normal eine Beschreibung stehen, aber darauf verzichte ich jetzt</p>
        <Link to="/addplayer">Spieler hinzufügen</Link>
    </div>
  );
}

export default Home;
