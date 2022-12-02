import { Router } from "express";
import { getChoices, sendChoice } from "../controllers/choiceControllers.js";
import { choiceSchemaValidation } from "../middlewares/choiceSchemaValidation.js";
import { pollValidation } from "../middlewares/pollValidation.js";

const router = Router();

router.post('/choice', choiceSchemaValidation, sendChoice);
router.get('/poll/:id/choice', pollValidation, getChoices);

export default router;