import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.includes(path);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 glass border-r border-white/5 flex flex-col relative z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)] h-full">

      {/* Header Section */}
      <div className="p-8 border-b border-white/5">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 mb-4 shadow-inner">
          <span className="text-[var(--color-electric-teal)]">⚡</span>
        </div>
        <h2 className="text-xl font-bold tracking-wide text-white">SYSTEM <span className="text-[var(--color-electric-teal)]">CORE</span></h2>
        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Admin Access</p>
      </div>

      {/* Primary Navigation */}
      <nav className="flex flex-col gap-2 p-4 flex-grow">
        <Link
          to="/admin/dashboard"
          className={`px-4 py-3 rounded-xl transition-all font-medium tracking-wide text-sm flex items-center gap-3 ${isActive("dashboard") ? "bg-[var(--color-electric-teal)]/10 text-[var(--color-electric-teal)] border border-[var(--color-electric-teal)]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
        >
          <span>⌘</span> Dashboard
        </Link>
        
        <Link
          to="/admin/projects"
          className={`px-4 py-3 rounded-xl transition-all font-medium tracking-wide text-sm flex items-center gap-3 ${isActive("projects") ? "bg-[var(--color-electric-teal)]/10 text-[var(--color-electric-teal)] border border-[var(--color-electric-teal)]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
        >
          <span>{"</>"}</span> Manage Projects
        </Link>

        {/* UPDATED: Replaced duplicate Inbox with Edit About */}
        <Link
          to="/admin/about"
          className={`px-4 py-3 rounded-xl transition-all font-medium tracking-wide text-sm flex items-center gap-3 ${isActive("about") ? "bg-[var(--color-electric-teal)]/10 text-[var(--color-electric-teal)] border border-[var(--color-electric-teal)]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
        >
          <span>👤</span> Edit About
        </Link>

        <Link
          to="/admin/inbox"
          className={`px-4 py-3 rounded-xl transition-all font-medium tracking-wide text-sm flex items-center gap-3 ${isActive("inbox") ? "bg-[var(--color-electric-teal)]/10 text-[var(--color-electric-teal)] border border-[var(--color-electric-teal)]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
        >
          <span>✉</span> Secure Inbox
        </Link>

        {/* --- SETTINGS OPTION --- */}
        <Link
          to="/admin/settings"
          className={`px-4 py-3 rounded-xl transition-all font-medium tracking-wide text-sm flex items-center gap-3 mt-4 border-t border-white/5 pt-6 ${isActive("settings") ? "bg-[var(--color-electric-teal)]/10 text-[var(--color-electric-teal)] border border-[var(--color-electric-teal)]/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
        >
          <span>⚙</span> System Settings
        </Link>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all font-bold text-sm tracking-widest"
        >
          <span>⏻</span> DISCONNECT
        </button>
      </div>
    </aside>
  );
}