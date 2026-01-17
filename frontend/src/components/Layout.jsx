import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden relative selection:bg-emerald-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
         <Sidebar />
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative md:ml-[250px]">
         <div className="p-6 md:p-8 w-full space-y-8 pb-20">
             
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between mb-6">
                <span className="font-bold text-xl text-white">CrediWise</span>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-slate-800 rounded-lg text-emerald-400 hover:bg-slate-700 transition"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {children}
         </div>
      </main>
    </div>
  );
}
