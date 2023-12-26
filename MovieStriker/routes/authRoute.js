import express from "express";

import {
  registerController,
  loginController,
} from "../controllers/authController.js";

const router = express.Router();

// routing
// register || post method
router.post("/register", registerController);
// login || post method
router.post("/login", loginController);

export default router;
