const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Create a user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  console.log(name, email);

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User creation failed" });
  }
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
