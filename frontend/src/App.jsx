import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
});

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Sabikids
        </Typography>
        <Box>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Servicios</Button>
          <Button color="inherit">Contacto</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
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
    </ThemeProvider>
  );
}