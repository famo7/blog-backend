require("dotenv").config();
require("express-async-errors");
require("./db/connect");
const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");
const loginRoute = require("./routes/login");
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);
if (process.env.NODE_ENV === "development") {
  app.listen(3000);
}

module.exports = app;
