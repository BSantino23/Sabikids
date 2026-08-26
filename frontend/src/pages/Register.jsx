import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    setMensaje('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          apellido,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'No se pudo registrar el usuario');
        return;
      }

      setMensaje(data.mensaje);

      setNombre('');
      setApellido('');
      setEmail('');
      setPassword('');

    } catch (error) {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Crear cuenta
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Registrate en Sabikids
        </Typography>

        {mensaje && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {mensaje}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleRegister}
        >
          <TextField
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            Registrarme
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3
          }}
        >
          <Typography variant="body2">
            ¿Ya tenés una cuenta?
          </Typography>

          <Button
            variant="text"
            onClick={() => navigate('/login')}
            sx={{
              ml: 0.5,
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}