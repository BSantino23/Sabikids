import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

import EnglishQuizGame from "./EnglishQuizGame";

const questions = [
  {
    prompt: "¿Cómo se dice 'fútbol' en inglés?",
    answer: "Soccer",
    clue: "Se juega con una pelota y dos arcos.",
    options: ["Soccer", "Tennis", "Basketball", "Swimming"],
  },
  {
    prompt: "¿Cómo se dice 'básquet' en inglés?",
    answer: "Basketball",
    clue: "Se juega encestando la pelota.",
    options: ["Running", "Basketball", "Soccer", "Cycling"],
  },
  {
    prompt: "¿Cómo se dice 'tenis' en inglés?",
    answer: "Tennis",
    clue: "Se juega con raqueta.",
    options: ["Tennis", "Swimming", "Boxing", "Football"],
  },
  {
    prompt: "¿Cómo se dice 'natación' en inglés?",
    answer: "Swimming",
    clue: "Se practica en el agua.",
    options: ["Basketball", "Swimming", "Running", "Soccer"],
  },
  {
    prompt: "¿Cómo se dice 'correr' en inglés?",
    answer: "Running",
    clue: "Es moverse rápido usando las piernas.",
    options: ["Cycling", "Running", "Tennis", "Boxing"],
  },
  {
    prompt: "¿Cómo se dice 'ciclismo' en inglés?",
    answer: "Cycling",
    clue: "Se practica usando una bicicleta.",
    options: ["Cycling", "Football", "Swimming", "Tennis"],
  },
  {
    prompt: "¿Cómo se dice 'boxeo' en inglés?",
    answer: "Boxing",
    clue: "Se usan guantes y se pelea en un ring.",
    options: ["Running", "Soccer", "Boxing", "Basketball"],
  },
  {
    prompt: "¿Cómo se dice 'fútbol americano' en inglés?",
    answer: "Football",
    clue: "En Estados Unidos se lo llama así.",
    options: ["Football", "Tennis", "Cycling", "Swimming"],
  },
];

export default function DeportesIngles() {
  return (
    <EnglishQuizGame
      title="Deportes"
      subtitle="Elegí cómo se dice cada deporte en inglés"
      questions={questions}
      Icon={SportsSoccerIcon}
    />
  );
}