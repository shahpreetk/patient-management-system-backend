const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const userRouter = require("./routers/user");
const detailRouter = require("./routers/detail");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", userRouter);
app.use("/api/v1", detailRouter);

module.exports = app;
