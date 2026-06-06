export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
    >
      {children}
    </button>
  );
}