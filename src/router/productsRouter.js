const express = require("express");
const db = require("../model/db");

const router = express.Router();
// const { BrowserRouter } = require("react-router-dom");

const { browse } = require("../controller/productsController");

// route get http://localhost:4242/api/products"
router.get("/", browse);

module.exports = router;
