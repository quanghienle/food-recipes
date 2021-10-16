import NavBar from "./components/NavBar";
import React from "react";
import RecipesPage from "./pages/RecipesPage";


function App() {
  return (
    <div style={{ width: "100%" }}>
        <NavBar></NavBar>
        <RecipesPage/>
    </div>
  );
}

export default App;
