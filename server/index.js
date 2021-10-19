// server/index.js
import './init.js';

import express from "express";

import { dbTable } from './constants.js';
import {queryPromise} from './db_helper.js';


const app = express();

app.get("/recipes",(req,res) => {
    const queryString = 'SELECT * FROM ?? LIMIT 10';    
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



