import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null); // State for the clicked message
  const [isLoading, setIsLoading] = useState(true);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken");

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      setMessages(result.data || []);
    } catch (error) {
      console.error("Inbox sync failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  // Delete message function
  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge this transmission permanently?")) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        setMessages(messages.filter(m => m._id !== id));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error("Purge failed", error);
    }
  };

  return (
    <div className="space-y-8 relative">
      <h1 className="text-3xl font-bold">Secure <span className="text-electric-teal">Inbox</span></h1>
      
      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 glass rounded-2xl border border-white/5" />)}
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 italic">No transmissions received yet.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <motion.div 
              key={msg._id} 
              layoutId={msg._id}
              onClick={() => setSelectedMessage(msg)} // Click to open
              className="glass p-6 rounded-2xl border border-white/5 hover:border-electric-teal/30 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-white group-hover:text-electric-teal transition-colors">{msg.name}</h3>
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{msg.email}</p>
                </div>
                <span className="text-[10px] text-gray-600 font-mono">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-400 text-sm line-clamp-1">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* --- FULL MESSAGE OVERLAY --- */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={selectedMessage._id}
              className="relative glass max-w-2xl w-full p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] text-electric-teal font-bold tracking-[0.3em] uppercase mb-2">Secure Transmission</p>
                  <h2 className="text-3xl font-bold text-white">{selectedMessage.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{selectedMessage.email}</p>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-gray-500 hover:text-white transition-colors text-xl">✕</button>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl mb-8">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <span className="text-[10px] text-gray-600 font-mono uppercase">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(selectedMessage._id); }}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Purge Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}