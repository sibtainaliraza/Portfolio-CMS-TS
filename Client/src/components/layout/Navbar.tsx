import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
    const location = useLocation();

    const navItems =[
        {name:"Home", path: "/"},
        {name:"Projects", path: "/projects"},
        {name:"Blog", path: "/blog"},
        {name:"Contact", path: "/contact"},
    ];

    return (
        <motion.nav
            initial = {{y: -20, opacity: 0}}
            animate = {{y:0, opacity: 1}}
            className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4 px-6
                        md:px-12 flex justify-between items-center">
            <Link to= "/" className="text-2xl font-bold text-white tracking-tighter">
            SIBTAIN ALI RAZA <span className="text-[var(--color-electric-teal)]">.</span>
            </Link>

            <div className="hidden md:flex gap-8 text-white/70 text-sm font-medium">
                {navItems.map((item) =>(
                    <Link 
                        key={item.name}
                        to={item.path}
                        className={`transition-all duration-300 hover:text-white 
                                    ${location.pathname === item.path ?
                                     "text-[var(--color-electric-teal)] glow-text-teal" : ""}
                            }`}>
                            {item.name}
                    </Link>
                ))}
            </div>
            
            <div className="md:hidden text-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1= "3" y1= "12" x2= "21" y2= "12"></line> 
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </div>
        </motion.nav>
    )
}