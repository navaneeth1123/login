import React from 'react';
import Cardss from './Cardss';
import { Box, TextField, Button, Stack, Grid } from '@mui/material';

export default function AddProducts() {
  // Function to handle search button click
  const handleSearch = () => {
    console.log('Search initiated');
  };

  return (
    <>
    <Box
      sx={{
        maxWidth: "1500px",
        margin: "auto", // Center the Box
        padding: 2, // Add some padding
      }}
    >
      {/* Sticky Container */}
      <Box
        sx={{
          position: 'sticky',
          top: 100, // Adjusted to 0 for fixed positioning at the top
          zIndex: 1, // Ensure the sticky container is above other content
          padding: 2,
          backgroundColor: 'background.paper', // Ensure the background color is consistent
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Optional: add shadow for better visibility
        }}
      >
        {/* Search Input and Add Product Button */}
        <Stack 
          direction="row" 
          spacing={2} 
          sx={{ 
            width: '100%', 
            maxWidth: '900px', 
            alignItems: 'center',
            justifyContent: 'space-between', // Align items with space between
            marginBottom: 2 // Space below the Stack
          }}
        >
          <TextField
            fullWidth
            size='small'
            variant="outlined"
            placeholder="Search..."
            sx={{
              borderRadius: 3, // Rounded edges
              '& .MuiOutlinedInput-root': {
                borderRadius: 3, // Rounded edges
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              borderRadius: 2, // Rounded edges
              minWidth: '100px', // Reduce minimum width of the button
              textAlign: 'center', // Center text inside the button
              whiteSpace: 'nowrap', // Prevent text from wrapping
                         }}
            size="medium"
          >
            Add Product
          </Button>
        </Stack>
      </Box>
      
      {/* Scrollable Content */}
      <Grid sx={{ paddingTop: 2 ,maxWidth:"1500px"}}>
        <Cardss />
      </Grid>
    </Box>

    {/* add product form start*/}
    
    {/* add product form end*/}
    </>
  );
}
