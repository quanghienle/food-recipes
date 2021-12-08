import React from "react";
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CuisinePage() {
    const [cuisineRecipes, setCuisineRecipes] = React.useState([]);
    const { cuisine} = useParams();
    React.useEffect(() => {
        fetch(`/cuisine=?cuisine=${cuisine}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCuisineRecipes(data);
            });
    }, []);
    
    return(
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
    );

}