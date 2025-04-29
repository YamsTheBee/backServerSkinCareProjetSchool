// const express = require("express");

// const router = express.Router();

// const { getOne, createOne } = require("../controller/userController");
// // get http://localhost:4242/api/user/1
// router.get("/:id", getOne);

// // get http://localhost:4242/api/user/
// router.post("/", createOne);

// module.exports = router;

// // GetOne recupérer un utilisateur
// // POST: creation d'utilisateur

const express = require("express");

const {
	register,
	updateUser,
	deleteUser,
	getUser,
} = require("../controller/userController");

const router = express.Router();

// Route POST pour inscrire un utilisateur
router.post("/register", register);
// Route GET pour obtenir un utilisateur
router.get("/:id", getUser);

// Route PUT pour modifier les informations d'un utilisateur
router.put("/:id", updateUser);

// Route DELETE pour supprimer un utilisateur
router.delete("/:id", deleteUser);

module.exports = router;
