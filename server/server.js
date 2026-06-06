import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenses.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Server running...");
});

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);