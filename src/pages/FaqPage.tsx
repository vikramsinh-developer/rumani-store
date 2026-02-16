import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Link,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const FAQS: Array<{ q: string; a: React.ReactNode }> = [
  {
    q: 'Do you ship internationally?',
    a: 'Yes. International shipping options and delivery timelines are shown at checkout.',
  },
  {
    q: 'Are your products authentic antiques?',
    a: 'We describe every piece as accurately as possible and include condition notes, materials, and origin details when available.',
  },
  {
    q: 'What is your return policy?',
    a: 'Returns are accepted within the return window listed on the product and checkout pages, provided the item is returned in its original condition.',
  },
  {
    q: 'Can I resize a ring or customize an item?',
    a: 'Some pieces can be resized or adjusted. If you have a specific request, contact us before placing your order.',
  },
  {
    q: 'How do I track my order?',
    a: 'After your order is placed, you will see it in your order history along with status updates as it progresses.',
  },
  {
    q: 'How can I contact you?',
    a: (
      <>
        Visit our{' '}
        <Link component={RouterLink} to="/about" underline="hover" sx={{ color: '#B8860B' }}>
          About page
        </Link>{' '}
        for address, phone, and email.
      </>
    ),
  },
];

const FaqPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <PageHeader title="FAQ" subtitle="Quick answers to common questions." />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {FAQS.map((item) => (
          <Accordion key={item.q} disableGutters sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 700 }}>{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FaqPage;
