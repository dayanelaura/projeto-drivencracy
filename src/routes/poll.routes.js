import { Router } from "express";
import { createPoll, getAllPolls } from "../controllers/pollControllers.js";
import { pollSchemaValidation } from "../middlewares/pollSchemaValidation.js";

const router = Router();

router.post('/poll', pollSchemaValidation, createPoll);
router.get('/poll', getAllPolls);

export default router;