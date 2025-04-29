const express = require("express");
const db = require("../model/db");
const productsController = require("../controller/productsController");

const router = express.Router();
// const { BrowserRouter } = require("react-router-dom");


// Routes CRUD
// Route GET pour récupérer tous les produits
router.get("/", productsController.browse);

// Route GET pour récupérer un produit par son ID
router.get("/:id", productsController.read);

// Route POST pour créer un nouveau produit
router.post("/", productsController.create);

// Route PUT pour mettre à jour un produit existant
router.put("/:id", productsController.update);

// Route DELETE pour supprimer un produit
router.delete("/:id", productsController.remove);
module.exports = router;
