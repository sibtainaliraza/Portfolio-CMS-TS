import {motion} from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {

  const API_BASE_URL = "http://localhost:5000/api";
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">

    <motion.div
      initial = {{opacity: 0, y:20}}
      animate = {{opacity: 1, y:0 }}
      transition={{duration:0.8}}
      className="max-w-3xl"
    >
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
        Full-Stack <span className="text-[var(--color-electric-teal)] glow-text-teal">Developer</span>
      </h1>

      <p className="text-gray-400 text-lg md:text-xl mb-10">
        Building Scalable MERN applications with clean architecture
        and high-performance digital experiences.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to= "/projects" className="bg-[var(--color-electric-teal)] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-(0_0_20px_rgba(0, 229, 255, 0.4)">
            View Projects
        </Link>
        <a href={`${API_BASE_URL}/resume/download`} className="glass border border-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/5 transition-colors">Download CV</a>
      </div>
    </motion.div>
    </div>
  );
}