import React, { useState, useMemo } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/product/QuickViewModal';
import CategoryFilter from '../components/filters/CategoryFilter';
import MaterialFilter from '../components/filters/MaterialFilter';
import PriceRangeFilter from '../components/filters/PriceRangeFilter';
import SortOptions, { SortValue } from '../components/filters/SortOptions';
import { MOCK_PRODUCTS } from '../mock/products';
import { Product } from '../types';

const ProductListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<{
    categories: string[];
    priceRange: [number, number];
    materials: string[];
    sortBy: SortValue;
  }>({
    categories: [],
    priceRange: [0, 200000],
    materials: [],
    sortBy: 'newest',
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesMaterial =
        filters.materials.length === 0 || filters.materials.includes(product.material);
      const matchesPrice =
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      return matchesCategory && matchesMaterial && matchesPrice;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filters]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Sidebar Filters */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 80 } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Filters
            </Typography>
            <CategoryFilter
              selectedCategories={filters.categories}
              onChange={(categories) => setFilters({ ...filters, categories })}
            />
            <PriceRangeFilter
              priceRange={filters.priceRange}
              onChange={(priceRange) => setFilters({ ...filters, priceRange })}
            />
            <MaterialFilter
              selectedMaterials={filters.materials}
              onChange={(materials) => setFilters({ ...filters, materials })}
            />

          </Box>
        </Grid>

        {/* Products Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'stretch', sm: 'center' },
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Typography variant="h6">
              {filteredProducts.length} Products
            </Typography>
            <SortOptions sortBy={filters.sortBy} onChange={(sortBy) => setFilters({ ...filters, sortBy })} />
          </Box>

          <ProductGrid
            products={filteredProducts}
            onProductClick={(product) => navigate(`/products/${product.id}`)}
            onQuickView={(product) => {
              setSelectedProduct(product);
              setQuickViewOpen(true);
            }}
          />
        </Grid>
      </Grid>

      <QuickViewModal
        product={selectedProduct}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </Container>
  );
};

export default ProductListPage;
