import { useEffect, useState } from "react";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
} from "../services/api";

import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCards from "../components/dashboards/SummaryCards";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseChart from "../components/dashboards/ExpenseChart";
import ExpenseFilters from "../components/expenses/ExpenseFilters";
import ExpenseForm from "../components/expenses/ExpenseForm";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
    setLoading(false);
  };

  const handleAdd = async (data) => {
    await addExpense(data);
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    fetchExpenses();
  };

  const handleEdit = (exp) => {
    setEditing(exp);
  };

  const handleUpdate = async (data) => {
    await updateExpense(editing.id, data);
    setEditing(null);
    fetchExpenses();
  };

  // 🔍 Filters
  const filtered = expenses
    .filter((e) => {
      const date = new Date(e.date);

      return (
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate)) &&
        (e.note || "").toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || e.category === category)
      );
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 📊 Summary
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const highest = expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)) : 0;

  const now = new Date();
  const thisMonthTotal = expenses
    .filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryMap = {};
  expenses.forEach(e => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const chartData = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const topCategory =
    Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";

  // 📥 CSV EXPORT
  const exportCSV = () => {
    const rows = expenses.map(e =>
      `${e.title},${e.amount},${e.category},${e.date}`
    );

    const blob = new Blob([rows.join("\n")]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  if (loading) {
    return (
      <div className="p-6 animate-pulse space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto">

        <div id="summary">
          <SummaryCards
            data={{ total, highest, topCategory, thisMonthTotal, categoryMap }}
          />
        </div>

        <ExpenseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          exportCSV={exportCSV}
        />

        <div id="add-expense">
          <ExpenseForm
            onSubmit={editing ? handleUpdate : handleAdd}
            initialData={editing}
          />
        </div>

        <div id="export">
          <button 
            onClick={exportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Export to CSV
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>No expenses yet</p>
            <p className="text-sm">Add your first expense 🚀</p>
          </div>
        ) : (
          <>
            <div id="expenses-list">
              <ExpenseTable
                expenses={filtered}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>

            <div id="analytics">
              <ExpenseChart data={chartData} />
            </div>
          </>
        )}

        <div id="settings" className="bg-white p-6 rounded-xl border">
          <h2 className="font-semibold text-lg mb-4">Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Budget (₹)</label>
              <input 
                type="number" 
                defaultValue={20000}
                className="border p-2 rounded-lg w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category Budgets</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-24">Food:</span>
                  <input type="number" defaultValue={5000} className="border p-2 rounded-lg flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">Travel:</span>
                  <input type="number" defaultValue={3000} className="border p-2 rounded-lg flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">Shopping:</span>
                  <input type="number" defaultValue={4000} className="border p-2 rounded-lg flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}