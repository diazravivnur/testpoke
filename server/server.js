// require("dotenv").config();

const express = require("express");
const routers = require("./src/routers");

const cors = require("cors");
const app = express();

const port = 5500;

app.use(express.json());
app.use(cors());
app.use("/api/poke", routers);
// app.use("/uploads", express.static("uploads"));

app.listen(port, () => console.log(`Running on port ${port}`));
