import React from "react";
import PetsIcon from "@mui/icons-material/Pets";

import EnglishQuizGame from "./EnglishQuizGame";

const questions = [
  {
    prompt: "¿Cómo se dice 'perro' en inglés?",
    answer: "Dog",
    clue: "Es una mascota que suele ladrar.",
    options: ["Cat", "Dog", "Bird", "Fish"],
  },
  {
    prompt: "¿Cómo se dice 'gato' en inglés?",
    answer: "Cat",
    clue: "Es una mascota que suele maullar.",
    options: ["Cat", "Horse", "Lion", "Duck"],
  },
  {
    prompt: "¿Cómo se dice 'pájaro' en inglés?",
    answer: "Bird",
    clue: "Tiene alas y puede volar.",
    options: ["Rabbit", "Bird", "Cow", "Dog"],
  },
  {
    prompt: "¿Cómo se dice 'pez' en inglés?",
    answer: "Fish",
    clue: "Vive en el agua.",
    options: ["Fish", "Cat", "Elephant", "Horse"],
  },
  {
    prompt: "¿Cómo se dice 'conejo' en inglés?",
    answer: "Rabbit",
    clue: "Tiene orejas largas.",
    options: ["Tiger", "Rabbit", "Bird", "Dog"],
  },
  {
    prompt: "¿Cómo se dice 'caballo' en inglés?",
    answer: "Horse",
    clue: "Es un animal grande que puede correr rápido.",
    options: ["Horse", "Fish", "Cat", "Duck"],
  },
  {
    prompt: "¿Cómo se dice 'vaca' en inglés?",
    answer: "Cow",
    clue: "Es un animal de granja.",
    options: ["Lion", "Cow", "Rabbit", "Bird"],
  },
  {
    prompt: "¿Cómo se dice 'león' en inglés?",
    answer: "Lion",
    clue: "Es conocido como el rey de la selva.",
    options: ["Lion", "Dog", "Fish", "Horse"],
  },
];

export default function AnimalesIngles() {
  return (
    <EnglishQuizGame
      title="Animales"
      subtitle="Elegí cómo se dice cada animal en inglés"
      questions={questions}
      Icon={PetsIcon}
    />
  );
}