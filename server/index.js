const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const e = require("express");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "booksystem",
});

app.post("/create", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const image = req.body.image;

  db.query(
    "INSERT INTO books (title,author,year,image) VALUES(?,?,?,?)",
    [title, author, year, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Valcues inserted")
      }
    }
  );
});

app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  
  db.query(
    "UPDATE books SET title = ? WHERE id = ?",
    [title, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// app.delete();

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
