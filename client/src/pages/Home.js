import React from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RecipeCard from "../components/RecipeCard";
import ImgList from "../components/ImgList";

export default function Home(){
    const [topRatedRecipes, setTopRecipes] = React.useState([]);
    React.useEffect(() => {
        fetch('/recipes')
        .then(res => res.json())
        .then(data => {
            setTopRecipes(data);
        })
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs = {12}>
                <Paper>
                    <img src="./images/background.png" alt="background" style={{width:'100%', height:'55vh'}} ></img>
                </Paper>
            </Grid>
            <Grid item xs = {12} >
                <h2>Top Rated Recipes</h2>
                <Grid container spacing={2}>
                    {topRatedRecipes.map(recipe => (
                    <Grid item xs={3}>
                        <RecipeCard
                            timestamp={recipe.submitted}
                            recipeID={recipe.id}
                            title={recipe.name}
                            imagePath={"./images/recipe-placeholder.png"}
                            description={recipe.description}
                        ></RecipeCard>  
                    </Grid>
                ))}                   
                </Grid>
            </Grid>
            <Grid item xs = {12}>
                <h2>Popular Cusines</h2>
                <ImgList></ImgList>
            </Grid>
        </Grid>
    );
}
