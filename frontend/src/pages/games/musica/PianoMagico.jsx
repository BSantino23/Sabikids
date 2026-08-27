import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useNavigate } from 'react-router-dom';

import '../../../styles/musica/PianoMagico.css';

const NOTAS = [
  { id: 'do', nombre: 'DO 🔴', color: '#ff3b30', freq: 261.63 },
  { id: 're', nombre: 'RE 🟡', color: '#ffcc00', freq: 293.66 },
  { id: 'mi', nombre: 'MI 🟢', color: '#34c759', freq: 329.63 },
  { id: 'fa', nombre: 'FA 🔵', color: '#007aff', freq: 349.23 },
  { id: 'sol', nombre: 'SOL 🟣', color: '#af52de', freq: 392.00 },
];

export default function PianoMagico() {
  const navigate = useNavigate();
  const [secuencia, setSecuencia] = useState([]);
  const [pasoUsuario, setPasoUsuario] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState('inicio'); 
  const [mensaje, setMensaje] = useState('¡Prepará tus dedos para tocar la música mágica!');
  const [puntos, setPuntos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [teclaIluminada, setTeclaIluminada] = useState(null);
  const [festejo, setFestejo] = useState(false);

  const reproducirSonido = (freq) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log('Audio no soportado');
    }
  };

  const iniciarJuego = () => {
    setSecuencia([]);
    setPuntos(0);
    setNivel(1);
    setFestejo(false);
    siguienteNivel([]);
  };

  const siguienteNivel = (secuenciaActual) => {
    setEstadoJuego('mostrando');
    setFestejo(false);
    setMensaje(`🎵 Nivel ${nivel}: ¡Mirá bien las luces de colores! 👀`);
    setPasoUsuario(0);

    const notaAleatoria = NOTAS[Math.floor(Math.random() * NOTAS.length)];
    const nuevaSecuencia = [...secuenciaActual, notaAleatoria];
    setSecuencia(nuevaSecuencia);

    reproducirSecuencia(nuevaSecuencia);
  };

  const reproducirSecuencia = (sec) => {
    sec.forEach((nota, index) => {
      setTimeout(() => {
        setTeclaIluminada(nota.id);
        reproducirSonido(nota.freq);
        setTimeout(() => setTeclaIluminada(null), 450);
      }, (index + 1) * 750);
    });

    setTimeout(() => {
      setEstadoJuego('turnousuario');
      setMensaje('✨ ¡Ahora te toca a vos! Repetí la melodía 🎶');
    }, (sec.length + 1) * 750);
  };

  const handleNotaClick = (nota) => {
    if (estadoJuego !== 'turnousuario') return;

    reproducirSonido(nota.freq);
    setTeclaIluminada(nota.id);
    setTimeout(() => setTeclaIluminada(null), 250);

    if (nota.id === secuencia[pasoUsuario].id) {
      const proximoPaso = pasoUsuario + 1;

      if (proximoPaso === secuencia.length) {
        const nuevoPuntaje = puntos + 30;
        const nuevoNivel = nivel + 1;
        setPuntos(nuevoPuntaje);
        setNivel(nuevoNivel);
        setEstadoJuego('ganado');
        setFestejo(true);
        setMensaje('🎉 ¡Increíble! ¡Pasaste al siguiente nivel! 🚀');
        
        setTimeout(() => {
          siguienteNivel(secuencia);
        }, 1800);
      } else {
        setPasoUsuario(proximoPaso);
      }
    } else {
      setEstadoJuego('perdido');
      setFestejo(false);
      setMensaje('💥 ¡Casi casi! No te preocupes, ¡probá de nuevo y demostrá lo que sabés! 💪');
    }
  };

  return (
    <Box className="piano-page">
      {/* BOTÓN VOLVER */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/juegos/musica')}
        className="back-music-button"
      >
        Volver a Música
      </Button>

      {/* TÍTULO Y ESTADÍSTICAS LLAMATIVAS */}
      <Box className="piano-header">
        <Typography variant="h1" className="piano-title">
          🎹 ¡El gran Piano Mágico! ✨
        </Typography>
        <Box className="piano-stats-container">
          <Paper elevation={4} className="piano-score-card">
            <StarIcon style={{ color: '#ffcc00', marginRight: 4 }} />
            <Typography variant="h6">Nivel: <strong>{nivel}</strong></Typography>
          </Paper>
          <Paper elevation={4} className="piano-score-card">
            <EmojiEventsIcon style={{ color: '#ff9500', marginRight: 4 }} />
            <Typography variant="h6">Puntaje: <strong>{puntos}</strong></Typography>
          </Paper>
        </Box>
      </Box>

      {/* ÁREA DE JUEGO */}
      <Box className={`piano-game-container ${festejo ? 'festejo-animacion' : ''}`}>
        <Typography className="piano-message">{mensaje}</Typography>

        {(estadoJuego === 'inicio' || estadoJuego === 'perdido') && (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={iniciarJuego}
            className="piano-start-button"
          >
            {estadoJuego === 'perdido' ? '🔄 ¡Reintentar Partida!' : '🚀 ¡Comenzar Aventura!'}
          </Button>
        )}

        {/* TECLADO INTERACTIVO SÚPER COLORIDO */}
        <Box className="piano-keyboard">
          {NOTAS.map((nota) => (
            <button
              key={nota.id}
              className={`piano-key ${teclaIluminada === nota.id ? 'active-light' : ''}`}
              style={{ backgroundColor: nota.color }}
              onClick={() => handleNotaClick(nota)}
            >
              <span className="key-label">{nota.nombre}</span>
            </button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}