import { useState, useEffect } from "react";

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // Track which project is being edited
  const [formData, setFormData] = useState({ 
    title: "", 
    description: "", 
    techStack: "",
    githubUrl: "", 
    liveUrl: ""    
  });
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
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

  // Prepare form for editing
  const handleEditInit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "), // Convert array back to string for input
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Session expired.");

    const method = editingId ? "PUT" : "POST"; // Switch method based on mode
    const url = editingId ? `${API_BASE_URL}/projects/${editingId}` : `${API_BASE_URL}/projects`;

    try {
      const response = await fetch(url, {
        method: method,
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
        alert(editingId ? "Project Updated!" : "Project Deployed!");
        setFormData({ title: "", description: "", techStack: "", githubUrl: "", liveUrl: "" });
        setEditingId(null);
        fetchProjects(); 
      }
    } catch (error) {
      alert("Transmission Error.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge this project from the database?")) return;
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
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Project <span className="text-electric-teal">Management</span></h1>
          <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">
            {editingId ? "Modifying Existing Record" : "Deploying New Project"}
          </p>
        </div>
        {editingId && (
          <button onClick={() => {setEditingId(null); setFormData({title:"", description:"", techStack:"", githubUrl:"", liveUrl:""})}} className="text-red-400 text-[10px] font-bold uppercase tracking-widest hover:underline">Cancel Edit</button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/10 space-y-4 bg-white/[0.01]">
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal transition-all text-sm" placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal h-32 transition-all text-sm" placeholder="Architecture & Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal transition-all text-sm" placeholder="Tech Stack (React, Node, MongoDB...)" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal transition-all text-sm" placeholder="GitHub Repository URL" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
          <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal transition-all text-sm" placeholder="Live Deployment URL" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-electric-teal text-black font-bold py-4 rounded-xl hover:scale-[1.01] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.2)]">
          {editingId ? "SYNC CHANGES" : "DEPLOY TO PUBLIC GALLERY"}
        </button>
      </form>

      {/* PROJECT LIST TABLE */}
      <div className="space-y-3">
        <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-2">Active Database Records</h2>
        {projects.map((p) => (
          <div key={p._id} className="p-5 glass border border-white/5 rounded-2xl flex justify-between items-center group hover:border-white/10 transition-all bg-white/[0.01]">
            <div>
              <span className="font-bold text-white block">{p.title}</span>
              <div className="flex gap-2 mt-1">
                 {p.techStack.slice(0, 3).map((t: string) => <span key={t} className="text-[8px] text-electric-teal/60 font-mono uppercase">{t}</span>)}
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <button onClick={() => handleEditInit(p)} className="text-electric-teal text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all hover:underline tracking-widest">EDIT</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-500 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all hover:underline tracking-widest">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}