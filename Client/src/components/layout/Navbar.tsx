import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // UPDATED: Removed Blog, added About to reflect your new site structure
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "About", path: "/about" }, 
        { name: "Contact", path: "/contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center bg-black/50 backdrop-blur-md"
        >
            <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
                SIBTAIN ALI RAZA <span className="text-[var(--color-electric-teal)]">.</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-white/70 text-sm font-medium">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`transition-all duration-300 hover:text-white uppercase tracking-widest text-[10px] ${
                            location.pathname === item.path ? "text-[var(--color-electric-teal)] glow-text-teal" : ""
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <div 
                className="md:hidden text-white/50 cursor-pointer hover:text-white transition-colors p-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full glass border-b border-white/5 md:hidden flex flex-col overflow-hidden shadow-2xl bg-black/95 backdrop-blur-2xl"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-8 py-6 border-b border-white/5 transition-all duration-300 text-xs font-bold tracking-[0.2em] uppercase ${
                                    location.pathname === item.path 
                                        ? "text-[var(--color-electric-teal)] bg-[var(--color-electric-teal)]/5" 
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}