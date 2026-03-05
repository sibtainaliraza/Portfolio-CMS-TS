import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/layout/AdminSidebar"; 

export default function AdminLayout() {
  const token = localStorage.getItem("adminToken");

  // Safety Guard: If no token, kick back to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    // This wrapper provides the black background and layout structure
    <div className="flex h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      
      {/* 1. SIDEBAR COLUMN */}
      <Sidebar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-10 relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-electric-teal)]/5 blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
           {/* This is where your Dashboard stats will now appear! */}
           <Outlet />
        </div>
      </main>

    </div>
  );
}