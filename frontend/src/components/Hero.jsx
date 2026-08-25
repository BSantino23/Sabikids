import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';

export default function Hero() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8, mb: 6 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Bienvenido a la Aplicación
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
          Una plataforma rápida y moderna desarrollada con React, Material UI y Flask.
        </Typography>
        <Button variant="contained" color="secondary" size="large" sx={{ mr: 2 }}>
          Empezar
        </Button>
        <Button variant="outlined" color="inherit" size="large">
          Saber más
        </Button>
      </Container>
    </Box>
  );
}