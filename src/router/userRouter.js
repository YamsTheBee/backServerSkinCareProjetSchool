const express = require("express");

const router = express.Router();

const { getOne, createOne } = require("../controller/userController");
// get http://localhost:4242/api/user/1
router.get("/:id", getOne);

// get http://localhost:4242/api/user/
router.post("/", createOne);

module.exports = router;

// GetOne recupérer un utilisateur
// POST: creation d'utilisateur
