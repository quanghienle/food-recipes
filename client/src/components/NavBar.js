import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export default function NavBar() {
  const handleSearch = (event) =>{
    const data= new FormData(event.currentTarget);
    
    event.preventDefault();
    
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h1
            variant="h6"
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <a href="/home">FoodForFun</a>
          </h1>
          <Search
            component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              id="search"
              label="Search"
              name="search"
            />
            <Button 
              type="submit"
              variant="contained"             
              sx={{ mt: 1, mb: 1 }}
            >
              Search
            </Button>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}