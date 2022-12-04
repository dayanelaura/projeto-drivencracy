import { Router } from "express";
import { sendVote } from "../controllers/voteController.js";
import { voteValidation } from "../middlewares/voteValidation.js";

const router = Router();

router.post('/choice/:id/vote', voteValidation, sendVote);

export default router;