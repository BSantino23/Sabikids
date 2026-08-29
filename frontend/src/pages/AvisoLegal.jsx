import React from 'react';

import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';


export default function AvisoLegal() {
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
            Aviso legal y condiciones de uso
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids es una plataforma web educativa
            orientada al refuerzo escolar de estudiantes
            de educación primaria mediante actividades y
            juegos interactivos.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Uso de la plataforma
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            El acceso y uso de Sabikids implica la
            aceptación de estas condiciones. La plataforma
            debe utilizarse exclusivamente con fines
            educativos y de aprendizaje.
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Los usuarios se comprometen a realizar un uso
            responsable de los contenidos y funcionalidades
            disponibles, evitando cualquier actividad que
            pueda afectar el funcionamiento de la plataforma
            o perjudicar a otros usuarios.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Contenidos educativos
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Los juegos y actividades de Sabikids tienen una
            finalidad educativa y de apoyo al aprendizaje.
            No sustituyen la enseñanza formal impartida por
            docentes o instituciones educativas.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Disponibilidad
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids puede modificar, actualizar o suspender
            temporalmente algunas funcionalidades cuando sea
            necesario por razones técnicas, de mantenimiento
            o mejora de la plataforma.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Responsabilidad
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids procura mantener contenidos correctos,
            seguros y adecuados para estudiantes de nivel
            primario. Sin embargo, no se garantiza que la
            plataforma se encuentre permanentemente libre de
            errores técnicos o interrupciones.
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