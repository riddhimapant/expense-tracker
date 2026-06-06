import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/expenses.json");
// 📥 Read File
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// 💾 Write File
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ➕ Add Expense
export const addExpense = (req, res) => {
  const { note, amount, category, date } = req.body;

  if (!note || !amount || !category) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const expenses = readData();

  const newExpense = {
    id: uuidv4(),
    note,
    amount: Number(amount),
    category,
    date: date || new Date()
  };

  expenses.push(newExpense);
  writeData(expenses);

  res.status(201).json(newExpense);
};

// 📄 Get All Expenses
export const getExpenses = (req, res) => {
  let expenses = readData();

  const { category, search } = req.query;

  if (category) {
    expenses = expenses.filter(e => e.category === category);
  }

  if (search) {
    expenses = expenses.filter(e =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(expenses);
};

// ✏️ Update Expense
export const updateExpense = (req, res) => {
  const { id } = req.params;
  const expenses = readData();

  const index = expenses.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  expenses[index] = { ...expenses[index], ...req.body };

  writeData(expenses);

  res.json(expenses[index]);
};

// ❌ Delete Expense
export const deleteExpense = (req, res) => {
  const { id } = req.params;
  let expenses = readData();

  expenses = expenses.filter(e => e.id !== id);

  writeData(expenses);

  res.json({ message: "Deleted successfully" });
};

// 📊 Summary
export const getSummary = (req, res) => {
  const expenses = readData();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highest = Math.max(...expenses.map(e => e.amount), 0);

  const categoryMap = {};
  expenses.forEach(e => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  res.json({ total, highest, categoryMap });
};