import NavBar from "./components/NavBar";
import React from "react";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import {BrowserRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CuisinePage from "./pages/CuisinePage";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    padding: "10px",
  },
});

export default function App() {
  const classes = useStyles();
  const redirectHome = () => <Redirect to="/signin" />;

  return (
    <div className={classes.root}>
      <NavBar />

      <div className={classes.container}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={withRouter(SignIn)} />
            <Route exact path="/signup" component={withRouter(SignUp)} />
            <Route exact path="/" render={redirectHome} />
            <Route exact path="/home" component={withRouter(Home)} />
            <Route exact path="/recipes" component={withRouter(RecipesPage)} />
            <Route path="/recipe/:id" component={withRouter(RecipeDetail)} />
            <Route path="/cuisine/:name" component={withRouter(CuisinePage)} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}


