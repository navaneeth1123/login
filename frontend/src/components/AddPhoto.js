import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AddPhoto({ cart, setCart }) {
  const onAdd = () => {
    setCart(cart + 1); // Update the cart value
  };

  const onRemove = () => {
    if (cart > 0) {
      setCart(cart - 1); // Update the cart value
    }
  };

  return (
    <div>
      <IconButton onClick={onAdd}>
        <ShoppingCartIcon />
      </IconButton>
      <IconButton onClick={onRemove} disabled={cart === 0}>
        <RemoveShoppingCartIcon />
      </IconButton>
    </div>
  );
}
