import { db } from './firebase';
import { collection, addDoc, getDocs, doc, getDoc, deleteDoc, query, where } from 'firebase/firestore';



export async function addPlayer(sessionId, player) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const playersCollection = collection(sessionRef, 'players');
    await addDoc(playersCollection, player);
  } catch (error) {
    // Handle error
    console.error('Error adding player: ', error);
  }
}




export async function getPlayersForSession(sessionId) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const playersCollection = collection(sessionRef, 'players');
    const querySnapshot = await getDocs(playersCollection);
    // Process querySnapshot and return the data
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    // Handle error
    console.error('Error getting players: ', error);
    return [];
  }
}
// export async function getPlayers() {
//   try {
//     const playersCollection = collection(db, 'players');
//     const querySnapshot = await getDocs(playersCollection);
//     // Process querySnapshot and return the data
//     return querySnapshot.docs.map((doc) => doc.data());
//   } catch (error) {
//     // Handle error
//     console.error('Error getting players: ', error);
//     return [];
//   }
// }

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


export async function deleteSessionData(sessionId) {
  const playersRef = collection(db, 'players');
  const q = query(playersRef, where("sessionId", "==", sessionId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
}

export async function addQuestion(question) {
  try {
    const questionsCollection = collection(db, 'questions');
    await addDoc(questionsCollection, { text: question });
  } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler beim Hinzufügen der Frage: ', error);
  }
}

export async function addQuestions(questions) {
  try {
    // Referenz zur questions Collection
    const questionsCollection = collection(db, 'questions');

    for (let question of questions) {
      const l = await addDoc(questionsCollection, question);
    }

    console.log('Questions successfully added to Firebase!');
  } catch (error) {
    // Fehlerbehandlung
    console.error('Error adding questions: ', error);
  }
}

let askedQuestions = [];
export async function getRandomQuestion(category) {
  try {
    // Referenz zur Fragen-Sammlung
    const questionsCollection = collection(db, 'questions');

    let q;
    if (category) {
      // Wenn eine Kategorie angegeben wurde, nur Fragen dieser Kategorie abrufen
      q = query(questionsCollection, where("category", "==", category));

    } else {
      // Ansonsten alle Fragen abrufen
      q = questionsCollection;
    }

    // Alle Fragen-Dokumente abrufen
    const querySnapshot = await getDocs(q);

    // Alle Fragen in ein Array konvertieren
    const questionsData = querySnapshot.docs.map((doc) => doc.data());

    // Fragen der gewählten Kategorie in ein Array konvertieren
    let questions = [];
    let categoryQ: string = "";
    questionsData.forEach((doc) => {
      categoryQ = doc.category;
      questions.push(...doc.questions);
    });

    // Eine zufällige Frage auswählen, die noch nicht gestellt wurde
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (askedQuestions.includes(randomIndex) && askedQuestions.length < 70);

    // Wenn wir weniger als 64 Fragen haben, leeren wir das Array
    if (askedQuestions.length === 64) {
      askedQuestions = [];
    }

    // Füge den Index der ausgewählten Frage zum Array hinzu
    askedQuestions.push(randomIndex);

    // Die zufällig ausgewählte Frage zurückgeben
    return {question: questions[randomIndex], category: categoryQ};
  } catch (error) {
    // Fehlerbehandlung
    console.error('Error getting random question:', error);
    return null;
  }
}

export async function deletePlayer(sessionId, playerId) {
  try {
    const sessionRef = doc(db, 'sessions', sessionId);
    const playerRef = doc(sessionRef, 'players', playerId);
    await deleteDoc(playerRef);
  } catch (error) {
    // Fehlerbehandlung
    console.error('Fehler beim Löschen des Spielers: ', error);
  }
}



