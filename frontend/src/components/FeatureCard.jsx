import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function FeatureCard({ title, description }) {
  return (
    <Card sx={{ height: '100%', elevation: 3 }}>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" component="div" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}