export default function Badge({ children }) {
  return (
    <span className="px-2 py-1 text-xs bg-gray-100 rounded-full">
      {children}
    </span>
  );
}