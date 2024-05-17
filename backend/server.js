const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Deepak@358&vs",
  database: "lhsdashboard",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Define the API endpoint to fetch labour health data
app.get("/api/labourhealthdata", (req, res) => {
  const query = "SELECT * FROM labourhealthdata";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/districtdata", (req, res) => {
  const { state } = req.query;
  const query = "SELECT * FROM labourhealthdata WHERE State = ?";
  connection.query(query, [state], (err, results) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Check if the query returned any results
    if (results.length === 0) {
      res.status(404).json({ error: "No data found for the specified state" });
      return;
    }

    res.json(results);
  });
});

// console.log(distectdata);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
