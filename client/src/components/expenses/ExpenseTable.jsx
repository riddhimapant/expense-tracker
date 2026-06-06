import { Pencil, Trash2 } from "lucide-react";

export default function ExpenseTable({ expenses, onDelete, onEdit }) {
  const format = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amt);

  return (
    <div className="bg-white rounded-xl border">
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
             <td>{e.note}</td>
              <td>{e.category}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{format(e.amount)}</td>
              <td className="flex gap-2">
                <Pencil size={16} onClick={() => onEdit(e)} />
                <Trash2 size={16} onClick={() => onDelete(e.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}