import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 flex-grow relative overflow-hidden">
      
      {/* Background Ghost Text */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[150px] md:text-[250px] font-black text-white/5 absolute select-none pointer-events-none"
      >
        404
      </motion.h1>

      {/* Foreground Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
            <span className="text-red-500 text-2xl">⚠</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          System <span className="text-electric-teal glow-text-teal">Glitch</span>
        </h2>
        
        <p className="text-gray-400 mb-10 max-w-md text-lg">
          The route you requested has been encrypted, moved, or never existed in the database.
        </p>
        
        <Link 
          to="/" 
          className="bg-electric-teal text-black px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center gap-2"
        >
          <span>Return to Base</span>
          <span className="text-xl leading-none">↲</span>
        </Link>
      </motion.div>

    </div>
  );
}