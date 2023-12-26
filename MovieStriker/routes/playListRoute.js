import express from "express";
import playListController from "../controllers/playListController.js";
import getPlayListController from '../controllers/getPlayListController.js'
const router = express.Router();

router.post("/playlist", playListController).get("/playlist",getPlayListController);
export default router;
