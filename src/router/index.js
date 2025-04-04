const express = require("express");

const router = express.Router();

const productsRouter = require("./productsRouter");

// route get http://localhost:4242/api/products
router.use("/products", productsRouter);

module.exports = router;
