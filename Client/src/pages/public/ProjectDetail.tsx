import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      if (response.ok) {
        const result = await response.json();
        // Correctly extracting 'data' property
        setProject(result.data || result); 
      }
    };
    if (id) fetchProject();
  }, [id]);

  if (!project) return <div className="text-center py-20 text-white">Scanning Database...</div>;

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/projects" className="text-gray-500 hover:text-electric-teal text-sm font-bold mb-8 block">← BACK TO PROJECTS</Link>
      
      <h1 className="text-5xl font-bold text-white mb-6">{project.title}</h1>
      
      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack?.map((tech: string) => (
          <span key={tech} className="text-xs text-electric-teal bg-electric-teal/10 px-3 py-1.5 rounded-md border border-electric-teal/20">{tech}</span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Architecture Overview</h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{project.description}</p>
        </div>

        {/* Buttons for GitHub and Live URLs */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-2">Links</h2>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-full glass border border-white/10 py-4 text-center font-bold rounded-xl hover:border-electric-teal transition-all">SOURCE CODE ↗</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-full bg-electric-teal text-black py-4 text-center font-bold rounded-xl hover:opacity-90 transition-all">LIVE DEMO ↗</a>
          )}
        </div>
      </div>
    </div>
  );
}