import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Settings,
  LogOut,
  TrendingUp // Added for consistency with Login
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },
    {
      label: "Transactions",
      icon: CreditCard,
      path: "/transactions"
    },
    {
      label: "Eco-Market",
      icon: ShoppingBag,
      path: "/eco-market"
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <aside className="w-[250px] bg-slate-900/80 backdrop-blur-xl border-r border-slate-700/30 flex flex-col h-full transition-all duration-300">
      
      {/* Branding */}
      <div className="text-2xl font-bold mb-10 flex items-center gap-3 px-6 pt-6">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg shadow-emerald-500/20">
             <TrendingUp className="text-white w-5 h-5" />
        </div>
        <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent transform translate-y-0.5">
          CrediWise
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 backdrop-blur-sm"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-emerald-300 hover:backdrop-blur-sm"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all font-medium group border border-transparent hover:border-red-500/10"
        >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
