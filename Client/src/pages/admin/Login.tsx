import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid credentials. Access denied.");
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-electric-teal)]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        // Added py-12 for better vertical padding now that the header is gone
        className="w-full max-w-md glass px-10 py-12 rounded-3xl border border-white/10 relative z-10 shadow-2xl"
      >
        {/* HEADER SECTION REMOVED */}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-4 rounded-xl text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Admin Email</label>
            <input 
              required 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-xl p-4 focus:border-[var(--color-electric-teal)] focus:bg-white/5 outline-none transition-all text-white font-mono text-sm"
              placeholder="admin@system.io"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <input 
              required 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-xl p-4 focus:border-[var(--color-electric-teal)] focus:bg-white/5 outline-none transition-all text-white font-mono text-sm tracking-widest"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={isLoading}
            type="submit" 
            className="mt-4 w-full bg-[var(--color-electric-teal)] text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)] disabled:opacity-50 flex justify-center items-center h-14"
          >
            {isLoading ? (
              <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
            ) : (
              "INITIALIZE LOGIN"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}