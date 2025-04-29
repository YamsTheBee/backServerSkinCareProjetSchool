const express = require("express");
const router = express.Router();
const rendezvousController = require("../controller/rendezvousController");
const {
	createRendezvous,
	getRendezvousByUserId,
	updateRendezvous,
	deleteRendezvous,
} = require("../controller/rendezvousController");

// POST - Créer un rendez-vous
router.post("/", createRendezvous);

// GET - Récupérer les rendez-vous d'un utilisateur
router.get("/:userId", rendezvousController.getRendezvousByUserId);

// PUT - Modifier un rendez-vous
router.put("/:id", updateRendezvous);

// DELETE - Supprimer un rendez-vous
router.delete("/:id", deleteRendezvous);

module.exports = router;
