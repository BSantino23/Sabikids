import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Sociales/ProvinciasArgentina.css";

const niveles = [
  {
    id: 1,
    nombre: "Primer explorador",
    provincias: [
      { id: "jujuy", nombre: "Jujuy", region: "norte" },
      { id: "salta", nombre: "Salta", region: "norte" },
      { id: "tucuman", nombre: "Tucumán", region: "norte" },
      { id: "cordoba", nombre: "Córdoba", region: "centro" },
      { id: "santa-fe", nombre: "Santa Fe", region: "centro" },
      { id: "mendoza", nombre: "Mendoza", region: "centro" },
      { id: "neuquen", nombre: "Neuquén", region: "sur" },
      { id: "chubut", nombre: "Chubut", region: "sur" },
    ],
  },

  {
    id: 2,
    nombre: "Gran explorador",
    provincias: [
      { id: "jujuy", nombre: "Jujuy", region: "norte" },
      { id: "salta", nombre: "Salta", region: "norte" },
      { id: "formosa", nombre: "Formosa", region: "norte" },
      { id: "chaco", nombre: "Chaco", region: "norte" },
      { id: "tucuman", nombre: "Tucumán", region: "norte" },
      { id: "cordoba", nombre: "Córdoba", region: "centro" },
      { id: "santa-fe", nombre: "Santa Fe", region: "centro" },
      { id: "entre-rios", nombre: "Entre Ríos", region: "centro" },
      { id: "mendoza", nombre: "Mendoza", region: "centro" },
      { id: "buenos-aires", nombre: "Buenos Aires", region: "centro" },
      { id: "neuquen", nombre: "Neuquén", region: "sur" },
      { id: "rio-negro", nombre: "Río Negro", region: "sur" },
      { id: "chubut", nombre: "Chubut", region: "sur" },
      { id: "santa-cruz", nombre: "Santa Cruz", region: "sur" },
    ],
  },

  {
    id: 3,
    nombre: "Experto en Argentina",
    provincias: [
      { id: "jujuy", nombre: "Jujuy", region: "norte" },
      { id: "salta", nombre: "Salta", region: "norte" },
      { id: "formosa", nombre: "Formosa", region: "norte" },
      { id: "chaco", nombre: "Chaco", region: "norte" },
      { id: "tucuman", nombre: "Tucumán", region: "norte" },
      { id: "catamarca", nombre: "Catamarca", region: "norte" },
      {
        id: "santiago",
        nombre: "Santiago del Estero",
        region: "norte",
      },
      { id: "cordoba", nombre: "Córdoba", region: "centro" },
      { id: "santa-fe", nombre: "Santa Fe", region: "centro" },
      { id: "entre-rios", nombre: "Entre Ríos", region: "centro" },
      { id: "mendoza", nombre: "Mendoza", region: "centro" },
      { id: "san-juan", nombre: "San Juan", region: "centro" },
      { id: "san-luis", nombre: "San Luis", region: "centro" },
      { id: "la-pampa", nombre: "La Pampa", region: "centro" },
      { id: "buenos-aires", nombre: "Buenos Aires", region: "centro" },
      { id: "neuquen", nombre: "Neuquén", region: "sur" },
      { id: "rio-negro", nombre: "Río Negro", region: "sur" },
      { id: "chubut", nombre: "Chubut", region: "sur" },
      { id: "santa-cruz", nombre: "Santa Cruz", region: "sur" },
      {
        id: "tierra-del-fuego",
        nombre: "Tierra del Fuego",
        region: "sur",
      },
    ],
  },
];

function mezclar(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function ProvinciasArgentina() {
  const navigate = useNavigate();

  const [nivelActual, setNivelActual] = useState(0);
  const [provinciasDisponibles, setProvinciasDisponibles] = useState(
    mezclar(niveles[0].provincias)
  );

  const [colocadas, setColocadas] = useState({});
  const [arrastrando, setArrastrando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [completado, setCompletado] = useState(false);

  const nivel = niveles[nivelActual];

  const cambiarNivel = (index) => {
    setNivelActual(index);
    setProvinciasDisponibles(mezclar(niveles[index].provincias));
    setColocadas({});
    setArrastrando(null);
    setMensaje("");
    setCompletado(false);
  };

  const iniciarArrastre = (provincia) => {
    setArrastrando(provincia);
    setMensaje("");
  };

  const permitirSoltar = (e) => {
    e.preventDefault();
  };

  const colocarProvincia = (region) => {
    if (!arrastrando) return;

    if (arrastrando.region === region) {
      setColocadas((prev) => ({
        ...prev,
        [arrastrando.id]: arrastrando.nombre,
      }));

      setProvinciasDisponibles((prev) =>
        prev.filter((provincia) => provincia.id !== arrastrando.id)
      );

      setMensaje(`¡Muy bien! ${arrastrando.nombre} pertenece a esta región.`);

      const cantidadNueva = Object.keys(colocadas).length + 1;

      if (cantidadNueva === nivel.provincias.length) {
        setCompletado(true);
      }
    } else {
      setMensaje(
        `Todavía no. Pensá en qué parte de Argentina está ${arrastrando.nombre}.`
      );
    }

    setArrastrando(null);
  };

  const reiniciar = () => {
    setProvinciasDisponibles(mezclar(nivel.provincias));
    setColocadas({});
    setArrastrando(null);
    setMensaje("");
    setCompletado(false);
  };

  const cantidadColocadas = Object.keys(colocadas).length;

  return (
    <div className="provincias-page">

      {/* HEADER */}

      <header className="provincias-header">

        <button
          className="volver-btn"
          onClick={() => navigate("/juegos/sociales")}
        >
          ← Volver
        </button>

        <div className="titulo-provincias">

          <div className="icono-mapa">
            🇦🇷
          </div>

          <div>
            <span>CIENCIAS SOCIALES</span>

            <h1>Construí Argentina</h1>

            <p>
              Descubrí dónde pertenece cada provincia.
            </p>
          </div>

        </div>

        <div className="contador-provincias">
          <strong>{cantidadColocadas}</strong>
          <span>/ {nivel.provincias.length}</span>
        </div>

      </header>


      {/* NIVELES */}

      <div className="niveles-provincias">

        {niveles.map((item, index) => (

          <button
            key={item.id}
            className={
              index === nivelActual
                ? "nivel-provincia activo"
                : "nivel-provincia"
            }
            onClick={() => cambiarNivel(index)}
          >
            <span>{item.id}</span>
            Nivel {item.id}
          </button>

        ))}

      </div>


      {/* INSTRUCCIÓN */}

      <div className="instruccion-provincias">

        <div className="instruccion-icono">
          🗺️
        </div>

        <div>
          <strong>¡Armemos Argentina!</strong>

          <p>
            Arrastrá cada provincia hacia la región donde corresponde.
          </p>
        </div>

      </div>


      {/* MENSAJE */}

      {mensaje && (

        <div
          className={
            mensaje.startsWith("¡Muy bien")
              ? "mensaje-provincia correcto"
              : "mensaje-provincia error"
          }
        >
          {mensaje}
        </div>

      )}


      {/* JUEGO */}

      <main className="provincias-juego">

        {/* PROVINCIAS */}

        <aside className="bandeja-provincias">

          <div className="bandeja-header">

            <div className="bandeja-icono">
              📚
            </div>

            <div>
              <h2>Provincias</h2>
              <p>Arrastrá una para colocarla</p>
            </div>

          </div>


          <div className="tarjetas-provincias">

            {provinciasDisponibles.map((provincia) => (

              <div
                key={provincia.id}
                className="tarjeta-provincia"
                draggable
                onDragStart={() => iniciarArrastre(provincia)}
                onDragEnd={() => setArrastrando(null)}
              >

                <span className="arrastre">
                  ⋮⋮
                </span>

                <span>
                  {provincia.nombre}
                </span>

              </div>

            ))}

          </div>


          {provinciasDisponibles.length === 0 && (

            <div className="bandeja-completa">
              🎉
              <strong>¡Excelente!</strong>
              <span>Ya colocaste todas.</span>
            </div>

          )}

        </aside>


        {/* MAPA ESTILIZADO */}

        <section className="argentina-juego">

          <div className="mapa-titulo">

            <span>🇦🇷</span>

            <div>
              <h2>Argentina</h2>
              <p>Ubicá las provincias por región</p>
            </div>

          </div>


          <div className="argentina-forma">

            {/* NORTE */}

            <div
              className={
                arrastrando
                  ? "region region-norte preparada"
                  : "region region-norte"
              }
              onDragOver={permitirSoltar}
              onDrop={() => colocarProvincia("norte")}
            >

              <div className="region-titulo">
                <span>☀️</span>
                <div>
                  <strong>NORTE</strong>
                  <small>Región Norte</small>
                </div>
              </div>

              <div className="espacios-region">

                {nivel.provincias
                  .filter((p) => p.region === "norte")
                  .map((provincia) => (

                    <div
                      key={provincia.id}
                      className={
                        colocadas[provincia.id]
                          ? "espacio-provincia colocada"
                          : "espacio-provincia"
                      }
                    >
                      {colocadas[provincia.id] || "Arrastrá aquí"}
                    </div>

                  ))}

              </div>

            </div>


            {/* CENTRO */}

            <div
              className={
                arrastrando
                  ? "region region-centro preparada"
                  : "region region-centro"
              }
              onDragOver={permitirSoltar}
              onDrop={() => colocarProvincia("centro")}
            >

              <div className="region-titulo">
                <span>🌾</span>
                <div>
                  <strong>CENTRO</strong>
                  <small>Región Centro</small>
                </div>
              </div>

              <div className="espacios-region">

                {nivel.provincias
                  .filter((p) => p.region === "centro")
                  .map((provincia) => (

                    <div
                      key={provincia.id}
                      className={
                        colocadas[provincia.id]
                          ? "espacio-provincia colocada"
                          : "espacio-provincia"
                      }
                    >
                      {colocadas[provincia.id] || "Arrastrá aquí"}
                    </div>

                  ))}

              </div>

            </div>


            {/* SUR */}

            <div
              className={
                arrastrando
                  ? "region region-sur preparada"
                  : "region region-sur"
              }
              onDragOver={permitirSoltar}
              onDrop={() => colocarProvincia("sur")}
            >

              <div className="region-titulo">
                <span>🏔️</span>
                <div>
                  <strong>SUR</strong>
                  <small>Región Patagónica</small>
                </div>
              </div>

              <div className="espacios-region">

                {nivel.provincias
                  .filter((p) => p.region === "sur")
                  .map((provincia) => (

                    <div
                      key={provincia.id}
                      className={
                        colocadas[provincia.id]
                          ? "espacio-provincia colocada"
                          : "espacio-provincia"
                      }
                    >
                      {colocadas[provincia.id] || "Arrastrá aquí"}
                    </div>

                  ))}

              </div>

            </div>


            <div className="punta-argentina">
              🇦🇷
            </div>

          </div>

        </section>

      </main>


      {/* ACCIONES */}

      <div className="acciones-provincias">

        <button
          className="reiniciar-provincias"
          onClick={reiniciar}
        >
          ↻ Reiniciar
        </button>

      </div>


      {/* VICTORIA */}

      {completado && (

        <div className="victoria-overlay">

          <div className="victoria-provincias">

            <div className="victoria-bandera">
              🇦🇷
            </div>

            <div className="victoria-confeti">
              🎉
            </div>

            <h2>
              ¡Argentina completada!
            </h2>

            <p>
              ¡Excelente trabajo! Ubicaste todas
              las provincias del nivel.
            </p>

            {nivelActual < niveles.length - 1 ? (

              <button
                className="siguiente-nivel-btn"
                onClick={() => cambiarNivel(nivelActual + 1)}
              >
                Siguiente nivel →
              </button>

            ) : (

              <div className="nivel-final">
                🏆 ¡Completaste todos los niveles!
              </div>

            )}

            <button
              className="volver-mapa-btn"
              onClick={() => navigate("/juegos/sociales")}
            >
              ← Volver al mapa
            </button>

            <button
              className="jugar-nuevo-btn"
              onClick={reiniciar}
            >
              ↻ Jugar nuevamente
            </button>

          </div>

        </div>

      )}

    </div>
  );
}