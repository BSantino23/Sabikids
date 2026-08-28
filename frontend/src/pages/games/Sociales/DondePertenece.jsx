import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Sociales/DondePertenece.css";

const niveles = [
  {
    id: 1,
    nombre: "Pequeño explorador",
    descripcion: "Relacioná cada elemento con el lugar correcto.",
    preguntas: [
      {
        imagen: "/juegos/Sociales/DondePertenece/mate.png",
        nombre: "Mate",
        opciones: ["Argentina", "Egipto", "Japón"],
        correcta: "Argentina",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/cataratas.png",
        nombre: "Cataratas del Iguazú",
        opciones: ["Misiones", "Mendoza", "Chubut"],
        correcta: "Misiones",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/patagonia.png",
        nombre: "Patagonia",
        opciones: ["Sur de Argentina", "Norte de Argentina", "Europa"],
        correcta: "Sur de Argentina",
      },
    ],
  },

  {
    id: 2,
    nombre: "Explorador",
    descripcion: "Ahora aparecen nuevos lugares y elementos.",
    preguntas: [
      {
        imagen: "/juegos/Sociales/DondePertenece/buenosaires.png",
        nombre: "Buenos Aires",
        opciones: ["Argentina", "Brasil", "Chile"],
        correcta: "Argentina",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/quebrada.png",
        nombre: "Quebrada de Humahuaca",
        opciones: ["Jujuy", "Santa Fe", "Tierra del Fuego"],
        correcta: "Jujuy",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/gaucho.png",
        nombre: "Gaucho",
        opciones: ["Cultura argentina", "Cultura japonesa", "Cultura egipcia"],
        correcta: "Cultura argentina",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/monumento.png",
        nombre: "Monumento",
        opciones: ["Patrimonio cultural", "Animal", "Planeta"],
        correcta: "Patrimonio cultural",
      },
    ],
  },

  {
    id: 3,
    nombre: "Gran explorador",
    descripcion: "¡Último desafío! Prestá mucha atención.",
    preguntas: [
      {
        imagen: "/juegos/Sociales/DondePertenece/iguazu.png",
        nombre: "Iguazú",
        opciones: ["Misiones", "Córdoba", "Neuquén"],
        correcta: "Misiones",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/casa.png",
        nombre: "Casa",
        opciones: ["Lugar donde viven personas", "Río", "Montaña"],
        correcta: "Lugar donde viven personas",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/bandera.png",
        nombre: "Bandera argentina",
        opciones: ["Símbolo patrio", "Animal", "Paisaje"],
        correcta: "Símbolo patrio",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/mate.png",
        nombre: "Mate",
        opciones: ["Tradición", "Provincia", "Monumento"],
        correcta: "Tradición",
      },
      {
        imagen: "/juegos/Sociales/DondePertenece/patagonia.png",
        nombre: "Patagonia",
        opciones: ["Región", "Ciudad", "País"],
        correcta: "Región",
      },
    ],
  },
];

export default function DondePertenece() {
  const navigate = useNavigate();

  const [nivelActual, setNivelActual] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState("");
  const [correctas, setCorrectas] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("");
  const [finalizado, setFinalizado] = useState(false);

  const nivel = niveles[nivelActual];
  const pregunta = nivel.preguntas[preguntaActual];

  const seleccionarRespuesta = (respuesta) => {
    if (estado === "correcta") return;

    setRespuestaSeleccionada(respuesta);

    if (respuesta === pregunta.correcta) {
      setEstado("correcta");
      setMensaje("¡Muy bien! 🎉");
      setCorrectas((prev) => prev + 1);
    } else {
      setEstado("incorrecta");
      setMensaje("Casi... ¡Probá otra vez! 💪");
    }
  };

  const siguientePregunta = () => {
    if (estado !== "correcta") return;

    if (preguntaActual < nivel.preguntas.length - 1) {
      setPreguntaActual((prev) => prev + 1);
      setRespuestaSeleccionada("");
      setMensaje("");
      setEstado("");
    } else {
      setFinalizado(true);
    }
  };

  const cambiarNivel = (index) => {
    setNivelActual(index);
    setPreguntaActual(0);
    setRespuestaSeleccionada("");
    setCorrectas(0);
    setMensaje("");
    setEstado("");
    setFinalizado(false);
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setRespuestaSeleccionada("");
    setCorrectas(0);
    setMensaje("");
    setEstado("");
    setFinalizado(false);
  };

  const volverAlMapa = () => {
    navigate("/juegos/sociales");
  };

  return (
    <div className="donde-pertenece-page">

      {/* HEADER */}

      <header className="dp-header">

        <button
          className="dp-volver"
          onClick={volverAlMapa}
        >
          ← Volver
        </button>

        <div className="dp-titulo">

          <div className="dp-icono">
            🌎
          </div>

          <div>
            <span>CIENCIAS SOCIALES</span>

            <h1>
              ¿Dónde pertenece?
            </h1>

            <p>
              Relacioná cada elemento con el lugar correcto
            </p>
          </div>

        </div>

        <div className="dp-nivel">
          <small>NIVEL</small>
          <strong>{nivel.id}</strong>
        </div>

      </header>


      {/* NIVELES */}

      <div className="dp-niveles">

        {niveles.map((item, index) => (

          <button
            key={item.id}
            className={
              index === nivelActual
                ? "dp-nivel-btn activo"
                : "dp-nivel-btn"
            }
            onClick={() => cambiarNivel(index)}
          >

            <span>
              {item.id}
            </span>

            Nivel {item.id}

          </button>

        ))}

      </div>


      {/* CONTENIDO */}

      <main className="dp-contenido">

        <section className="dp-juego">

          <div className="dp-progreso">

            <div>

              <span>
                PROGRESO
              </span>

              <strong>
                {preguntaActual + 1} / {nivel.preguntas.length}
              </strong>

            </div>

            <div className="dp-barra">
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


          <div className="dp-instruccion">

            <span>
              🧭
            </span>

            <div>
              <h2>
                {nivel.nombre}
              </h2>

              <p>
                {nivel.descripcion}
              </p>
            </div>

          </div>


          {/* TARJETA */}

          <div className="dp-pregunta">

            <div className="dp-imagen-container">

              <img
                src={pregunta.imagen}
                alt={pregunta.nombre}
                className="dp-imagen"
              />

            </div>

            <h2>
              ¿Dónde pertenece?
            </h2>

            <p className="dp-elemento">
              {pregunta.nombre}
            </p>


            {/* OPCIONES */}

            <div className="dp-opciones">

              {pregunta.opciones.map((opcion, index) => {

                let clase = "dp-opcion";

                if (
                  respuestaSeleccionada === opcion &&
                  estado === "correcta"
                ) {
                  clase += " correcta";
                }

                if (
                  respuestaSeleccionada === opcion &&
                  estado === "incorrecta"
                ) {
                  clase += " incorrecta";
                }

                return (
                  <button
                    key={opcion}
                    className={clase}
                    onClick={() =>
                      seleccionarRespuesta(opcion)
                    }
                  >

                    <span className="dp-opcion-numero">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>
                      {opcion}
                    </span>

                  </button>
                );
              })}

            </div>


            {/* MENSAJE */}

            {mensaje && (

              <div
                className={
                  estado === "correcta"
                    ? "dp-mensaje correcto"
                    : "dp-mensaje incorrecto"
                }
              >
                {mensaje}
              </div>

            )}


            {/* SIGUIENTE */}

            {estado === "correcta" && (

              <button
                className="dp-siguiente"
                onClick={siguientePregunta}
              >
                {preguntaActual ===
                nivel.preguntas.length - 1
                  ? "Terminar nivel 🎉"
                  : "Siguiente →"}
              </button>

            )}

          </div>

        </section>


        {/* PANEL DERECHO */}

        <aside className="dp-info">

          <div className="dp-info-icon">
            💡
          </div>

          <h2>
            ¿Cómo jugar?
          </h2>

          <p>
            Mirá con atención la imagen y elegí
            la opción que corresponda.
          </p>


          <div className="dp-pasos">

            <div>
              <span>1</span>
              <p>
                Observá el elemento.
              </p>
            </div>

            <div>
              <span>2</span>
              <p>
                Pensá dónde pertenece.
              </p>
            </div>

            <div>
              <span>3</span>
              <p>
                Elegí la respuesta.
              </p>
            </div>

          </div>


          <div className="dp-recordatorio">

            <span>
              🧠
            </span>

            <p>
              No hay límite de tiempo.
              ¡Pensá tranquilo!
            </p>

          </div>

        </aside>

      </main>


      {/* VICTORIA */}

      {finalizado && (

        <div className="dp-overlay">

          <div className="dp-victoria">

            <div className="dp-victoria-icon">
              🎉
            </div>

            <h2>
              ¡Excelente!
            </h2>

            <p>
              Completaste el nivel {nivel.id}.
            </p>

            <div className="dp-resultado">

              <strong>
                {correctas}
              </strong>

              <span>
                respuestas correctas
              </span>

            </div>


            {nivelActual < niveles.length - 1 ? (

              <button
                className="dp-siguiente-nivel"
                onClick={() =>
                  cambiarNivel(nivelActual + 1)
                }
              >
                Siguiente nivel →
              </button>

            ) : (

              <div className="dp-todos">
                🏆 ¡Completaste todos los niveles!
              </div>

            )}


            <button
              className="dp-reiniciar"
              onClick={reiniciar}
            >
              ↻ Jugar nuevamente
            </button>

            <button
              className="dp-volver-mapa"
              onClick={volverAlMapa}
            >
              Volver al mapa
            </button>

          </div>

        </div>

      )}

    </div>
  );
}