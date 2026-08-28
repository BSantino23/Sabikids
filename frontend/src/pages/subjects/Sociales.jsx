import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/Sociales.css';

const juegos = [
  {
    id: 1,
    nombre: 'El Crucigrama Social',
    imagen: '/juegos/Sociales/juego1-crucigrama.png',
    ruta: '/juegos/sociales/crucigrama',
    clase: 'juego-1',
  },
  {
    id: 2,
    nombre: 'Reconocé las banderas',
    imagen: '/juegos/Sociales/juego2-banderas.png',
    ruta: '/juegos/sociales/banderas',
    clase: 'juego-2',
  },
  {
    id: 3,
    nombre: '¿Dónde pertenece?',
    imagen: '/juegos/Sociales/juego3-mundo.png',
    ruta: '/juegos/sociales/donde-pertenece',
    clase: 'juego-3',
  },
  {
    id: 4,
    nombre: 'Ubicá las provincias de Argentina',
    imagen: '/juegos/Sociales/juego4-argentina.png',
    ruta: '/juegos/sociales/provincias',
    clase: 'juego-4',
  },
  {
    id: 5,
    nombre: 'Rompecabezas',
    imagen: '/juegos/Sociales/juego5-rompecabezas.png',
    ruta: '/juegos/sociales/rompecabezas',
    clase: 'juego-5',
  },
];

export default function Sociales() {
  const navigate = useNavigate();

  const entrarAlJuego = (juego) => {
    navigate(juego.ruta);
  };

  return (
    <main className="sociales-mundo">

      {/* FONDO */}
      <img
        src="/juegos/Sociales/fondo-sociales.png"
        alt=""
        className="fondo-sociales"
      />

      {/* TABLERO */}
      <img
        src="/juegos/Sociales/tablero-sociales.png"
        alt=""
        className="tablero-sociales"
      />

      {/* TÍTULO */}
      <header className="sociales-titulo">
        <h1>Ciencias Sociales</h1>
        <p>Explorá, aprendé y divertite</p>
      </header>

      {/* JUEGOS */}
      <section className="sociales-juegos">

        {juegos.map((juego) => (
          <button
            key={juego.id}
            type="button"
            className={`sociales-juego ${juego.clase}`}
            onClick={() => entrarAlJuego(juego)}
            aria-label={`Abrir ${juego.nombre}`}
          >
            <img
              src={juego.imagen}
              alt={juego.nombre}
            />

            <span className="sociales-juego-nombre">
              {juego.nombre}
            </span>
          </button>
        ))}

      </section>

    </main>
  );
}