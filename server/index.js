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

