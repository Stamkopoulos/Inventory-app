import express from "express";
import { requireAuth } from "@clerk/express";
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemsController.js";

const router = express.Router();

// Routes
router.get("/", requireAuth(), getItems);
router.get("/:id", requireAuth(), getItemById);
router.post("/", requireAuth(), createItem);
router.put("/:id", requireAuth(), updateItem);
router.delete("/:id", requireAuth(), deleteItem);

export default router;
