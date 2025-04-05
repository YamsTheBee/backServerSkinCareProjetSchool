const express = require("express");

const router = express.Router();

const productsRouter = require("./productsRouter");
const userRouter = require("./userRouter");

// route get http://localhost:4242/api/
router.get("/", (req, res) => {
	res.status(200).send("je  suis sur l'api ' http://localhost:4242/");
});

// route get http://localhost:4242/api/products
router.use("/products", productsRouter);

// route get http://localhost:4242/api/user
router.use("/user", userRouter);

module.exports = router;
