export default function Header() {
  return (
    <div className="bg-white border-b px-6 py-4 flex justify-between">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg">
        + Add Expense
      </button>
    </div>
  );
}