//import { PrismaClient } from "@prisma/client"; //dont work
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

// Get all items of a user
export const getItems = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const items = await prisma.item.findMany({ where: { userId } });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items: ", error);
    res.status(500).json({ error: "Failed to fetch items" });
  }
};

//  Get one item by ID
export const getItemById = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { id } = req.params;

    const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });
    if (!item || userId !== item.userId) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item by ID: ", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

//  Create new item
export const createItem = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { name, description, category, stock, price, imageUrl } = req.body;

    const newItem = await prisma.item.create({
      data: {
        name,
        description,
        category,
        stock,
        price,
        imageUrl,
        userId,
      },
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item", error);
    res.status(500).json({ error: "Failed to create item" });
  }
};

//  Update item
export const updateItem = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { id } = req.params;
    const { name, description, category, stock, price, imageUrl } = req.body;

    const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });
    if (!item || userId !== item.userId) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { name, description, category, stock, price, imageUrl },
    });

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item: ", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

//  Delete item
export const deleteItem = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { id } = req.params;

    const item = await prisma.item.findUnique({ where: { id: parseInt(id) } });
    if (!item || userId !== item.userId) {
      return res.status(404).json({ error: "Item not found" });
    }

    await prisma.item.delete({ where: { id: parseInt(id) } });

    res.json({ success: true });
  } catch (error) {
    console.error("Failed to delete item: ", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
};
