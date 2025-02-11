require("dotenv").config();
const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");

const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const commentsRouters = require('./routes/comment');

const morgan = require("morgan");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(morgan('dev'));
app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use('/comments', commentsRouters);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = app;
