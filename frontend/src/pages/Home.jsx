import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom>
          ¡La aplicación está funcionando!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Si puedes ver esto, significa que las rutas y los componentes de Material UI están conectados correctamente.
        </Typography>
      </Container>
    </Box>
  );
}