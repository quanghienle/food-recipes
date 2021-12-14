import React from "react";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

export default function SearchResult() {
    const [recipes, setRecipes] = React.useState([]);  
    const { searchTerm } = useParams();
    React.useEffect(() => {
        fetch(`/search?search=${searchTerm}`)
        .then(res => res.json())
        .then(data => { 
            setRecipes(data);
        })
    });
    return(
        <Grid>
            <Grid item xs={12}>
                <NavBar/>
            </Grid>
                <h1> First 20 Results </h1>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                }}
            >
                {recipes.map((recipe) => (
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <RecipeCard 
                            recipe={recipe.name} 
                            recipeID={recipe.id}
                            timestamp={recipe.submitted}
                            imagePath={"/images/recipe-placeholder.png"}
                            description={recipe.description}
                        />
                    </Box>
                ))}    
            </Box>
        </Grid>
    );
};