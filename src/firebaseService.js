import { db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';

export async function addPlayer(player) {
  try {
    const playersCollection = collection(db, 'players');
    await addDoc(playersCollection, player);
  } catch (error) {
    // Handle error
    console.error('Error adding player: ', error);
  }
}

export async function getPlayers() {
  try {
    const playersCollection = collection(db, 'players');
    const querySnapshot = await getDocs(playersCollection);
    // Process querySnapshot and return the data
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    // Handle error
    console.error('Error getting players: ', error);
    return [];
  }
}

export async function getPlayer(playerId) {
  try {
    const playerDoc = doc(db, 'players', playerId);
    const playerSnapshot = await getDoc(playerDoc);
    if (playerSnapshot.exists()) {
      // Process playerSnapshot and return the data
      return playerSnapshot.data();
    } else {
      // Player does not exist
      console.log('Player does not exist');
      return null;
    }
  } catch (error) {
    // Handle error
    console.error('Error getting player: ', error);
    return null;
  }
}
