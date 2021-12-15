import React from "react";
import { styled } from "@mui/material/styles";
import { Paper, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import moment from "moment";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RecipeDetail() {
  const [recipeData, setRecipeData] = React.useState({});
  const [reviews, setReviews] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`/recipe?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipeData(data);
      });

    fetch(`/reviews?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  });

  function splitSteps(steps) {
    steps = steps || "";
    return steps.split(", ");
  }

  function convertDateTime(timestamp) {
    return moment.unix(timestamp).format("DD-MM-YYYY");
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={5}>
        <Paper variant="outlined" style={{ height: "100%" }}>
          <img
            style={{ width: "100%", minHeight: "300px", objectFit: "contain" }}
            src="/images/recipe-placeholder.png"
            alt={recipeData.name}
          />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Item>
          <h1>{recipeData.name}</h1>
        </Item>
        <Item>{recipeData.description}</Item>
        <Item style={{ textAlign: "left" }}>
          <h2> Instructions: </h2>
          <ul>
            {splitSteps(recipeData.steps).map((step) => (
              <li>{step}</li>
            ))}
          </ul>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <h2>Reviews: </h2>
        {reviews.map((review) => (
          <Item>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <h4>
                  {review.first_name} {review.last_name}
                </h4>
              </Grid>
              <Grid item xs={6}>
                <LinearProgress
                  style={{ height: "10px" }}
                  variant="determinate"
                  value={review.rating * 20}
                />
                {review.rating}/5
              </Grid>
              <Grid item xs={3}>
                <p>{convertDateTime(review.date)}</p>
              </Grid>
              <Grid item xs={12}>
                <p>{review.review}</p>
              </Grid>
            </Grid>
          </Item>
        ))}
      </Grid>
    </Grid>
  );
}

