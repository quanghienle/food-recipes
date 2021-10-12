import React from "react";
import Box from "@mui/material/Box";
import RecipeCard from "./components/RecipeCard";

function App() {
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
    <div style={{ width: "100%" }}>
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
            <RecipeCard
              title={recipe.name}
              imagePath={"./images/recipe-placeholder.png"}
              timestamp={recipe.submitted}
              description={recipe.description}
              steps={recipe.steps}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default App;
