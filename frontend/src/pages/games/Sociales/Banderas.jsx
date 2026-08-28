import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Sociales/banderas.css";

const niveles = [
  {
    id: 1,
    nombre: "Pequeño explorador",
    preguntas: [
      {
        bandera: "argentina",
        pais: "Argentina",
        opciones: ["Argentina", "Uruguay", "Chile", "México"],
      },
      {
        bandera: "brasil",
        pais: "Brasil",
        opciones: ["Colombia", "Brasil", "Perú", "Ecuador"],
      },
      {
        bandera: "uruguay",
        pais: "Uruguay",
        opciones: ["Argentina", "Uruguay", "Paraguay", "Chile"],
      },
      {
        bandera: "chile",
        pais: "Chile",
        opciones: ["Chile", "México", "Perú", "Bolivia"],
      },
    ],
  },

  {
    id: 2,
    nombre: "Gran explorador",
    preguntas: [
      {
        bandera: "mexico",
        pais: "México",
        opciones: ["México", "España", "Italia", "Colombia"],
      },
      {
        bandera: "peru",
        pais: "Perú",
        opciones: ["Bolivia", "Perú", "Ecuador", "Chile"],
      },
      {
        bandera: "colombia",
        pais: "Colombia",
        opciones: ["Venezuela", "Colombia", "Ecuador", "Panamá"],
      },
      {
        bandera: "españa",
        pais: "España",
        opciones: ["España", "Portugal", "Italia", "Francia"],
      },
      {
        bandera: "italia",
        pais: "Italia",
        opciones: ["Italia", "México", "Irlanda", "Francia"],
      },
    ],
  },

  {
    id: 3,
    nombre: "Experto en banderas",
    preguntas: [
      {
        bandera: "francia",
        pais: "Francia",
        opciones: ["Francia", "Italia", "Países Bajos", "Rusia"],
      },
      {
        bandera: "japon",
        pais: "Japón",
        opciones: ["Japón", "China", "Corea del Sur", "Vietnam"],
      },
      {
        bandera: "alemania",
        pais: "Alemania",
        opciones: ["Bélgica", "Alemania", "Austria", "Rumania"],
      },
      {
        bandera: "canada",
        pais: "Canadá",
        opciones: ["Estados Unidos", "Canadá", "Inglaterra", "Australia"],
      },
      {
        bandera: "portugal",
        pais: "Portugal",
        opciones: ["Portugal", "España", "Italia", "Brasil"],
      },
      {
        bandera: "corea",
        pais: "Corea del Sur",
        opciones: ["Japón", "China", "Corea del Sur", "Tailandia"],
      },
    ],
  },
];

export default function Banderas() {
  const navigate = useNavigate();

  const [nivelActual, setNivelActual] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [correcta, setCorrecta] = useState(null);
  const [completado, setCompletado] = useState(false);

  const nivel = niveles[nivelActual];
  const pregunta = nivel.preguntas[preguntaActual];

  const seleccionarRespuesta = (respuesta) => {
    if (correcta === true) return;

    setRespuestaSeleccionada(respuesta);

    if (respuesta === pregunta.pais) {
      setCorrecta(true);

      setTimeout(() => {
        if (preguntaActual < nivel.preguntas.length - 1) {
          setPreguntaActual((prev) => prev + 1);
          setRespuestaSeleccionada(null);
          setCorrecta(null);
        } else {
          setCompletado(true);
        }
      }, 900);
    } else {
      setCorrecta(false);
    }
  };

  const seleccionarNivel = (index) => {
    setNivelActual(index);
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setCorrecta(null);
    setCompletado(false);
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setRespuestaSeleccionada(null);
    setCorrecta(null);
    setCompletado(false);
  };

  const siguienteNivel = () => {
    if (nivelActual < niveles.length - 1) {
      seleccionarNivel(nivelActual + 1);
    }
  };

  return (
    <div className="banderas-page">

      {/* HEADER */}

      <header className="banderas-header">

        <button
          className="volver-btn"
          onClick={() => navigate("/juegos/sociales")}
        >
          ← Volver
        </button>

        <div className="titulo-banderas">

          <div className="icono-banderas">
            🌎
          </div>

          <div>
            <span>CIENCIAS SOCIALES</span>

            <h1>Reconocé las banderas</h1>

            <p>
              Mirá la bandera y descubrí de qué país es
            </p>
          </div>

        </div>

        <div className="nivel-indicador">
          NIVEL
          <strong>{nivel.id}</strong>
        </div>

      </header>


      {/* SELECTOR DE NIVELES */}

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


      {/* CONTENIDO */}

      <main className="bandera-contenido">

        <section className="juego-banderas">

          {/* PROGRESO */}

          <div className="progreso">

            <div className="progreso-texto">
              <span>Pregunta</span>

              <strong>
                {preguntaActual + 1}
                <small> / {nivel.preguntas.length}</small>
              </strong>
            </div>

            <div className="barra-progreso">
              <div
                style={{
                  width: `${
                    ((preguntaActual + 1) /
                      nivel.preguntas.length) *
                    100
                  }%`,
                }}
              />
            </div>

          </div>


          {/* TÍTULO */}

          <div className="pregunta-titulo">

            <span>🌎</span>

            <div>
              <h2>
                ¿De qué país es esta bandera?
              </h2>

              <p>
                Elegí la respuesta correcta
              </p>
            </div>

          </div>


          {/* BANDERA */}

          <div className="bandera-contenedor">

            <div className="bandera-marco">

              <img
                src={`/juegos/Sociales/banderas/${pregunta.bandera}.png`}
                alt={`Bandera de ${pregunta.pais}`}
              />

            </div>

          </div>


          {/* MENSAJE */}

          {correcta === true && (

            <div className="mensaje resultado-correcto">
              🎉 ¡Muy bien! ¡Es {pregunta.pais}!
            </div>

          )}

          {correcta === false && (

            <div className="mensaje resultado-error">
              💭 Casi... probá con otra respuesta.
            </div>

          )}


          {/* OPCIONES */}

          <div className="opciones">

            {pregunta.opciones.map((opcion) => {

              const esSeleccionada =
                respuestaSeleccionada === opcion;

              const esCorrecta =
                opcion === pregunta.pais;

              let clase = "opcion";

              if (esSeleccionada && correcta === false) {
                clase += " incorrecta";
              }

              if (esCorrecta && correcta === true) {
                clase += " correcta";
              }

              return (

                <button
                  key={opcion}
                  className={clase}
                  onClick={() =>
                    seleccionarRespuesta(opcion)
                  }
                  disabled={correcta === true}
                >

                  <span className="opcion-icono">
                    {esCorrecta && correcta === true
                      ? "✓"
                      : esSeleccionada && correcta === false
                      ? "✕"
                      : "🌎"}
                  </span>

                  <span>{opcion}</span>

                </button>

              );

            })}

          </div>


          {/* AYUDA */}

          <div className="ayuda-banderas">

            <div className="ayuda-icono">
              💡
            </div>

            <div>
              <span>AYUDA</span>

              <p>
                Observá los colores y los símbolos
                de la bandera.
              </p>
            </div>

          </div>


          {/* REINICIAR */}

          <button
            className="reiniciar-btn"
            onClick={reiniciar}
          >
            ↻ Reiniciar pregunta
          </button>

        </section>


        {/* PANEL LATERAL */}

        <aside className="info-banderas">

          <div className="info-icono">
            🗺️
          </div>

          <h2>
            Explorá el mundo
          </h2>

          <p>
            Las banderas son símbolos que
            representan a los países.
          </p>

          <div className="dato">

            <span>🏳️</span>

            <div>
              <strong>
                Observá
              </strong>

              <p>
                Mirá atentamente los colores.
              </p>
            </div>

          </div>

          <div className="dato">

            <span>🔎</span>

            <div>
              <strong>
                Pensá
              </strong>

              <p>
                Compará las opciones.
              </p>
            </div>

          </div>

          <div className="dato">

            <span>⭐</span>

            <div>
              <strong>
                Aprendé
              </strong>

              <p>
                Cada respuesta te ayuda a conocer
                un nuevo país.
              </p>
            </div>

          </div>

        </aside>

      </main>


      {/* VICTORIA */}

      {completado && (

        <div className="victoria-overlay">

          <div className="victoria">

            <div className="victoria-icon">
              🎉
            </div>

            <h2>
              ¡Excelente trabajo!
            </h2>

            <p>
              Completaste todas las banderas
              del {nivel.nombre}.
            </p>

            {nivelActual < niveles.length - 1 ? (

              <button
                className="siguiente-btn"
                onClick={siguienteNivel}
              >
                Siguiente nivel →
              </button>

            ) : (

              <div className="final-text">
                🏆 ¡Completaste todos los niveles!
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