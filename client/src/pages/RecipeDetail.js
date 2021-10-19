import React from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function RecipeDetail(){
    const [recipeData, setRecipeData] = React.useState({});

    React.useEffect(() => {
        fetch("/recipe?id=38")
            .then((res) => res.json())
            .then((data) => {
                setRecipeData(data);
                console.log(data);
            })
    },[]);


    return(
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Item>xs=8</Item>
            </Grid>
            <Grid item xs={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={4}>
                <Item>xs=4</Item>
            </Grid>
            <Grid item xs={8}>
                <Item>xs=8</Item>
                </Grid>
        </Grid>
    )
}