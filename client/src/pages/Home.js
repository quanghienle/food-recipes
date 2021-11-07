import React from "react";
import { Link, } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RecipeCard from "../components/RecipeCard";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'black',
    backgroundColor: '#8ed8e6'
}));

export default function Home(){
    const [topRatedRecipes, setTopRecipes] = React.useState([]);
    React.useEffect(() => {
        fetch('/home')
        .then(res => res.json())
        .then(data => {
            setTopRecipes(data);
        })
    }, []);

    return (
        <Box sx={{ flexGrow: 1}}>
            <Grid container spacing={4} >
                <Grid item xs={12 }>
                    <Item>
                        to display background
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <h1>Top rated recipes</h1>
                        {topRatedRecipes.map(recipe => (
                            <Box key={recipe.id}>
                                <RecipeCard recipe={recipe} />
                            </Box>
                        ))}
                    </Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>
                        <h1>Most popular cusines</h1>
                        to display popular cusines <Link to="/cusines">Cusines</Link>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
