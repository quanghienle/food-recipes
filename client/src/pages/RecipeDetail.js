import React from "react";
import { styled } from '@mui/material/styles';
import { Paper, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function RecipeDetail() {
    const [recipeData, setRecipeData] = React.useState({});
    const { id } = useParams();

    React.useEffect(() => {
        fetch(`/recipe?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipeData(data);
                console.log(data);
            })
    }, []);


    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Item>item1</Item>
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

