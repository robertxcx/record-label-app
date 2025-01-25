("use strict");
const express = require("express");
const cors = require("cors");

const serverPort = 8004;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/authentication", require("./api/authRoutes"));
app.listen(serverPort, async () => {
    console.log(`Server started on port ${serverPort}`);
  });