import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/public/Home";
import ProjectGallery from "./pages/public/ProjectsGallery"; 
import ProjectDetail from "./pages/public/ProjectDetail";
import BlogGallery from "./pages/public/BlogGallery";
import Contact from "./pages/public/Contact";
import NotFound from "./pages/public/NotFound";

import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageBlogs from "./pages/admin/ManageBlogs";
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
        <Route path="/projects" element={<ProjectGallery />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<BlogGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<Login />} />

      {/* SECURE ADMIN ROUTES (Layout Wrapper) */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* If user types just "/admin", auto-redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="blogs" element={<ManageBlogs />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="settings" element={<Settings />} />
      </Route>

    </Routes>
  );
}