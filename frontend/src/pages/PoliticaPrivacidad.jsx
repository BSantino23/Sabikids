import React from 'react';

import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';


export default function PoliticaPrivacidad() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 130px)',
        py: 5,
        px: 2,
        backgroundColor: 'background.default',
      }}
    >

      <Container maxWidth="md">

        <Paper
          elevation={3}
          sx={{
            p: {
              xs: 3,
              md: 5
            },

            borderRadius: 4,
          }}
        >

          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              color: 'primary.main',
            }}
          >
            Política de privacidad
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            En Sabikids buscamos proteger la información de
            los usuarios y utilizarla únicamente para el
            correcto funcionamiento de la plataforma
            educativa.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Información recopilada
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Durante el registro pueden solicitarse datos como
            nombre, apellido, fecha de nacimiento, colegio,
            correo electrónico y contraseña.
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            También puede almacenarse información relacionada
            con el progreso del usuario dentro de los juegos,
            como niveles alcanzados, puntajes y resultados.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Finalidad de los datos
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            La información se utiliza para permitir el acceso
            a la plataforma, identificar al usuario, guardar
            su progreso educativo y mejorar su experiencia de
            aprendizaje.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Contraseñas
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Las contraseñas no deben almacenarse en texto
            plano. Sabikids utiliza mecanismos de hash para
            proteger las credenciales almacenadas.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Información de menores
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids está orientado a estudiantes de
            educación primaria. Por este motivo, debe
            procurarse recopilar únicamente la información
            necesaria para prestar el servicio educativo y
            mantener medidas adecuadas de protección de
            datos.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Uso de la información
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Los datos registrados en Sabikids no deben
            utilizarse para finalidades incompatibles con el
            funcionamiento de la plataforma educativa.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Actualizaciones
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Esta política puede actualizarse cuando se
            incorporen nuevas funcionalidades o cambien las
            características del tratamiento de datos.
          </Typography>


          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 4,
            }}
          >
            Última actualización: 2026
          </Typography>

        </Paper>

      </Container>

    </Box>
  );
}