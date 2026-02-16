import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PageHeader from '../components/common/PageHeader';

const STORE_NAME = 'Rumani Store';
const STORE_ADDRESS = 'Strada Lipscani 12, București 030167, Romania';
const STORE_PHONE = '+40 712 345 678';
const STORE_EMAIL = 'hello@rumanistore.com';
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${STORE_NAME} ${STORE_ADDRESS}`
)}`;

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <PageHeader
        title="About Us"
        subtitle="A curated collection of antique jewelry — timeless pieces, carefully sourced."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Our story
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                {STORE_NAME} is built around a simple idea: great jewelry should feel personal.
                We focus on antique and vintage-inspired pieces that balance craftsmanship,
                authenticity, and everyday wearability.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2, lineHeight: 1.9 }}>
                Each item is inspected, documented, and presented with clear product details.
                If you ever need help choosing the right piece, we’re happy to guide you.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                What we stand for
              </Typography>
              <List dense sx={{ py: 0 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Authenticity-first"
                    secondary="Clear descriptions, realistic photos, and honest condition notes."
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Quality craftsmanship"
                    secondary="We prioritize workmanship, materials, and long-term wear."
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Customer care"
                    secondary="Fast answers, transparent policies, and helpful guidance."
                  />
                </ListItem>
              </List>

              <Box sx={{ display: 'flex', gap: 1.5, mt: 3, flexWrap: 'wrap' }}>
                <Button variant="contained" component={RouterLink} to="/products" sx={{ bgcolor: '#B8860B' }}>
                  Browse Collection
                </Button>
                <Button
                  variant="outlined"
                  component="a"
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<OpenInNewIcon />}
                  sx={{ borderColor: '#B8860B', color: '#B8860B' }}
                >
                  Open in Google Maps
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Reach out anytime — we typically respond within 1 business day.
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <List sx={{ py: 0 }}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <StorefrontIcon sx={{ color: '#B8860B' }} />
                  </ListItemIcon>
                  <ListItemText primary="Name" secondary={STORE_NAME} />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LocationOnIcon sx={{ color: '#B8860B' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={
                      <Link
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noreferrer"
                        underline="hover"
                        sx={{ color: '#B8860B' }}
                      >
                        {STORE_ADDRESS}
                      </Link>
                    }
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <PhoneIcon sx={{ color: '#B8860B' }} />
                  </ListItemIcon>
                  <ListItemText primary="Mobile" secondary={STORE_PHONE} />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <EmailIcon sx={{ color: '#B8860B' }} />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={STORE_EMAIL} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  borderRadius: 2,
                  bgcolor: '#f5f5f0',
                  p: 2,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>
                  Visiting in person?
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  Our catalog is primarily online. If you’d like to see a piece before purchasing,
                  contact us and we’ll arrange a viewing when possible.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Looking for quick answers? Visit the{' '}
          <Link component={RouterLink} to="/faq" underline="hover" sx={{ color: '#B8860B' }}>
            FAQ
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
