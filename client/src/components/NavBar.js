import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
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
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputOnChange = function(e) {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h1>
            <a href="/home">FoodForFun</a>
          </h1>
          <Search>
            <TextField
              margin="normal"
              id="search"
              label="Search"
              name="search"
              onChange={inputOnChange}
    
            />
            <Link to={`/search?=${searchTerm}`}>
              <Button 
                type="submit"
                variant="contained"             
                sx={{ mt: 1, mb: 1, height: '100%' }}
              >
                Search
              </Button>
            </Link>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
