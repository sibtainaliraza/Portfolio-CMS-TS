import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

//for public
import Home from "./pages/public/Home";
import ProjectGallery from "./pages/public/ProjectsGallery";
import ProjectDetail from "./pages/public/ProjectDetail";
import BlogGallery from "./pages/public/BlogGallery";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

//for the admin
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageBlogs from "./pages/admin/ManageBlogs";
import Inbox from "./pages/admin/Inbox";
import Settings from "./pages/admin/Settings";


export default function App() {
    return(
        <div className="min-h-screen bg-obsidian text-white grow flex flex-col">
            <Navbar/>
            <main className="container mx-auto pt-24 px-6 flex-grow">
                    <Routes>
                        <Route path = "/" element ={<Home/>}/>
                        <Route path = "/projects" element ={<ProjectGallery/>}/>
                        <Route path = "/projects/:id" element ={<ProjectDetail/>}/>
                        <Route path = "/blog" element ={<BlogGallery/>}/>
                        <Route path = "/contact" element ={<Contact/>}/>


                        <Route path = "/admin/login" element ={<Login/>}/>
                        <Route path = "/admin/dashboard" element ={<Dashboard/>}/>
                        <Route path = "/admin/projects" element ={<ManageProjects/>}/>
                        <Route path = "/admin/blogs" element ={<ManageBlogs/>}/>
                        <Route path = "/admin/inbox" element ={<Inbox/>}/>
                        <Route path = "/admin/settings" element ={<Settings/>}/>

                        <Route path = "*" element ={<NotFound/>}/>
                    </Routes>
            </main>

            <Footer />
        </div>   
    );
}