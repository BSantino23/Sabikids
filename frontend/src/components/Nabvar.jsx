import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navbar() {
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