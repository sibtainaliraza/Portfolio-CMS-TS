import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0 });
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, b, m] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`).then(res => res.json()),
          fetch(`${API_BASE_URL}/messages`).then(res => res.json())
        ]);
        setStats({
          projects: p.data?.length || p.length || 0,
          blogs: b.data?.length || 0,
          messages: m.data?.length || 0
        });
      } catch (error) {
        console.error("Stats fetch failed", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">System <span className="text-electric-teal">Overview</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Projects", value: stats.projects, color: "teal" },
          { label: "Blog Posts", value: stats.blogs, color: "blue" },
          { label: "Unread Messages", value: stats.messages, color: "purple" }
        ].map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-2xl border border-white/5">
            <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">{stat.label}</p>
            <p className="text-4xl font-mono font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}