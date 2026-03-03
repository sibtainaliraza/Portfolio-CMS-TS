import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function Navbar() {
    const {isAuthenticated} = useSelector((state:RootState)=> state.auth);

    return(
        <nav className="fixed top-0 w-full z-50 glass border-b border-whte/10
                        py-4 px-1=8 flex justify-between items-center">
                
                <Link to= "/" className="text-2xl font-bold text-white tracking-tighter">
                    PORTFOLIO <span className="text-purple-500"> .</span>
                </Link>

                <div className="flex gap-6 text-white/80 text-sm">
                        <Link to ="/" className="hover:text-white transition-colors">Home</Link>
                         <Link to ="/projects" className="hover:text-white transition-colors">Projects</Link>
                         {isAuthenticated &&(
                            <Link to ="/admin/dashboard" className="text-purple-400 font-semibold">Dashboard</Link>
                         )}
                </div>
        </nav>
    );
}