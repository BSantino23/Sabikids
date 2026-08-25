import React from 'react';
import { 
  CssBaseline, 
  ThemeProvider, 
  createTheme, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton 
} from '@mui/material';

// Importación de Íconos de MUI
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
});

function Navbar() {
  const handleGoHome = () => console.log("Navegar a Home");
  const handleGoLogin = () => console.log("Navegar a Login");

  const navItems = [
    { label: 'Juegos', icon: <SportsEsportsIcon /> },
    { label: 'Recursos', icon: <MenuBookIcon /> },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* 1. Logo e Identidad Sabikids con Marco Circular (Izquierda) */}
        <Box 
          onClick={handleGoHome}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover .logo-frame': {
              transform: 'scale(1.08)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
              borderColor: '#ffffff'
            }
          }}
        >
          {/* Marco Circular del Logo */}
          <Box
            className="logo-frame"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 46,
              height: 46,
              p: '3px',
              backgroundColor: '#ffffff',                   // Fondo blanco para que destaque el logo
              border: '2px solid rgba(255, 255, 255, 0.8)',   // Borde circular permanente
              borderRadius: '50%',                          // Hace la forma circular perfecta
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',     // Sombra constante
              transition: 'all 0.25s ease-in-out',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src="/inicio/logo.jpg.png"
              alt="Logo Sabikids"
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            Sabikids
          </Typography>
        </Box>

        {/* 2. Menú de Navegación Centrado */}
        <Box 
          sx={{ 
            position: 'absolute', 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              startIcon={item.icon}
              onClick={() => console.log(`Navegar a ${item.label}`)}
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '0.95rem',
                px: 2,
                py: 0.8,
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* 3. Ícono de Usuario (Login) */}
        <Box>
          <IconButton 
            color="inherit" 
            onClick={handleGoLogin}
            title="Ingresar"
            sx={{ 
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.1)' } 
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
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