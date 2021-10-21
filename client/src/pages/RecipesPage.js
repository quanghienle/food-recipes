import React from "react";
import Box from "@mui/material/Box";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

export default function RecipesPage() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    fetch("/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRecipes(data);
      });
  }, []);

  return (
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
        <Box sx={{ p: 1, flexGrow: 1 }} key={`recipe-preview-${recipe.id}`}>
          <Link to={`/recipe/${recipe.id}`}>
            <RecipeCard
              title={recipe.name}
              imagePath={"./images/recipe-placeholder.png"}
              timestamp={recipe.submitted}
              description={recipe.description}
              steps={recipe.steps}
            />
          </Link>
        </Box>
      ))}
    </Box>
  );
}

