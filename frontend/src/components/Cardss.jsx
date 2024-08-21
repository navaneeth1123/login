import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { useMediaQuery } from '@mui/material';
import CardActions from '@mui/material/CardActions';

export default function Cardss() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Check if screen size is medium or smaller

  // Initialize cart with zero quantity for each card
  const [cart, setCart] = React.useState(Array(5).fill(0));

  const onAdd = (index) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index] = (newCart[index] || 0) + 1;
      return newCart;
    });
  };

  const onRemove = (index) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      if (newCart[index] > 0) {
        newCart[index] -= 1;
      }
      return newCart;
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap', // Allows wrapping of cards to the next line
        gap: 2, // Space between cards
        justifyContent: 'center', // Center cards horizontally
        padding: 2, // Padding around the container
      }}
    >
      {[...Array(5)].map((_, index) => (

<Card sx={{ maxWidth: 345 }} key={index}>
<CardMedia
  component="img"
  alt="green iguana"
  height="140"
  image="/static/images/cards/contemplative-reptile.jpg"
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Lizard
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica
  </Typography>
</CardContent>
<CardActions>
  {/* <Button size="small">Share</Button>
  <Button size="small">Learn More</Button> */}
              <IconButton onClick={() => onAdd(index)}>
                <ShoppingCartIcon />
              </IconButton>
              
              <Badge
                badgeContent={cart[index]} // Display the quantity for the specific card
                color="secondary" // Badge color
                sx={{
                  top: 0,
                  right: 15,
                  padding: "0 px",
                  fontSize: 12, // Size of the badge number
                  height: 16, // Height of the badge
                  minWidth: 16, // Minimum width of the badge
                  borderRadius: "50%", // Make the badge round
                }}
              >
                <IconButton onClick={() => onRemove(index)} disabled={cart[index] === 0}>
                  <RemoveShoppingCartIcon />
                </IconButton>
              </Badge>
</CardActions>
</Card>
      ))}
    </Box>
  );
}

