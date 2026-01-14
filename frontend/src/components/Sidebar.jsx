import { LayoutDashboard, CreditCard, ShoppingBag, Settings } from "lucide-react"

const Sidebar = () => {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Transactions", icon: CreditCard, active: false },
    { label: "Eco-Market", icon: ShoppingBag, active: false },
    { label: "Settings", icon: Settings, active: false },
  ]

  return (
    <aside className="w-[250px] bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-r border-slate-700/30 p-8 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="text-2xl font-bold mb-12 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          CB
        </div>
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">CredWise</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                : "text-slate-300 hover:bg-slate-800/50 hover:text-cyan-400 border border-transparent"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
