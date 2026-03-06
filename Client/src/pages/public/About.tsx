import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [data, setData] = useState<{ bio: string; skills: string[] } | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then((res) => res.json())
      .then((result) => setData(result.data || result))
      .catch((err) => console.error("Failed to fetch bio", err));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto py-20 px-6 space-y-20"
    >
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          The <span className="text-electric-teal glow-text-teal">Architect</span> Behind the Code
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.3em] text-xs font-bold">
          Full-Stack Developer • AI-Enthusiast 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Bio Section */}
        <div className="md:col-span-2 space-y-8">
          <section className="glass p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01]">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-electric-teal"></span>
              Professional Journey
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
              {data?.bio || "Loading professional biography..."}
            </p>
          </section>

          {/* Core Values / Philosophy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border-l-2 border-electric-teal/30 bg-electric-teal/[0.02]">
              <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Clean Code</h3>
              <p className="text-gray-500 text-xs">Prioritizing maintainable, readable, and scalable architecture in every build.</p>
            </div>
            <div className="p-6 border-l-2 border-blue-500/30 bg-blue-500/[0.02]">
              <h3 className="text-white font-bold mb-2 text-sm uppercase tracking-wide">Performance First</h3>
              <p className="text-gray-500 text-xs">Optimizing MERN applications for speed and seamless user experiences.</p>
            </div>
          </div>
        </div>

        {/* Sidebar: Skills & Quick Info */}
        <aside className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-white/10 bg-black/40">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {data?.skills?.map((skill: string) => (
                <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-bold">Current Mission</h3>
            <p className="text-white text-sm font-medium">Seeking Software Engineer roles in Kolkata / Remote to build intelligent applications blending AI/ML with scalable MERN backends.</p>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}