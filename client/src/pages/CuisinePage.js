import React from "react";
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CuisinePage() {
    const [cuisineRecipes, setCuisineRecipes] = React.useState([]);
    const {name} = useParams();
    React.useEffect(() => {
        fetch(`/cuisine?cuisine=${name}`)
            .then((res) => res.json())
            .then((data) => {
                setCuisineRecipes(data);
            });
    });
    
    return(
        <Grid>
            <Grid item xs={12}>
                <NavBar/>
            </Grid>
            <h1> {name} </h1>
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
                {cuisineRecipes.map((recipe) => (
                    <Box sx={{ p: 1, flexGrow: 1 }} key={`recipe-preview-${recipe.id}`}>
                        <Link to={`/recipe/${recipe.id}`}>
                            <RecipeCard 
                                recipe={recipe.name} 
                                imagePath={"./images/recipe-placeholder.png"}
                                description={recipe.description}
                            />
                        </Link>
                    </Box>
                ))}    
            </Box>
        </Grid>
    );
}
