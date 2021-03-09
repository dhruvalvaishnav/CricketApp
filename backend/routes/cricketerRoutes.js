import express from "express";
import {
  getCricketers,
  getCricketerById,
  deleteCricketer,
  updateCricketer,
  createCricketer,
} from "../controllers/cricketerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCricketers).post(protect, admin, createCricketer);

router
  .route("/:id")
  .get(getCricketerById)
  .delete(protect, admin, deleteCricketer)
  .put(protect, admin, updateCricketer);

export default router;
