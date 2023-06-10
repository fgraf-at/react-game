import React, { useEffect, useState } from 'react';
import { getPlayers } from './firebaseService';

function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers()
      .then((querySnapshot) => {
        console.log('QuerySnapshot:', querySnapshot);
        const players = querySnapshot;
        console.log('Players:', players);
        setPlayers(players);
      })
      .catch((error) => {
        console.log('Error getting players:', error);
      });
  }, []);

  return (
    <div>
      <h1>Willkommen beim Trinkspiel!</h1>
      {players.length > 0 ? (
        players.map((player, index) => <div key={index}>{player.name}</div>)
      ) : (
        <div>No players found.</div>
      )}
      {/* Hier können Sie Optionen zum Hinzufügen von Spielern oder zum Starten des Spiels anzeigen. */}
    </div>
  );
}

export default Home;
