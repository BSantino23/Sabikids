import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";

import EnglishQuizGame from "./EnglishQuizGame";

const questions = [
  {
    prompt: "¿Cómo se dice 'manzana' en inglés?",
    answer: "Apple",
    clue: "Es una fruta roja o verde.",
    options: ["Apple", "Book", "Sun", "Dog"],
  },
  {
    prompt: "¿Cómo se dice 'libro' en inglés?",
    answer: "Book",
    clue: "Lo usamos para leer.",
    options: ["Chair", "Book", "House", "Ball"],
  },
  {
    prompt: "¿Cómo se dice 'sol' en inglés?",
    answer: "Sun",
    clue: "Está en el cielo y da luz.",
    options: ["Moon", "Cloud", "Sun", "Tree"],
  },
  {
    prompt: "¿Cómo se dice 'casa' en inglés?",
    answer: "House",
    clue: "Es un lugar donde vive una familia.",
    options: ["School", "House", "Water", "Pencil"],
  },
  {
    prompt: "¿Cómo se dice 'lápiz' en inglés?",
    answer: "Pencil",
    clue: "Lo usamos para escribir o dibujar.",
    options: ["Pencil", "Table", "Window", "Fish"],
  },
  {
    prompt: "¿Cómo se dice 'agua' en inglés?",
    answer: "Water",
    clue: "La tomamos cuando tenemos sed.",
    options: ["Water", "Bread", "Door", "Bird"],
  },
  {
    prompt: "¿Cómo se dice 'árbol' en inglés?",
    answer: "Tree",
    clue: "Tiene hojas, ramas y tronco.",
    options: ["Star", "Tree", "Car", "Bed"],
  },
  {
    prompt: "¿Cómo se dice 'escuela' en inglés?",
    answer: "School",
    clue: "Es el lugar donde vamos a aprender.",
    options: ["School", "Beach", "Clock", "Cat"],
  },
];

export default function VocabularioIngles() {
  return (
    <EnglishQuizGame
      title="Vocabulario"
      subtitle="Elegí la palabra correcta en inglés"
      questions={questions}
      Icon={TranslateIcon}
    />
  );
}