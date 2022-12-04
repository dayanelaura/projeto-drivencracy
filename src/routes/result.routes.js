import { Router } from "express";
import { showResult } from "../controllers/resultController.js";
import { pollValidation } from "../middlewares/pollValidation.js";

const router = Router();

router.get('/poll/:id/result', pollValidation, showResult);

export default router;