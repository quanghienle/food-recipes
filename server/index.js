// server/index.js
import './init.js';

import express from "express";

import { dbTable } from './constants.js';
import {queryPromise} from './db_helper.js';


const app = express();

app.get('/topRatedRecipes', (req, res) => {
    const queryString = `SELECT AVG(rating) AS avg_rating, count(rating) AS num_ratings, recipes.*
                        FROM recipe_reviews
                        LEFT JOIN recipes ON recipes.id = recipe_reviews.recipe_id
                        GROUP BY recipe_id
                        ORDER BY avg_rating DESC, num_ratings DESC
                        LIMIT 8`;
    queryPromise(queryString)
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            console.log(err);
        });
});
        
app.get('/cuisines', (req, res) => {
    const queryString = `SELECT * FROM tags
                              WHERE name 
                              IN ('korean','mexican','thai','french','italian','american')`;
    
    queryPromise(queryString)
        .then((rows) => {
            res.json(rows);
        }).catch((err) => {
            console.log(err);
        });
});



app.get("/recipes",(req,res) => {
    const queryString = 'SELECT * FROM ?? LIMIT 8';    
    const queryVars = [dbTable.recipes];
    queryPromise(queryString, queryVars)
        .then((rows) => {
            res.json(rows);
        }).catch( (err) => {
            console.error(err);
        });
});

app.get("/ingredients", (req, res) =>{
  const queryString = 'SELECT * FROM ?? LIMIT 100';
  const queryVars = [dbTable.ingredients];
  queryPromise(queryString,queryVars)
    .then((rows) => {
      res.json(rows);
    });
});

app.get("/recipe", (req, res) =>{
  const recipeID = req.query.id;
  const queryString = `SELECT * FROM ${dbTable.recipes} WHERE id= ${recipeID}`;
  queryPromise(queryString)
    .then((rows) => {
      res.json(rows[0]);
    });
});

app.get("/reviews", (req, res) =>{
  const recipeID = req.query.id;
  const queryString = 
        `SELECT R.*, U.first_name, U.last_name 
        FROM ${dbTable.reviews} as R
        LEFT JOIN ${dbTable.users} as U ON R.contributor_id = U.id
        WHERE R.recipe_id= ${recipeID}
        ORDER BY R.date DESC`;
  queryPromise(queryString)
    .then((rows) => {
      res.json(rows);
    });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/", (req, res) => {
  res.json("Hello from server!");
});



const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT || 3001}`);
});



