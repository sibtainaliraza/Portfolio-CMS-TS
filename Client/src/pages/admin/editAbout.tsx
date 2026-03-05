import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditAbout() {
  const [formData, setFormData] = useState({ bio: "", skills: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken");

  // Load existing profile data from MongoDB on component mount
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/about`);
        const result = await res.json();
        // Handle both nested data or direct object response
        const data = result.data || result;
        setFormData({
          bio: data.bio || "",
          skills: data.skills?.join(", ") || ""
        });
      } catch (error) {
        console.error("Failed to load about data:", error);
      }
    };
    fetchAbout();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_BASE_URL}/about`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // JWT Protection
        },
        // Convert comma-separated string back to an array for the backend
        body: JSON.stringify({ 
          bio: formData.bio, 
          skills: formData.skills.split(",").map(s => s.trim()).filter(s => s !== "") 
        }),
      });

      if (!response.ok) throw new Error("Update failed");
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Update Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-4xl space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Edit <span className="text-electric-teal">Profile</span></h1>
          <p className="text-gray-500 text-sm mt-2 font-medium uppercase tracking-widest">Update your professional narrative</p>
        </div>
        
        {/* Status Notification */}
        <AnimatePresence>
          {status === "success" && (
            <motion.span 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }} 
              className="text-electric-teal text-xs font-bold tracking-widest"
            >
              ✓ PROFILE SYNCHRONIZED
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSave} className="glass p-8 rounded-3xl border border-white/5 space-y-8 bg-white/[0.01] backdrop-blur-xl">
        
        {/* Biography Input */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-2">Professional Biography</label>
          <textarea 
            required
            value={formData.bio} 
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white h-64 outline-none focus:border-electric-teal/50 transition-all leading-relaxed text-sm"
            placeholder="Describe your journey "
          />
        </div>

        {/* Skills Tagging */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-2">Technical Arsenal (Comma Separated)</label>
          <input 
            required
            type="text"
            value={formData.skills} 
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-electric-teal/50 transition-all text-sm"
            placeholder="React, Node.js, MongoDB, TypeScript, Git..."
          />
          <p className="text-[9px] text-gray-600 italic px-2">
            Tip: These skills will appear as glowing, interactive tags on your public About page.
          </p>
        </div>

        <button 
          disabled={status === "loading"}
          type="submit" 
          className="w-full sm:w-auto bg-electric-teal text-black font-bold py-4 px-12 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(0,229,255,0.2)] disabled:opacity-50"
        >
          {status === "loading" ? "SYNCING..." : "UPDATE PROFESSIONAL BIO"}
        </button>
      </form>

      {/* Admin Information Block */}
      <div className="pt-10 border-t border-white/5">
        <div className="p-6 rounded-2xl border border-dashed border-white/10 text-gray-500 text-xs italic bg-white/[0.01]">
          "All changes are encrypted and saved directly to the MongoDB cluster. Ensure your bio highlights your expertise in MERN and LLD for potential Kolkata-based recruiters."
        </div>
      </div>
    </motion.div>
  );
}