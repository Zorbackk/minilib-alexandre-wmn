import express from "express";
import asyncWrapper from "../middleware/asyncWrapper.js";
import * as controller from "../controllers/empruntsController.js";

const router = express.Router();

/** GET /api/v1/emprunts - liste tous les emprunts réalisés */
router.get("/", asyncWrapper(controller.getEmprunts));

/** GET /api/v1/emprunts/en-cours */
router.get("/en-cours", asyncWrapper(controller.getNonRendus));

// GET api/v1/emprunts/retards
router.get("/retards", asyncWrapper(controller.getRetards));

/** POST /api/v1/emprunts - Réalise un emprunt */
router.post("/", asyncWrapper(controller.empruntLivre));

/** PATCH /api/v1/emprunts/:id - Réalise un retour */
router.patch("/:id", asyncWrapper(controller.retourLivre));

export default router;
