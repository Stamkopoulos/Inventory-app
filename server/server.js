// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { PrismaClient } from "@prisma/client";
// import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

// dotenv.config();
// const app = express();
// const prisma = new PrismaClient();
// const requireAuth = ClerkExpressRequireAuth();

// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => res.send("API is running"));

// // Protected Routes
// app.get("/items", requireAuth, async (req, res) => {
//   const userId = req.auth.userId;
//   const items = await prisma.item.findMany({ where: { userId } });
//   res.json(items);
// });

// app.post("/items", requireAuth, async (req, res) => {
//   const userId = req.auth.userId;
//   const { name, description, category, stock, price, imageUrl } = req.body;
//   const newItem = await prisma.item.create({
//     data: { name, description, category, stock, price, imageUrl, userId },
//   });
//   res.json(newItem);
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./routes/items.js";

import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
