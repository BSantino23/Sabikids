import React from "react";
import PaletteIcon from "@mui/icons-material/Palette";

import EnglishQuizGame from "./EnglishQuizGame";

const questions = [
  {
    prompt: "¿Cómo se dice 'rojo' en inglés?",
    answer: "Red",
    clue: "Es el color de una manzana roja.",
    color: "#ef4444",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    prompt: "¿Cómo se dice 'azul' en inglés?",
    answer: "Blue",
    clue: "Es el color del cielo en un día despejado.",
    color: "#3b82f6",
    options: ["Orange", "Blue", "Purple", "Black"],
  },
  {
    prompt: "¿Cómo se dice 'verde' en inglés?",
    answer: "Green",
    clue: "Es el color de muchas hojas.",
    color: "#22c55e",
    options: ["White", "Pink", "Green", "Brown"],
  },
  {
    prompt: "¿Cómo se dice 'amarillo' en inglés?",
    answer: "Yellow",
    clue: "Es el color del sol en muchos dibujos.",
    color: "#facc15",
    options: ["Yellow", "Red", "Blue", "Gray"],
  },
  {
    prompt: "¿Cómo se dice 'naranja' en inglés?",
    answer: "Orange",
    clue: "También es el nombre de una fruta.",
    color: "#fb923c",
    options: ["Green", "Orange", "Black", "Purple"],
  },
  {
    prompt: "¿Cómo se dice 'violeta' en inglés?",
    answer: "Purple",
    clue: "Es un color parecido al morado.",
    color: "#a855f7",
    options: ["Pink", "Blue", "Purple", "Yellow"],
  },
  {
    prompt: "¿Cómo se dice 'blanco' en inglés?",
    answer: "White",
    clue: "Es el color de la nieve.",
    color: "#f8fafc",
    options: ["White", "Black", "Red", "Brown"],
  },
  {
    prompt: "¿Cómo se dice 'negro' en inglés?",
    answer: "Black",
    clue: "Es un color muy oscuro.",
    color: "#111827",
    options: ["Gray", "Yellow", "Black", "Orange"],
  },
];

export default function ColoresIngles() {
  return (
    <EnglishQuizGame
      title="Colores"
      subtitle="Elegí cómo se dice cada color en inglés"
      questions={questions}
      Icon={PaletteIcon}
    />
  );
}