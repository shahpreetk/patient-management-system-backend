const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const stockRouter = require("./routers/stock");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", stockRouter);

module.exports = app;
