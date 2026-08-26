import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Juegos',
      icon: <SportsEsportsIcon />,
      path: '/juegos'
    },
    {
      label: 'Recursos',
      icon: <MenuBookIcon />,
      path: '/recursos'
    },
  ];

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>

        {/* Logo e Identidad Sabikids */}
        <Box
          onClick={() => navigate('/')}
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
          <Box
            className="logo-frame"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 46,
              height: 46,
              p: '3px',
              backgroundColor: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.25s ease-in-out',
              overflow: 'hidden'
            }}
          >
            <Box
              component="img"
              src="/inicio/logo.png"
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

        {/* Menú de navegación */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Button
                key={item.label}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  px: 2,
                  py: 0.8,
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',

                  backgroundColor: isActive
                    ? 'rgba(255, 255, 255, 0.28)'
                    : 'transparent',

                  boxShadow: isActive
                    ? '0 3px 10px rgba(0, 0, 0, 0.15)'
                    : 'none',

                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Ícono Login */}
        <Box>
          <IconButton
            color="inherit"
            title="Ingresar"
            onClick={() => console.log('Ir a Login')}
            sx={{
              transition: 'transform 0.2s ease',

              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
}