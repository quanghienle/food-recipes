import NavBar from "./components/NavBar";
import React from "react";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import Home from "./pages/Home";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    padding: "10px",
  },
});

function App() {
  const classes = useStyles();
  const redirectHome = () => <Redirect to="/home" />;

  return (
    <div className={classes.root}>
      <NavBar />

      <div className={classes.container}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={redirectHome} />
            <Route exact path="/home" component={withRouter(Home)} />
            <Route exact path="/recipes" component={withRouter(RecipesPage)} />
            <Route path="/recipe/:id" component={withRouter(RecipeDetail)} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
