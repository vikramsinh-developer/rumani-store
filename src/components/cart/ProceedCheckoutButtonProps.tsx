import * as React from 'react';
import { Button } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface ProceedCheckoutButtonProps {
  fullWidth?: boolean;
}

const ProceedCheckoutButton: React.FC<ProceedCheckoutButtonProps> = ({ fullWidth = true }) => {
  const { total } = useCart();
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      disabled={total === 0}
      onClick={() => navigate('/checkout')}
    >
      Proceed to checkout
    </Button>
  );
};

export default ProceedCheckoutButton;
