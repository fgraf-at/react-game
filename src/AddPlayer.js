import React, { useState } from 'react';
import { addPlayer } from './firebaseService';

function AddPlayer() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer({ name })
      .then(() => {
        setName('');
        alert('Spieler hinzugefügt!');
      });
  };

  return (
    <div>
      <h1>Spieler hinzufügen</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
}

export default AddPlayer;
