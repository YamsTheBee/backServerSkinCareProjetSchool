// routes/rdvRouter.js
// Définition des routes liées aux rendez-vous utilisateurs

import express from "express";
import rendezVousController from "../controller/rendezVousController.js";

const router = express.Router();

/**
 * @route POST /
 * @desc Créer un rendez-vous
 * @access Public
 */
router.post("/", rendezVousController.createRendezvous);

/**
 * @route GET /:userId
 * @desc Récupérer les rendez-vous d'un utilisateur
 * @access Public
 */

router.get("/:userId", rendezVousController.getRendezvousByUserId);

/**
 * @route PUT /:id
 * @desc Modifier un rendez-vous
 * @access Public
 */

router.put("/:id", rendezVousController.updateRendezvous);

/**
 * @route DELETE /:id
 * @desc Supprimer un rendez-vous
 * @access Public
 */

router.delete("/:id", rendezVousController.deleteRendezvous);

export default router;
