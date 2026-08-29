import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import EnglishQuizGame from "./EnglishQuizGame";

const questions = [
  {
    prompt: "¿Cómo se dice 'despertarse' en inglés?",
    answer: "Wake up",
    clue: "Es lo primero que hacemos al levantarnos.",
    options: ["Wake up", "Go to school", "Have lunch", "Sleep"],
  },
  {
    prompt: "¿Cómo se dice 'desayunar' en inglés?",
    answer: "Have breakfast",
    clue: "Es comer por la mañana.",
    options: ["Brush teeth", "Have breakfast", "Play", "Read"],
  },
  {
    prompt: "¿Cómo se dice 'cepillarse los dientes' en inglés?",
    answer: "Brush teeth",
    clue: "Se hace con cepillo y pasta dental.",
    options: ["Sleep", "Wake up", "Brush teeth", "Study"],
  },
  {
    prompt: "¿Cómo se dice 'ir a la escuela' en inglés?",
    answer: "Go to school",
    clue: "Es ir al lugar donde aprendemos.",
    options: ["Go to school", "Have dinner", "Play", "Run"],
  },
  {
    prompt: "¿Cómo se dice 'estudiar' en inglés?",
    answer: "Study",
    clue: "Lo hacemos para aprender o repasar.",
    options: ["Sleep", "Study", "Eat", "Jump"],
  },
  {
    prompt: "¿Cómo se dice 'jugar' en inglés?",
    answer: "Play",
    clue: "Es hacer una actividad divertida.",
    options: ["Read", "Play", "Wake up", "Brush teeth"],
  },
  {
    prompt: "¿Cómo se dice 'cenar' en inglés?",
    answer: "Have dinner",
    clue: "Es comer por la noche.",
    options: ["Have dinner", "Go to school", "Study", "Sleep"],
  },
  {
    prompt: "¿Cómo se dice 'dormir' en inglés?",
    answer: "Sleep",
    clue: "Lo hacemos de noche para descansar.",
    options: ["Play", "Eat", "Sleep", "Read"],
  },
];

export default function RutinasIngles() {
  return (
    <EnglishQuizGame
      title="Rutinas"
      subtitle="Elegí cómo se dice cada rutina en inglés"
      questions={questions}
      Icon={AccessTimeIcon}
    />
  );
}