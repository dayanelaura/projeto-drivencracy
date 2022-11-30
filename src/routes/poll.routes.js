import { Router } from "express";
import { createPoll } from "../controllers/pollControllers.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.js";

const router = Router();

router.post('/poll', pollSchemaValidation, createPoll);

export default router;