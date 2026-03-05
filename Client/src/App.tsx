import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// PUBLIC PAGES
import Home from "./pages/public/Home";
import About from "./pages/public/About"; 
import ProjectGallery from "./pages/public/ProjectsGallery"; 
import ProjectDetail from "./pages/public/ProjectDetail";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

// ADMIN PAGES
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import EditAbout from "./pages/admin/editAbout"; 
import Inbox from "./pages/admin/Inbox";
import Settings from "./pages/admin/Settings";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      <Navbar />
      <main className="container mx-auto pt-24 px-6 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> {/* REPLACED: Blog with About */}
        <Route path="/projects" element={<ProjectGallery />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* SECURE ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Auto-redirect /admin to /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="about" element={<EditAbout />} /> {/* REPLACED: Blogs with Edit About */}
        <Route path="inbox" element={<Inbox />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}