import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ExtensionRoundedIcon from "@mui/icons-material/ExtensionRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import "../../../styles/Sociales/CrucigramaSocial.css";

const niveles = [
  {
    id: 1,
    nombre: "Explorador inicial",
    ayuda: "ARGENTINA",
    filas: 11,
    columnas: 11,

    palabras: [
      {
        id: 1,
        palabra: "MAPA",
        pista: "Representación de un lugar.",
        direccion: "H",
        fila: 3,
        columna: 2,
      },
      {
        id: 2,
        palabra: "PAIS",
        pista: "Territorio con un gobierno propio.",
        direccion: "V",
        fila: 1,
        columna: 4,
      },
      {
        id: 3,
        palabra: "RIO",
        pista: "Corriente natural de agua.",
        direccion: "V",
        fila: 3,
        columna: 7,
      },
      {
        id: 4,
        palabra: "CULTURA",
        pista: "Costumbres y tradiciones de un pueblo.",
        direccion: "H",
        fila: 5,
        columna: 1,
      },
      {
        id: 5,
        palabra: "BANDERA",
        pista: "Símbolo que representa a un país.",
        direccion: "V",
        fila: 4,
        columna: 9,
      },
      {
        id: 6,
        palabra: "SOL",
        pista: "Está en el centro de nuestro sistema planetario.",
        direccion: "H",
        fila: 8,
        columna: 5,
      },
    ],
  },

  {
    id: 2,
    nombre: "Explorador",
    ayuda: "ARGENTINA",
    filas: 12,
    columnas: 13,

    palabras: [
      {
        id: 1,
        palabra: "MAPA",
        pista: "Representación de un lugar.",
        direccion: "H",
        fila: 3,
        columna: 2,
      },
      {
        id: 2,
        palabra: "PAIS",
        pista: "Territorio con un gobierno propio.",
        direccion: "V",
        fila: 1,
        columna: 4,
      },
      {
        id: 3,
        palabra: "RIO",
        pista: "Corriente natural de agua.",
        direccion: "V",
        fila: 3,
        columna: 7,
      },
      {
        id: 4,
        palabra: "CULTURA",
        pista: "Costumbres y tradiciones de un pueblo.",
        direccion: "H",
        fila: 5,
        columna: 1,
      },
      {
        id: 5,
        palabra: "BANDERA",
        pista: "Símbolo que representa a un país.",
        direccion: "V",
        fila: 4,
        columna: 9,
      },
      {
        id: 6,
        palabra: "SOL",
        pista: "Está en el centro de nuestro sistema planetario.",
        direccion: "H",
        fila: 7,
        columna: 5,
      },
      {
        id: 7,
        palabra: "CIUDAD",
        pista: "Lugar donde viven muchas personas.",
        direccion: "H",
        fila: 9,
        columna: 2,
      },
      {
        id: 8,
        palabra: "REGION",
        pista: "Parte de un territorio con características propias.",
        direccion: "V",
        fila: 6,
        columna: 11,
      },
    ],
  },

  {
    id: 3,
    nombre: "Gran explorador",
    ayuda: "ARGENTINA",
    filas: 15,
    columnas: 15,

    palabras: [
      {
        id: 1,
        palabra: "MAPA",
        pista: "Representación de un lugar.",
        direccion: "H",
        fila: 3,
        columna: 2,
      },
      {
        id: 2,
        palabra: "PAIS",
        pista: "Territorio con un gobierno propio.",
        direccion: "V",
        fila: 1,
        columna: 4,
      },
      {
        id: 3,
        palabra: "RIO",
        pista: "Corriente natural de agua.",
        direccion: "V",
        fila: 3,
        columna: 7,
      },
      {
        id: 4,
        palabra: "CULTURA",
        pista: "Costumbres y tradiciones de un pueblo.",
        direccion: "H",
        fila: 5,
        columna: 1,
      },
      {
        id: 5,
        palabra: "BANDERA",
        pista: "Símbolo que representa a un país.",
        direccion: "V",
        fila: 4,
        columna: 9,
      },
      {
        id: 6,
        palabra: "SOL",
        pista: "Está en el centro de nuestro sistema planetario.",
        direccion: "H",
        fila: 7,
        columna: 5,
      },
      {
        id: 7,
        palabra: "CIUDAD",
        pista: "Lugar donde viven muchas personas.",
        direccion: "H",
        fila: 9,
        columna: 2,
      },
      {
        id: 8,
        palabra: "REGION",
        pista: "Parte de un territorio con características propias.",
        direccion: "V",
        fila: 6,
        columna: 11,
      },
      {
        id: 9,
        palabra: "HISTORIA",
        pista: "Estudia los hechos del pasado.",
        direccion: "H",
        fila: 11,
        columna: 1,
      },
      {
        id: 10,
        palabra: "PATRIA",
        pista: "Lugar con el que una persona se siente identificada.",
        direccion: "V",
        fila: 8,
        columna: 6,
      },
    ],
  },
];

function construirTablero(nivel) {
  const tablero = {};

  nivel.palabras.forEach((item) => {
    const letras = item.palabra.split("");

    letras.forEach((letra, index) => {
      const fila =
        item.direccion === "H"
          ? item.fila
          : item.fila + index;

      const columna =
        item.direccion === "H"
          ? item.columna + index
          : item.columna;

      const key = `${fila}-${columna}`;

      if (!tablero[key]) {
        tablero[key] = {
          fila,
          columna,
          letra,
          palabras: [],
          numero: null,
        };
      }

      if (tablero[key].letra === letra) {
        tablero[key].palabras.push(item.id);
      } else if (tablero[key].palabras.length === 0) {
        tablero[key].letra = letra;
        tablero[key].palabras.push(item.id);
      }

      if (index === 0) {
        tablero[key].numero = item.id;
      }
    });
  });

  return tablero;
}

export default function CrucigramaSocial() {
  const navigate = useNavigate();

  const [nivelActual, setNivelActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [palabraActiva, setPalabraActiva] = useState(null);
  const [completado, setCompletado] = useState(false);

  const nivel = niveles[nivelActual];

  const tablero = useMemo(
    () => construirTablero(nivel),
    [nivel]
  );

  const seleccionarNivel = (index) => {
    setNivelActual(index);
    setRespuestas({});
    setPalabraActiva(null);
    setCompletado(false);
  };

  const escribirLetra = (key, valor) => {
    const letra = valor
      .toUpperCase()
      .replace(/[^A-ZÑ]/g, "")
      .slice(-1);

    setRespuestas((prev) => ({
      ...prev,
      [key]: letra,
    }));
  };

  const comprobar = () => {
    const todasCorrectas = Object.entries(tablero).every(
      ([key, celda]) =>
        respuestas[key] === celda.letra
    );

    if (todasCorrectas) {
      setCompletado(true);
    } else {
      setCompletado(false);

      alert(
        "Todavía falta completar algunas letras. ¡Vos podés!"
      );
    }
  };

  const reiniciar = () => {
    setRespuestas({});
    setPalabraActiva(null);
    setCompletado(false);
  };

  const obtenerClaseCelda = (celda, key) => {
    let clase = "celda";

    if (
      palabraActiva &&
      celda.palabras.includes(palabraActiva)
    ) {
      clase += " palabra-activa";
    }

    if (
      respuestas[key] &&
      respuestas[key] === celda.letra
    ) {
      clase += " letra-correcta";
    }

    return clase;
  };

  return (
    <div className="crucigrama-page">

      <header className="crucigrama-header">

        <button
          className="volver-btn"
          onClick={() => navigate("/juegos/sociales")}
        >
          <ArrowBackRoundedIcon fontSize="small" />
          Volver
        </button>

        <div className="titulo-crucigrama">

          <div className="icono-crucigrama">
            <ExtensionRoundedIcon />
          </div>

          <div>
            <span>CIENCIAS SOCIALES</span>

            <h1>
              El Crucigrama Social
            </h1>

            <p>
              Descubrí las palabras y aprendé jugando
            </p>
          </div>

        </div>

        <div className="nivel-indicador">
          NIVEL
          <strong>{nivel.id}</strong>
        </div>

      </header>

      <div className="selector-niveles">

        {niveles.map((item, index) => (
          <button
            key={item.id}
            className={
              index === nivelActual
                ? "nivel-btn seleccionado"
                : "nivel-btn"
            }
            onClick={() => seleccionarNivel(index)}
          >
            <span>{item.id}</span>
            Nivel {item.id}
          </button>
        ))}

      </div>

      <main className="crucigrama-contenido">

        <section className="tablero-seccion">

          <div className="tablero-titulo">
            <h2>{nivel.nombre}</h2>
            <p>Completá las casillas con las respuestas.</p>
          </div>

          <div className="tablero-wrapper">

            <div
              className="tablero"
              style={{
                gridTemplateColumns:
                  `repeat(${nivel.columnas}, 46px)`,
                gridTemplateRows:
                  `repeat(${nivel.filas}, 46px)`,
              }}
            >

              {Array.from({
                length:
                  nivel.filas *
                  nivel.columnas,
              }).map((_, index) => {

                const fila =
                  Math.floor(
                    index / nivel.columnas
                  );

                const columna =
                  index % nivel.columnas;

                const key =
                  `${fila}-${columna}`;

                const celda =
                  tablero[key];

                if (!celda) {
                  return (
                    <div
                      key={key}
                      className="casilla-negra"
                    />
                  );
                }

                const esCorrecta =
                  respuestas[key] === celda.letra;

                return (
                  <div
                    key={key}
                    className={obtenerClaseCelda(
                      celda,
                      key
                    )}
                  >

                    {celda.numero && (
                      <span className="numero-celda">
                        {celda.numero}
                      </span>
                    )}

                    <input
                      type="text"
                      maxLength="1"
                      value={
                        respuestas[key] || ""
                      }
                      onFocus={() => {
                        if (
                          celda.palabras.length
                        ) {
                          setPalabraActiva(
                            celda.palabras[0]
                          );
                        }
                      }}
                      onChange={(e) =>
                        escribirLetra(
                          key,
                          e.target.value
                        )
                      }
                      className={
                        esCorrecta
                          ? "input-correcto"
                          : ""
                      }
                      aria-label="Casilla del crucigrama"
                    />

                  </div>
                );
              })}

            </div>

          </div>

          <div className="ayuda-box">

            <div className="ayuda-icon">
              <LightbulbRoundedIcon />
            </div>

            <div>
              <span>PALABRA DE AYUDA</span>
              <strong>{nivel.ayuda}</strong>
            </div>

          </div>

          <div className="acciones">

            <button
              className="comprobar-btn"
              onClick={comprobar}
            >
              <CheckRoundedIcon fontSize="small" />
              Comprobar
            </button>

            <button
              className="reiniciar-btn"
              onClick={reiniciar}
            >
              <RestartAltRoundedIcon fontSize="small" />
              Reiniciar
            </button>

          </div>

        </section>

        <aside className="pistas-seccion">

          <div className="pistas-header">

            <div className="bombilla">
              <LightbulbRoundedIcon />
            </div>

            <div>
              <h2>Pistas</h2>
              <p>Leé y descubrí la respuesta</p>
            </div>

          </div>

          <div className="pistas-lista">

            {nivel.palabras.map((item) => (
              <button
                key={item.id}
                className={
                  palabraActiva === item.id
                    ? "pista activa"
                    : "pista"
                }
                onClick={() =>
                  setPalabraActiva(item.id)
                }
              >

                <span className="numero-pista">
                  {item.id}
                </span>

                <span className="pista-contenido">

                  <strong>
                    {item.direccion === "H"
                      ? "Horizontal"
                      : "Vertical"}
                  </strong>

                  <span>
                    {item.pista}
                  </span>

                </span>

              </button>
            ))}

          </div>

          <div className="mensaje-ayuda">

            <span>
              <PsychologyRoundedIcon />
            </span>

            <p>
              Pensá tranquilo. No hay límite
              de tiempo.
            </p>

          </div>

        </aside>

      </main>

      {completado && (

        <div className="victoria-overlay">

          <div className="victoria">

            <div className="victoria-icon">
              <CelebrationRoundedIcon />
            </div>

            <h2>
              ¡Excelente trabajo!
            </h2>

            <p>
              Completaste correctamente
              el crucigrama.
            </p>

            {nivelActual <
            niveles.length - 1 ? (

              <button
                className="siguiente-btn"
                onClick={() =>
                  seleccionarNivel(
                    nivelActual + 1
                  )
                }
              >
                Siguiente nivel
                <ArrowForwardRoundedIcon fontSize="small" />
              </button>

            ) : (

              <div className="final-text">
                <EmojiEventsRoundedIcon />
                ¡Completaste todos los niveles!
              </div>

            )}

            <button
              className="volver-mapa-btn"
              onClick={() =>
                navigate("/juegos/sociales")
              }
            >
              Volver al mapa
            </button>

          </div>

        </div>

      )}

    </div>
  );
}