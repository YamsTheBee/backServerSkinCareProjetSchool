// productsRouter.js
import express from "express";
import productsController from "../controller/productsController.js";

const router = express.Router();

router.get("/", productsController.browse);
router.get("/:id", productsController.read);
router.post("/", productsController.create);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export default router;
