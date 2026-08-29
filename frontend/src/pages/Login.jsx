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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setMensaje('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'No se pudo iniciar sesión');
        return;
      }

      console.log('Usuario:', data.usuario);

      // Guardar usuario
      localStorage.setItem(
        'usuario',
        JSON.stringify(data.usuario)
      );

      // Avisar al Navbar que el usuario inició sesión
      window.dispatchEvent(new Event('usuarioActualizado'));

      setMensaje(data.mensaje);

      // Ir a la página principal
      setTimeout(() => {
        navigate('/');
      }, 500);

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
        p: 3,

        backgroundImage: `
          linear-gradient(
            rgba(25, 118, 210, 0.12),
            rgba(255, 255, 255, 0.85)
          ),
          url('/inicio/fondo-login.png')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(6px)'
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          Iniciar sesión
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Ingresá a tu cuenta de Sabikids
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
          onSubmit={handleLogin}
        >
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
            Iniciar sesión
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
            ¿No tenés una cuenta?
          </Typography>

          <Button
            variant="text"
            onClick={() => navigate('/register')}
            sx={{
              ml: 0.5,
              p: 0,
              minWidth: 'auto',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Registrate
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}