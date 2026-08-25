import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ mt: 8, textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          ¡Sabikids está funcionando!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          La interfaz de React con Material UI se ha cargado correctamente.
        </Typography>
      </Container>
    </Box>
  );
}