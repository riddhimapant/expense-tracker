export default function SummaryCards({ data }) {
  const budget = 20000; // demo budget
  const percent = (data.total / budget) * 100;

  return (
    <div className="grid md:grid-cols-4 gap-4">

      <div className="card">
        <p>Total</p>
        <h2>₹{data.total}</h2>
      </div>

      <div className="card">
        <p>This Month</p>
        <h2>₹{data.thisMonthTotal}</h2>
      </div>

      <div className="card">
        <p>Highest Expense</p>
        <h2>₹{data.highest}</h2>
      </div>

      <div className="card">
        <p>Top Category</p>
        <h2>{data.topCategory}</h2>
      </div>

      <div className="card col-span-4">
        <p>Total per Category</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(data.categoryMap || {}).map(([cat, amount]) => (
            <span key={cat} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {cat}: ₹{amount}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}