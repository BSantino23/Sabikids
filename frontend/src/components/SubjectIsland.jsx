import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/SubjectIsland.css';

export default function SubjectIsland({ subject, index, onClick }) {
  return (
    <Box
      component="button"
      type="button"
      className="subject-island"
      onClick={() => onClick(subject)}
      aria-label={`Ir a los juegos de ${subject.name}`}
      style={{
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <Box
        component="img"
        src={subject.image}
        alt={`Isla de ${subject.name}`}
        className="island-image"
      />

      <Typography
        variant="h5"
        component="h2"
        className="island-title"
      >
        {subject.name}
      </Typography>
    </Box>
  );
}