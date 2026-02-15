import * as React from 'react';
import { Box, Card, CardContent, Grid, Rating, Typography } from '@mui/material';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya, Pune',
    rating: 5,
    text: 'The craftsmanship is incredible. The necklace I bought feels like a true heirloom.',
  },
  {
    id: 2,
    name: 'Rohan, Mumbai',
    rating: 4.5,
    text: 'Beautiful ring and excellent packaging. Feels very premium from unboxing to wearing.',
  },
  {
    id: 3,
    name: 'Meera, Bengaluru',
    rating: 5,
    text: 'Customer service was extremely helpful in choosing the right vintage piece for a gift.',
  },
];

const TestimonialCarousel: React.FC = () => {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Loved by collectors
      </Typography>
      <Grid container spacing={3}>
        {TESTIMONIALS.map((t) => (
          <Grid size={{ xs: 12, md: 4 }} key={t.id}>
            <Card elevation={0} sx={{ height: '100%', borderRadius: 3, borderColor: 'divider' }}>
              <CardContent>
                <Rating value={t.rating} precision={0.5} readOnly size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ mb: 2 }}>
                  “{t.text}”
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {t.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialCarousel;
