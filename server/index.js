// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '****',
  database: 'recipes'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.get("/recipes",(req,res) => {
    connection.query('SELECT * from recipes LIMIT 10', (err, rows) => {
        if(err) throw err;
        res.json(rows);
        connection.end();
    });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
