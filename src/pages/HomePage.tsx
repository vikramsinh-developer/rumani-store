import * as React from 'react';
import { Container } from '@mui/material';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategoryShowcase from '../components/home/CategoryShowcase';
import PromoSection from '../components/home/PromoSection';
import TestimonialCarousel from '../components/home/TestimonialCarousel';
import NewsletterSection from '../components/home/NewsletterSection';
import { MOCK_PRODUCTS } from '../mock/products';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <FeaturedProducts products={MOCK_PRODUCTS} />
        <CategoryShowcase />
        <PromoSection />
        <TestimonialCarousel />
        <NewsletterSection />
      </Container>
    </>
  );
};

export default HomePage;
