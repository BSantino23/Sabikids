import React from 'react';

import {
  Box,
  Container,
  Paper,
  Typography
} from '@mui/material';


export default function PoliticaCookies() {
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
            Política de cookies
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids puede utilizar tecnologías de
            almacenamiento local del navegador para mejorar
            el funcionamiento de la plataforma y mantener
            determinadas preferencias del usuario.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            ¿Qué son las cookies?
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Las cookies son pequeños archivos o datos que
            pueden almacenarse en el dispositivo del usuario
            cuando visita una página web.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Uso en Sabikids
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Sabikids puede almacenar información necesaria
            para recordar configuraciones de la interfaz,
            preferencias visuales o información relacionada
            con la experiencia de navegación.
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Actualmente, algunas preferencias pueden
            almacenarse mediante el almacenamiento local
            del navegador.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Control del navegador
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            El usuario puede eliminar los datos almacenados
            desde la configuración de su navegador. Al
            hacerlo, es posible que algunas preferencias
            deban configurarse nuevamente.
          </Typography>


          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              mt: 4,
              mb: 1.5,
            }}
          >
            Cookies de terceros
          </Typography>


          <Typography
            variant="body1"
            paragraph
          >
            Si en el futuro se incorporan servicios externos
            que utilicen cookies propias, esta política podrá
            actualizarse para informar adecuadamente a los
            usuarios.
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