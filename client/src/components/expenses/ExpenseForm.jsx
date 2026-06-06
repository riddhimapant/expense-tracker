import { useState, useEffect } from "react";

export default function ExpenseForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    note: "",
    amount: "",
    category: "",
    date: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.note || !form.amount || !form.category) {
      setError("All fields required");
      return;
    }

    if (form.amount <= 0) {
      setError("Amount must be positive");
      return;
    }

    if (new Date(form.date) > new Date()) {
      setError("Future date not allowed");
      return;
    }

    onSubmit(form);

    setForm({
      note: "",
      amount: "",
      category: "",
      date: ""
    });

    setError("");
  };

  return (
    <form className="bg-white p-6 rounded-xl border space-y-4" onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg">
        {initialData ? "Edit Expense" : "Add Expense"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid md:grid-cols-2 gap-4">
        <input className="border p-2 rounded-lg w-full"
          value={form.note}
          placeholder="Note"
          onChange={e => setForm({...form, note:e.target.value})}
        />

        <input type="number" className="border p-2 rounded-lg w-full"
          value={form.amount}
          placeholder="Amount"
          onChange={e => setForm({...form, amount:e.target.value})}
        />

        <input type="date" className="border p-2 rounded-lg w-full"
          value={form.date}
          onChange={e => setForm({...form, date:e.target.value})}
        />

        <select className="border p-2 rounded-lg w-full"
          value={form.category}
          onChange={e => setForm({...form, category:e.target.value})}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
        </select>
      </div>

      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
        Save
      </button>
    </form>
  );
}