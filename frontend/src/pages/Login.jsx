import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
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
          maxWidth: 420,
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