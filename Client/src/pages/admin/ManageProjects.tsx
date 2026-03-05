import { useState, useEffect } from "react";

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    techStack: "",
    githubUrl: "", // Added
    liveUrl: ""    // Added
  });
  
  const API_BASE_URL = "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken");

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`);
      const result = await res.json();
      setProjects(result.data || result || []);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Session expired.");

    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...formData,
          techStack: formData.techStack.split(",").map(s => s.trim()).filter(Boolean)
        }),
      });

      if (response.ok) {
        alert("Project Deployed!");
        setFormData({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "" });
        fetchProjects(); 
      }
    } catch (error) {
      alert("Network Error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-3xl font-bold text-white">Project <span className="text-electric-teal">Management</span></h1>
      
      <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-white/10 space-y-4">
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal h-32" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="Tech Stack (comma separated)" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
        {/* New Link Inputs */}
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="GitHub URL" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="Live Demo URL" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
        <button type="submit" className="w-full bg-electric-teal text-black font-bold py-4 rounded-xl hover:opacity-90">DEPLOY PROJECT</button>
      </form>

      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="p-4 glass border border-white/5 rounded-xl flex justify-between items-center group">
            <span className="font-bold text-white">{p.title}</span>
            <button onClick={() => handleDelete(p._id)} className="text-red-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all">DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}