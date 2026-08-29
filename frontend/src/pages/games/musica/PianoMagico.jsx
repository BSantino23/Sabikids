import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useNavigate } from 'react-router-dom';

import '../../../styles/musica/PianoMagico.css';

const NOTAS = [
  { id: 'do', nombre: 'DO', color: '#e53935', freq: 261.63 },
  { id: 're', nombre: 'RE', color: '#fbc02d', freq: 293.66 },
  { id: 'mi', nombre: 'MI', color: '#43a047', freq: 329.63 },
  { id: 'fa', nombre: 'FA', color: '#1e88e5', freq: 349.23 },
  { id: 'sol', nombre: 'SOL', color: '#8e24aa', freq: 392.00 },
];

export default function PianoMagico() {
  const navigate = useNavigate();
  const [secuencia, setSecuencia] = useState([]);
  const [pasoUsuario, setPasoUsuario] = useState(0);
  const [estadoJuego, setEstadoJuego] = useState('inicio'); 
  const [mensaje, setMensaje] = useState('Prepárese para iniciar el desafío musical.');
  const [puntos, setPuntos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [maxPuntaje, setMaxPuntaje] = useState(0);
  const [teclaIluminada, setTeclaIluminada] = useState(null);
  const [festejo, setFestejo] = useState(false);

  const obtenerUserIdActual = () => {
    const idDirecto = localStorage.getItem('userId') || localStorage.getItem('id');
    if (idDirecto) return Number(idDirecto);

    const userObj = localStorage.getItem('user');
    if (userObj) {
      try {
        const parsed = JSON.parse(userObj);
        return parsed.id || parsed.user_id || 1;
      } catch (e) {
        return 1;
      }
    }
    return 1; 
  };

  const userId = obtenerUserIdActual();

  useEffect(() => {
    const obtenerProgresoUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/progress/${userId}/piano-magico`);
        if (response.ok) {
          const data = await response.json();
          const puntajeGuardado = data.score !== undefined ? data.score : (data.max_score || data.puntaje || 0);
          setMaxPuntaje(puntajeGuardado);
        } else {
          const localRecord = localStorage.getItem(`record_piano_${userId}`);
          if (localRecord) setMaxPuntaje(Number(localRecord));
        }
      } catch (error) {
        const localRecord = localStorage.getItem(`record_piano_${userId}`);
        if (localRecord) setMaxPuntaje(Number(localRecord));
      }
    };

    obtenerProgresoUsuario();
  }, [userId]);

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

  const guardarProgresoEnBackend = async (scoreFinal, nivelFinal) => {
    if (scoreFinal > maxPuntaje) {
      setMaxPuntaje(scoreFinal);
      localStorage.setItem(`record_piano_${userId}`, scoreFinal);
    }

    try {
      await fetch('http://localhost:5000/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
          game_key: 'piano-magico',
          score: scoreFinal,
          level: nivelFinal
        }),
      });
    } catch (error) {
      console.error('Error al guardar el progreso en el backend:', error);
    }
  };

  const iniciarJuego = () => {
    setSecuencia([]);
    setPuntos(0);
    setNivel(1);
    setFestejo(false);
    siguienteNivel([], 1);
  };

  const siguienteNivel = (secuenciaActual, nivelActual) => {
    setEstadoJuego('mostrando');
    setFestejo(false);
    setMensaje(`Nivel ${nivelActual}: Observe y escuche la secuencia.`);
    setPasoUsuario(0);

    const notaAleatoria = NOTAS[Math.floor(Math.random() * NOTAS.length)];
    const nuevaSecuencia = [...secuenciaActual, notaAleatoria];
    setSecuencia(nuevaSecuencia);

    reproducirSecuencia(nuevaSecuencia, nivelActual);
  };

  const reproducirSecuencia = (sec, nivelActual) => {
    const velocidadBase = 750;
    const velocidadAjustada = Math.max(300, velocidadBase - (nivelActual - 1) * 65);

    sec.forEach((nota, index) => {
      setTimeout(() => {
        setTeclaIluminada(nota.id);
        reproducirSonido(nota.freq);
        setTimeout(() => setTeclaIluminada(null), velocidadAjustada * 0.6);
      }, (index + 1) * velocidadAjustada);
    });

    setTimeout(() => {
      setEstadoJuego('turnousuario');
      setMensaje('Su turno: Repita la melodía ingresada.');
    }, (sec.length + 1) * velocidadAjustada);
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
        setMensaje('Nivel superado con éxito. Incrementando velocidad...');

        guardarProgresoEnBackend(nuevoPuntaje, nuevoNivel);
        
        setTimeout(() => {
          siguienteNivel(secuencia, nuevoNivel);
        }, 1800);
      } else {
        setPasoUsuario(proximoPaso);
      }
    } else {
      setEstadoJuego('perdido');
      setFestejo(false);
      setMensaje('Secuencia incorrecta. Partida finalizada.');
      guardarProgresoEnBackend(puntos, nivel);
    }
  };

  return (
    <Box className="piano-page">
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/juegos/musica')}
        className="back-music-button"
      >
        Volver a Música
      </Button>

      <Box className="piano-header">
        <Typography variant="h1" className="piano-title">
          Piano Mágico
        </Typography>
        <Box className="piano-stats-container">
          <Paper elevation={3} className="piano-score-card">
            <StarIcon className="stat-icon" style={{ color: '#fbc02d' }} />
            <Typography variant="body2">Nivel: <strong>{nivel}</strong></Typography>
          </Paper>
          <Paper elevation={3} className="piano-score-card">
            <EmojiEventsIcon className="stat-icon" style={{ color: '#f57c00' }} />
            <Typography variant="body2">Puntaje: <strong>{puntos}</strong></Typography>
          </Paper>
          <Paper elevation={3} className="piano-score-card">
            <WorkspacePremiumIcon className="stat-icon" style={{ color: '#7b1fa2' }} />
            <Typography variant="body2">Récord: <strong>{maxPuntaje}</strong></Typography>
          </Paper>
        </Box>
      </Box>

      <Box className={`piano-game-container ${festejo ? 'festejo-animacion' : ''}`}>
        <Typography className="piano-message">{mensaje}</Typography>

        {(estadoJuego === 'inicio' || estadoJuego === 'perdido') && (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={iniciarJuego}
            className="piano-start-button"
          >
            {estadoJuego === 'perdido' ? 'Reintentar Partida' : 'Iniciar Desafío'}
          </Button>
        )}

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