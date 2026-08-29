import React from 'react';

import {
  Box,
  Button,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useThemeMode } from '../context/ThemeContext';


export default function Footer() {
  const navigate = useNavigate();

  const { mode } = useThemeMode();

  const textColor =
    mode === 'dark'
      ? '#ffffff'
      : '#334155';

  const separatorColor =
    mode === 'dark'
      ? '#94a3b8'
      : '#94a3b8';

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',

        py: 2,
        px: 3,

        mt: 'auto',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor:
          mode === 'dark'
            ? '#0f172a'
            : '#ffffff',

        borderTop:
          mode === 'dark'
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid #e2e8f0',

        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          flexWrap: 'wrap',

          gap: 2,

          textAlign: 'center',
        }}
      >

        {/* AVISO LEGAL */}

        <Button
          onClick={() =>
            navigate('/aviso-legal')
          }
          sx={{
            color: textColor,

            textTransform: 'none',

            fontWeight: 700,

            fontSize: '0.95rem',

            padding: 0,

            minWidth: 'auto',

            '&:hover': {
              backgroundColor: 'transparent',

              textDecoration:
                'underline',
            },
          }}
        >
          Aviso legal y condiciones de uso
        </Button>


        <Typography
          component="span"
          sx={{
            color:
              separatorColor,

            fontWeight: 500,
          }}
        >
          |
        </Typography>


        {/* COOKIES */}

        <Button
          onClick={() =>
            navigate('/politica-cookies')
          }
          sx={{
            color: textColor,

            textTransform: 'none',

            fontWeight: 700,

            fontSize: '0.95rem',

            padding: 0,

            minWidth: 'auto',

            '&:hover': {
              backgroundColor: 'transparent',

              textDecoration:
                'underline',
            },
          }}
        >
          Política de cookies
        </Button>


        <Typography
          component="span"
          sx={{
            color:
              separatorColor,

            fontWeight: 500,
          }}
        >
          |
        </Typography>


        {/* PRIVACIDAD */}

        <Button
          onClick={() =>
            navigate('/politica-privacidad')
          }
          sx={{
            color: textColor,

            textTransform: 'none',

            fontWeight: 700,

            fontSize: '0.95rem',

            padding: 0,

            minWidth: 'auto',

            '&:hover': {
              backgroundColor: 'transparent',

              textDecoration:
                'underline',
            },
          }}
        >
          Política de privacidad
        </Button>


        <Typography
          component="span"
          sx={{
            color:
              separatorColor,

            fontWeight: 500,
          }}
        >
          |
        </Typography>


        {/* COPYRIGHT */}

        <Typography
          component="span"
          sx={{
            color:
              mode === 'dark'
                ? '#cbd5e1'
                : '#475569',

            fontSize:
              '0.95rem',

            fontWeight:
              600,
          }}
        >
          © Sabikids {new Date().getFullYear()}
        </Typography>

      </Box>
    </Box>
  );
}