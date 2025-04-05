const express = require("express");
const db = require("../model/db");

const router = express.Router();
// const { BrowserRouter } = require("react-router-dom");

const { browse, read } = require("../controller/productsController");

// route get http://localhost:4242/api/products"
router.get("/", browse);

// route get http://localhost:4242/api/products/:id"
router.get("/:id", read);

module.exports = router;
