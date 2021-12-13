import React from "react";
import Grid from '@mui/material/Grid';
import NavBar from "../components/NavBar";       
import RecipeCard from "../components/RecipeCard";
import CuisineCard from "../components/CuisineCard";

export default function Home(){
    const [topRatedRecipes, setTopRecipes] = React.useState([]);
    React.useEffect(() => {
        fetch('/recipes')
        .then(res => res.json())
        .then(data => {
            setTopRecipes(data);
        })
    }, []);

    const [popularCusines, setPopularCusines] = React.useState([]);
    React.useEffect(() => {
        fetch('/popularCuisines')  
        .then(res => res.json())
        .then(data => {
            setPopularCusines(data);
        })
    }, []);
    
    return (
        <Grid container spacing={3}>
            <NavBar />
            <Grid item xs = {12}>
                <img src="./images/background.png" 
                    alt="background" 
                    style={{width:'100%', height:'55vh'}}
                    max-width={'100%'}
                    height={'auto'}></img>
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
                <Grid container spacing={2}>
                    {popularCusines.map(cuisine => (
                    <Grid item xs={4}>
                        <CuisineCard
                            cuisineName={cuisine.name}
                            imagePath={"./images/recipe-placeholder.png"}>
                        </CuisineCard>
                    </Grid>       
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
