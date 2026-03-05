import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {
  const [aboutData, setAboutData] = useState<{ bio: string } | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

  // Fetch only the bio data for the simplified Home page
  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then((res) => res.json())
      .then((result) => setAboutData(result.data || result))
      .catch((err) => console.error("Failed to fetch profile", err));
  }, []);

  return (
    <div className="flex flex-col items-center px-6 space-y-32 py-12 overflow-hidden">

      {/* --- HERO SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl text-center min-h-[70vh] flex flex-col justify-center relative"
      >
        {/* Subtle Background Glow for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric-teal/10 blur-[120px] rounded-full pointer-events-none"></div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative z-10">
          Full-Stack <span className="text-[var(--color-electric-teal)] glow-text-teal">Developer</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 relative z-10">
          Building Scalable MERN applications with clean architecture
          and high-performance digital experiences.
        </p>

        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <Link
            to="/projects"
            className="bg-[var(--color-electric-teal)] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            View Projects
          </Link>
          
          <a
  href={`${API_BASE_URL}/resume/download`}
  target="_blank"
  rel="noopener noreferrer"
  className="px-8 py-3 rounded-full font-bold border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-electric-teal/50 hover:text-electric-teal transition-all duration-300 flex items-center gap-2"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
  Download CV
</a>

        </div>
      </motion.div>

      {/* --- REFINED ABOUT SECTION (NO SKILLS) --- */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl w-full flex flex-col items-center text-center space-y-12 border-t border-white/5 pt-24 pb-32"
      >
        <div className="space-y-6 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Building the <span className="text-electric-teal glow-text-teal">Future</span> of the Web
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg md:text-xl whitespace-pre-wrap">
            {aboutData?.bio || "Passionate Full-Stack Developer specialized in the MERN stack. Focused on creating efficient, scalable, and user-centric web applications with modern design principles."}
          </p>
        </div>

        {/* Status Board: Now centered for better visual balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="glass p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Current Focus</p>
            <p className="text-sm text-white font-medium tracking-wide">Low-Level Design & MERN</p>
          </div>
          <div className="glass p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-1">Location</p>
            <p className="text-sm text-white font-medium tracking-wide">Kolkata, India</p>
          </div>
        </div>

        <div className="pt-10">
          <p className="text-xs text-gray-500 italic max-w-md mx-auto leading-relaxed">
            "Constantly evolving with the MERN ecosystem to deliver high-performance digital experiences and clean, maintainable architecture."
          </p>
        </div>
      </motion.section>
    </div>
  );
}