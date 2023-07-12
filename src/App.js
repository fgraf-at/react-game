import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Home from './Home';
import AddPlayer from './AddPlayer';
import Game from './Game';
import {addQuestions, deleteSessionData} from './firebaseService';
import './App.css';
export const questions = [
    {
        category: "categories",
        questions: [
            "Autos",
            "Make Up",
            "Alkoholmarken",
            "Alkoholische Getränke",
            "Weinsorten",
            "Tiere",
            "Reime",
            "Namen",
            "Essen",
            "Länder",
            "Mordwaffen",
            "Clubs / bar",
            "Farben",
            "Orte",
            "Eis",
            "Serien",
            "Filme",
            "Nomen"
        ]
    },
    {
        category: "never_ever",
        questions: [
            "Ich hab noch nie gepupst",
            "Ich hab noch nie ins Pool gepinkelt",
            "Ich hab noch nie Alkohol getrunken",
            "Ich hab noch nie geweint",
            "Ich hatte noch nie Sex",
            "Ich habe noch nie dasselbe Geschlecht geküsst",
            "Ich habe noch nie das andere Geschlecht geküsst",
            "Ich hab noch nie mehr als 1 Person in 24 Stunden geküsst",
            "Ich hab noch nie von Alkohol gekotzt",
            "Ich hab noch nie in die Abwasch von jemanden gekotzt",
            "Ich bin noch nie im angetrunkenen Zustand mit dem Auto gefahren",
            "Ich hab noch nie meine Uhr bei einem festl verloren",
            "Ich hab noch nie wegen Alkohol geweint",
            "Ich hatte noch nie Liebeskummer",
            "Ich war noch nie das runden Opfer",
            "Ich bin noch nie fremd gegangen in einer Beziehung",
            "Ich hatte noch nie eine Beziehung",
            "Ich hatte noch wie was mit einer Person aus dem Freundeskreis",
            "Ich hab noch nie meinen Partner belogen",
            "Ich hab noch nie nach dem kotzen geküsst",
            "Ich hab noch nie gekifft",
            "Ich hab noch nie geraucht",
            "Ich hab noch nie einen Fake Account gehabt",
            "Ich hab noch nie gewünscht das irgendwas an meinem Körper anders wäre",
            "Ich hab noch nie jemanden verarscht",
            "Ich hab noch nie nicht gemerkt das eine Person neben mir bei einer Party gegessen hat",
            "Ich hab noch nie von einer Person die mit spielt geträumt",
            "Ich hab mir noch nie was mit einer Person vorstellen können die mitspielt",
            "Ich bin noch nie beim fortgehen weg gerannt von meinen Freunden",
            "Selbstbefriedigung praktiziert",
            "Mehr als drei orgasmen an einem Tag gehabt",
            "Etwas mit jemanden gehabt der viel älter oder jünger als ich war",
            "Ein Kondom beim Sex ruiniert"
        ]
    },
    {
        category: "truth_or_shot",
        questions: [
            "Wer glaubst du hat den komischsten Fetisch und warum?",
            "Welche Fetisch hast du?",
            "Boobs or Ass?",
            "Wer ist der oberflächlichste ?",
            "Mit wem hattest du den besten kuss?",
            "Wann hattest du dein erstes Mal/ ersten kuss?",
            "Wie viele Beziehung hattest du scho ?",
            "Bodycount?",
            "Letzte mal Sex ?",
            "Dates du zurzeit wen? Wenn ja wen ?",
            "Letzten Aufriss ?",
            "Letztes Mal jemanden geküsst ?",
            "Längste Beziehung?",
            "Schlechtester Sex",
            "Bester Sex",
            "Wann hattest du das letzte mal nen Korb bekommen und von wem ?",
            "Wen in der Runde würdest du am liebsten nackt sehen ?",
            "Hattest du scho mal was mit jemanden viel älteren ?",
            "An welchen Orten hattest du schon Sex? ",
            "Wie viel Tage hast du nicht geduscht?",
            "Besitzt du sex toy",
            "Was ist wichtiger in einer Beziehung Sex oder liebe ?",
            "Hattest du schon mal nen Dreier ?",
            "Nacktbilder verschickt/gemacht ?",
            "Was geklaut? Wenn ja was",
            "Eine Straftat gemacht?",
            "Bist du schon mal bei der Selbstbefriedigung erwischt werden"
        ]
    },
    {
        category: "vote",
        questions: [
            "Wer wird reich?",
            "Wer trinkt am meisten?",
            "Wer verträgt am wenigsten?",
            "Wer ist am ehrlichsten?",
            "Wer geht am öftesten fort?",
            "Wem ist Hygiene am wichtigsten?",
            "Wer ist am oberflächlichsten?",
            "Wer ist am unordentlichsten?",
            "Wer ist am launischsten?",
            "Wer ist am eifersüchtigsten?",
            "Wer ist am nettesten?",
            "Wer ist am ungeduldigsten?",
            "Wer ist am unkompliziertesten?",
            "Wer ist am sorgfältigsten?",
            "Wer ist am romantischsten?",
            "Wer ist am emotionalsten?",
            "Wer ist am klügsten?",
            "Wer ist am witzigsten?",
            "Wer ist am faulsten?",
            "Wer ist am geschicktesten?",
            "Wer ist am geduldigsten?",
            "Wer ist am spontansten?",
            "Wer ist am kreativsten?",
            "Wer ist am verschwenderischsten?",
            "Wer ist am geizigsten?",
            "Wer ist am nettesten?",
            "Wer hat am meisten Geld?",
            "Wer würde am längsten überleben, wenn wir auf einer einsamen Insel wären?",
            "Wer wird als nächstes eine Beziehung haben?",
            "Wer wird als nächstes Single sein?",
            "Wer wird als nächstes heiraten?",
            "Wer wird als nächstes Kinder haben?",
            "Wer hat die meisten Haustiere?",
            "Wer wird als letztes nach Hause gehen?"
        ]
    }
];

function App() {

    useEffect(() => {
        let sessionId = sessionStorage.getItem('sessionId');

        // const addQuestionsToFirebase = async () => {
        //     // Fragen in Firebase hinzufügen
        //     await addQuestions(questions);
        //     console.log("addQuestionsToFirebase")
        // }
        // addQuestionsToFirebase();

        if (!sessionId) {
            sessionId = uuidv4();
            sessionStorage.setItem('sessionId', sessionId);
        }
        return () => {
            deleteSessionData(sessionId);
        };
    }, []);

  return (
    <Router>
        {/*<Navbar />*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addplayer" element={<AddPlayer />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
