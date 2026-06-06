import { Home, PlusCircle, BarChart3, List, Download, Settings } from "lucide-react";

export default function Sidebar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="p-6 font-bold text-lg">ExpenseTracker</div>

      <nav className="flex-1 px-4 space-y-2">
        <button 
          onClick={() => scrollToSection("summary")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <Home size={18} /> Dashboard
        </button>

        <button 
          onClick={() => scrollToSection("add-expense")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <PlusCircle size={18} /> Add Expense
        </button>

        <button 
          onClick={() => scrollToSection("expenses-list")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <List size={18} /> All Expenses
        </button>

        <button 
          onClick={() => scrollToSection("analytics")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <BarChart3 size={18} /> Analytics
        </button>

        <button 
          onClick={() => scrollToSection("export")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <Download size={18} /> Export Data
        </button>
      </nav>

      <div className="p-4 border-t">
        <button 
          onClick={() => scrollToSection("settings")}
          className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full"
        >
          <Settings size={18} /> Settings
        </button>
      </div>
    </div>
  );
}