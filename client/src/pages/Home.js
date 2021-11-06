import React from "react";
import { Link, } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'black',
    backgroundColor: '#8ed8e6'
}));

export default function Home(){
    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={4} direction='column'>
                <Grid item xs={12 }>
                    <Item>
                        to display background
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        to display top rated recipes <Link to="/recipes">Recipes</Link>
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        to display popular cusines <Link to="/cusines">Cusines</Link>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
