import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline, GlobalStyles, Box } from '@mui/material';

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('themeMode') || 'light';
  });

  const changeMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = useMemo(() => {
    if (mode === 'dark') {
      return createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#90caf9' },
          secondary: { main: '#ce93d8' },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        },
      });
    }

    if (mode === 'colorblind') {
      return createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#005ab5' },
          secondary: { main: '#dc267f' },
          warning: { main: '#fe6100' },
          info: { main: '#785ef0' },
          background: {
            default: '#f4f6f8',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#222222',
          },
        },
      });
    }

    return createTheme({
      palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        background: {
          default: '#f8fafc',
          paper: '#ffffff',
        },
        text: {
          primary: '#000000',
          secondary: 'rgba(0, 0, 0, 0.6)',
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode: changeMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            'html, body, #root': {
              minHeight: '100vh',
              margin: 0,
              padding: 0,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              transition: 'background-color 0.3s ease, color 0.3s ease',
            },
            ...(mode === 'colorblind' && {
              'button:focus, a:focus, input:focus': {
                outline: '3px solid #fe6100 !important',
              },
              '*': {
                fontWeight: '600 !important',
              },
            }),
          }}
        />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            color: 'text.primary',
            ...(mode === 'colorblind' && {
              '& .MuiPaper-root': {
                borderColor: '#005ab5',
                borderWidth: '2px',
                borderStyle: 'solid',
              },
            }),
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}