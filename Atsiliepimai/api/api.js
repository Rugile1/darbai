const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());

const port = 3001;

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "atsilepimu_api",
});

con.connect((err) => {
  if (err) throw err;
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/atsiliepimai/sort/new", (req, res) => {
  const sql = "SELECT * FROM atsilepimai ORDER BY date_time";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/api/atsiliepimai/sort/old", (req, res) => {
  const sql = "SELECT * FROM atsilepimai ORDER BY date_time DESC";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/api/atsiliepimai/sort/good", (req, res) => {
  const sql = "SELECT * FROM atsilepimai ORDER BY rating DESC";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/api/atsiliepimai/sort/bad", (req, res) => {
  const sql = "SELECT * FROM atsilepimai ORDER BY rating";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/api/atsiliepimai/", (req, res) => {
  const sql = "SELECT * FROM atsilepimai";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.get("/api/atsiliepimai/vertinimas", (req, res) => {
  const sql = "SELECT AVG(rating) as average FROM atsilepimai";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

// Retrieve feedback by ID
app.get("/api/atsiliepimai/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM atsilepimai WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.status(200).json(result);
  });
});

app.post("/api/atsiliepimai/", (req, res) => {
  const { vardas, pastas, vertinimas, tekstas } = req.body;
  const sql =
    "INSERT INTO atsilepimai (email, name, text, rating) VALUES (?, ?, ?, ?)";
  con.query(sql, [pastas, vardas, tekstas, vertinimas], (err, result) => {
    if (err) throw err;
    res.status(200).json({
      status: "success",
      data: { id: result.insertId },
    });
  });
});

app.put("/api/atsiliepimai/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM atsilepimai WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length) {
      let atsiliepimas = result[0];
      ["email", "name", "text", "rating"].forEach((key) => {
        if (req.body[key]) {
          atsiliepimas[key] = req.body[key];
        }
      });
      const updateSql =
        "UPDATE atsilepimai SET email = ?, name = ?, text = ?, rating = ? WHERE id = ?";
      con.query(
        updateSql,
        [
          atsiliepimas.email,
          atsiliepimas.name,
          atsiliepimas.text,
          atsiliepimas.rating,
          id,
        ],
        (err) => {
          if (err) throw err;
          res.status(200).json({ status: "success" });
        }
      );
    } else {
      res.status(404).send({
        status: 404,
        message: "Error: not found",
      });
    }
  });
});

app.delete("/api/atsiliepimai/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM atsilepimai WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length) {
      const deleteSql = "DELETE FROM atsilepimai WHERE id = ?";
      con.query(deleteSql, [id], (err) => {
        if (err) throw err;
        res.status(200).json({ status: "success" });
      });
    } else {
      res.status(404).send({
        status: 404,
        message: "Error: not found",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});