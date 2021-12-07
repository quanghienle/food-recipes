import React from "react";
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function CuisinePage() {
    const [cuisineRecipes, setCuisineRecipes] = React.useState([]);

    React.useEffect(() => {
        fetch("/cuisine")
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


        </Box>
    );

}