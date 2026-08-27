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
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [fechaFocus, setFechaFocus] = useState(false);
  const [colegio, setColegio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();

    setMensaje('');
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nombre,
            apellido,
            fecha_nacimiento: fechaNacimiento,
            colegio,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
          'No se pudo registrar el usuario'
        );

        return;
      }

      setMensaje(data.mensaje);

      setNombre('');
      setApellido('');
      setFechaNacimiento('');
      setFechaFocus(false);
      setColegio('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (error) {
      setError(
        'No se pudo conectar con el servidor'
      );
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
          url('/inicio/fondo-register.png')
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

          maxWidth: 520,

          p: 4,

          borderRadius: 4,

          backgroundColor:
            'rgba(255, 255, 255, 0.95)'
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

          sx={{
            mb: 3
          }}
        >
          Registrate en Sabikids
        </Typography>


        {mensaje && (
          <Alert
            severity="success"

            sx={{
              mb: 2
            }}
          >
            {mensaje}
          </Alert>
        )}


        {error && (
          <Alert
            severity="error"

            sx={{
              mb: 2
            }}
          >
            {error}
          </Alert>
        )}


        <Box
          component="form"

          onSubmit={handleRegister}
        >

          <Box
            sx={{
              display: 'flex',

              gap: 2
            }}
          >

            <TextField
              fullWidth

              label="Nombre"

              value={nombre}

              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }

              margin="normal"

              required
            />


            <TextField
              fullWidth

              label="Apellido"

              value={apellido}

              onChange={(e) =>
                setApellido(
                  e.target.value
                )
              }

              margin="normal"

              required
            />

          </Box>


          <TextField
            fullWidth

            label="Fecha de nacimiento"

            type="date"

            value={fechaNacimiento}

            onChange={(e) =>
              setFechaNacimiento(
                e.target.value
              )
            }

            onFocus={() =>
              setFechaFocus(true)
            }

            onBlur={() =>
              setFechaFocus(false)
            }

            margin="normal"

            required

            slotProps={{
              inputLabel: {
                shrink:
                  fechaFocus ||
                  Boolean(fechaNacimiento)
              }
            }}

            sx={{
              '& input[type="date"]': {
                color:
                  fechaFocus ||
                  fechaNacimiento
                    ? 'inherit'
                    : 'transparent'
              },

              '& input[type="date"]::-webkit-calendar-picker-indicator':
                {
                  cursor: 'pointer'
                }
            }}
          />


          <TextField
            fullWidth

            label="Colegio"

            value={colegio}

            onChange={(e) =>
              setColegio(
                e.target.value
              )
            }

            margin="normal"

            required
          />


          <TextField
            fullWidth

            label="Correo electrónico"

            type="email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            margin="normal"

            required
          />


          <TextField
            fullWidth

            label="Contraseña"

            type="password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            margin="normal"

            required
          />


          <TextField
            fullWidth

            label="Repetir contraseña"

            type="password"

            value={confirmPassword}

            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }

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

          <Typography
            variant="body2"
          >
            ¿Ya tenés una cuenta?
          </Typography>


          <Button
            variant="text"

            onClick={() =>
              navigate('/login')
            }

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