const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./database");
const routes = require('./routes')
//====================================================

// Use the session middleware

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//====================================================
app.get("/", (req, res) => {
  res.send("<h1> Demo Server </h1>");
});
//===================================================
app.use(routes)


//===================================================
app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT : ${process.env.PORT} `);
});
