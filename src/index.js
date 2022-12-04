import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import pollRoutes from '../src/routes/poll.routes.js';
import choiceRoutes from '../src/routes/choice.routes.js';
import voteRoutes from '../src/routes/vote.routes.js';
import resultRoutes from '../src/routes/result.routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(pollRoutes);
app.use(choiceRoutes);
app.use(voteRoutes);
app.use(resultRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})