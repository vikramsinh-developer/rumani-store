import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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

  useEffect(() => {
    const sort = searchParams.get('sort');
    const allowed: Record<string, SortValue> = {
      newest: 'newest',
      priceLow: 'priceLow',
      priceHigh: 'priceHigh',
      popular: 'popular',
      rating: 'rating',
    };

    const next = sort ? allowed[sort] : undefined;
    if (!next) return;
    setFilters((prev) => (prev.sortBy === next ? prev : { ...prev, sortBy: next }));
  }, [searchParams]);

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
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'popular':
          return b.reviewsCount - a.reviewsCount;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [filters]);

  const filtersUI = (
    <Box>
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
  );

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Sidebar Filters (desktop) */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: 80 } }}>{filtersUI}</Box>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {isMobile ? (
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setMobileFiltersOpen(true)}
                  sx={{ flexShrink: 0 }}
                >
                  Filters
                </Button>
              ) : null}
              <Typography variant="h6">{filteredProducts.length} Products</Typography>
            </Box>

            <SortOptions
              sortBy={filters.sortBy}
              onChange={(sortBy) => setFilters({ ...filters, sortBy })}
            />
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

      {/* Mobile filters drawer */}
      <Drawer
        anchor="left"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        PaperProps={{ sx: { width: { xs: '85vw', sm: 360 }, p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Filters
          </Typography>
          <IconButton aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {filtersUI}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" fullWidth onClick={() => setMobileFiltersOpen(false)}>
            View products
          </Button>
        </Box>
      </Drawer>

      <QuickViewModal
        product={selectedProduct}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </Container>
  );
};

export default ProductListPage;
