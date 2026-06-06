export default function ExpenseFilters({
  search, setSearch,
  category, setCategory,
  startDate, setStartDate,
  endDate, setEndDate,
  exportCSV
}) {
  return (
    <div className="flex flex-wrap gap-3 items-center">

      <input
        className="border p-2 rounded-lg"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded-lg"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
      </select>

      <input type="date" className="border p-2 rounded-lg"
        onChange={e => setStartDate(e.target.value)}
      />

      <input type="date" className="border p-2 rounded-lg"
        onChange={e => setEndDate(e.target.value)}
      />

      <button
        onClick={exportCSV}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
      >
        Export CSV
      </button>
    </div>
  );
}