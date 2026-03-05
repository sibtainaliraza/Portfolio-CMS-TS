import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export default function Inbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const API_BASE_URL = "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken"); // Retrieve token for protected route

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/messages`, {
          headers: { "Authorization": `Bearer ${token}` } //
        });
        const result = await response.json();
        setMessages(result.data || []); // Handle the { success: true, data: [] } structure
      } catch (error) {
        console.error("Inbox sync failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [token]);

  return (
    <div className="space-y-8">
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
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-electric-teal/20 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white">{msg.name}</h3>
                  <p className="text-xs text-electric-teal font-mono">{msg.email}</p>
                </div>
                <span className="text-[10px] text-gray-600 font-mono">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}