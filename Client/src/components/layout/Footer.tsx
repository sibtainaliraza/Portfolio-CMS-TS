
import { Link } from "react-router-dom";

export default function Footer(){
    const currentYear = new Date().getFullYear();

    return(
        <footer className="w-full border-t border-white/5 py-8 mt-auto glass">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-gray-500 text-sm tracking-tight">
                      © {currentYear} <span className="text-white font-medium">Sibtain Ali Raza</span> . All rights reserved.
                </p>
                <div className="flex gap-6 text-gray-400 text-sm">
                    <a href="https://github.com/sibtainaliraza" target="_blank" rel="noreferrer" className="hover:text-[(--color-bg-electric-teal)]">Github</a>
                    <a href="https://linkedin.com/in/sibtain-ali-raza" target="_blank" rel="noreferrer" className="hover:text-[(--color-bg-electric-teal)]">LinkedIn</a>
                </div>

                <Link
                    to="/admin/login"
                    className="opacity-0 hover:opacity-100 text-[10px] text-gray-800 transition-opacity duration-500"
                >
                Dashboard
                </Link>
            </div>
        </footer>
    );
}