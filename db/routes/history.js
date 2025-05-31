import {storeHistory, getHistory} from "../controllers/history.js";
import express from "express";

const router = express.Router();

router.post("/", storeHistory); // Store a new history
router.get("/get/:user", getHistory); // Output all history of a user

// export the router
export default router;