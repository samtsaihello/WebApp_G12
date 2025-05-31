// import {} from "../controllers/lists";
import {getUserName, logIn, updateUserName} from "../controllers/userName.js";
import express from "express";

const router = express.Router();

router.post("/", getUserName);
router.post("/login", logIn);
router.put("/", updateUserName);

export default router;
