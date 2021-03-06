import './init.js';
import express from "express";
import { dbTable } from './constants.js';
import {queryPromise} from './db_helper.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

//return 8 top rated recipes
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
        
//Return 6 popular cuisine names
app.get('/popularCuisines', (req, res) => {
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

//Return recipes with the given cuisine
app.get("/cuisine", (req, res) => {
    const cuisine = req.query.cuisine;
    const queryString = `SELECT recipes.*, tags.name AS cuisine
                        FROM recipes
                        LEFT JOIN recipe_tag_mappings ON recipes.id = recipe_tag_mappings.recipe_id
                        LEFT JOIN tags ON recipe_tag_mappings.tag_id = tags.id
                        WHERE tags.name = '${cuisine}'
                        LIMIT 20`;
    queryPromise(queryString)
      .then((rows) => {
        res.json(rows);
      }).catch((err) => {
        console.log(err);
      });
});

//Return recipe that matches ID
app.get("/recipe", (req, res) =>{
  const recipeID = req.query.id;
  const queryString = `SELECT * FROM ${dbTable.recipes} WHERE id= ${recipeID}`;
  queryPromise(queryString)
    .then((rows) => {
      res.json(rows[0]);
    });
});

//Return first recipes
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

//return all reviews for a recipe
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

//Return ingredients for a recipe
app.get("/ingredients", (req, res) =>{
  const recipeID = req.query.id;  
  const queryString = `SELECT recipes.id, recipes.name, ingredients.name
                        FROM recipes
                        LEFT JOIN recipe_ingredient_mappings ON recipe_id = recipes.id
                        LEFT JOIN ingredients ON recipe_ingredient_mappings.ingrdient_id = ingredients.id
                        WHERE recipes.id= ${recipeID}`;
  queryPromise(queryString)
    .then((rows) => {
      res.json(rows);
    }).catch((err) => {
      console.log(err);
    });
});

//Get recipes that contain name
app.get("/search", (req, res) => {
  const queryString = `SELECT * FROM ${dbTable.recipes} 
                      WHERE name LIKE '%${req.query.search}%'
                      LIMIT 20`;
  queryPromise(queryString)
      .then((rows) => { 
          res.json(rows);
      }).catch((err) => { 
          console.log(err);
      });
});

//Checking user's login credentials
app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const queryString = `SELECT * FROM ${dbTable.users} 
                        WHERE email = '${email}' 
                        AND password = '${password}'`;
  queryPromise(queryString)
    .then((rows) => {
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.json({
          error: "Invalid email or password"
        });
      }
    });
});

//Create a new user
app.post("/signup", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const day = Math.round(new Date().getTime()/1000);

  const checkIdentity = `SELECT * FROM ${dbTable.users} 
                          WHERE email = '${email}'`;

  const queryString = `INSERT INTO ${dbTable.users} (id ,first_name, last_name, email, username ,password, date, role)
                        VALUES ('0', '${firstName}', '${lastName}', '${email}', '${firstName}','${password}', '${day}' ,'user')`;

  queryPromise(checkIdentity)
  .then((rows)=>{
      if(rows.length>0){
        error: "Email existed"
      }else{
        queryPromise(queryString)
        .then((rows) =>{
          res.json({
            success: "success"
          })
        })
    }
  })
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${process.env.SERVER_PORT || 3001}`);
});



