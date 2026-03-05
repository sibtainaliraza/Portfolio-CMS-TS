import { useState, useEffect } from "react";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [formData, setFormData] = useState({ title: "", content: "", tags: "" });
  const API_BASE_URL = "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken");

  const fetchBlogs = async () => {
    const res = await fetch(`${API_BASE_URL}/blogs`);
    const result = await res.json();
    setBlogs(result.data || []);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        ...formData,
        tags: formData.tags.split(",").map(s => s.trim())
      }),
    });
    setFormData({ title: "", content: "", tags: "" });
    fetchBlogs();
  };

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-3xl font-bold text-white">Blog <span className="text-electric-teal">CMS</span></h1>
      <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border border-white/10 space-y-4">
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="Article Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        <textarea className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal h-64" placeholder="Content (Markdown supported...)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required />
        <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal" placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
        <button type="submit" className="w-full bg-electric-teal text-black font-bold py-4 rounded-xl hover:opacity-90">PUBLISH ARTICLE</button>
      </form>
    </div>
  );
}