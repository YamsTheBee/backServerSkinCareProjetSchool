const express = require("express");

const cors = require("cors");

const router = require("./router"); //ou  import router from ("./router")

const app = express();

app.use(cors("*"));
app.use(express.json());
// get http://localhost:4242/

app.get("/", (req, res) => {
	res.status(200).send("je suis sur l'api <3'http://localhost:4242/");
});

app.use("/api", router);

module.exports = app;
