var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

var adminRouter = require("./routes/admin");
var clientRouter = require("./routes/client");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use("/client", clientRouter);

module.exports = app;
