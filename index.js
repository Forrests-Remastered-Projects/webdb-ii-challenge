const express = require("express");
const carsRouter = require("./cars/carsRouter");
const server = express();
server.use(express.json());
server.use("/cars", carsRouter);
const port = 2300;
server.listen(port, () => console.log("Server is up!!"));
