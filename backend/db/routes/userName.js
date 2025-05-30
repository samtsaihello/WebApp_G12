// import {} from "../controllers/lists";
import {getUserName, logIn} from "../controllers/userName.js";
import express from "express";

const router = express.Router();

router.post("/", getUserName);
router.get("/login", logIn);

export default router;
