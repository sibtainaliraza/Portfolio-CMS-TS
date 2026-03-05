import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectGallery() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state for better UX
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(result => {
        // Correctly handles { success: true, data: [...] } structure
        const actualProjects = result.data || result;
        setProjects(Array.isArray(actualProjects) ? actualProjects : []);
      })
      .catch(err => console.error("Gallery fetch failed:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="inline-block w-8 h-8 border-2 border-electric-teal border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Synchronizing Project Data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {projects.length === 0 ? (
        <div className="text-center py-24 glass rounded-3xl border border-white/5">
          <p className="text-gray-500 italic">No projects deployed in the current cluster.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <Link to={`/projects/${project._id}`} key={project._id} className="block group">
              <div className="glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-teal/30 transition-all h-full flex flex-col bg-white/[0.01]">
                
                {/* Content Area */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-electric-teal transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack?.map((tech: string) => (
                      <span key={tech} className="text-[9px] font-bold uppercase tracking-wider bg-electric-teal/10 text-electric-teal px-2 py-1 rounded border border-electric-teal/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status-Based Button Logic */}
                <div className="pt-4 border-t border-white/5">
                  <a 
                    href={project.liveUrl || "#"} 
                    target="_blank" 
                    rel="noreferrer"
                    // stopPropagation prevents the Link parent from firing
                    onClick={(e) => {
                      if (!project.liveUrl) e.preventDefault();
                      e.stopPropagation();
                    }} 
                    className={`block w-full text-center py-3 rounded-xl font-bold text-xs tracking-[0.2em] transition-all ${
                      project.liveUrl 
                        ? "bg-electric-teal text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.2)]" 
                        : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {project.liveUrl ? "LIVE PREVIEW ↗" : "LIVE LINK PENDING"}
                  </a>
                </div>

                <p className="mt-4 text-[9px] text-center text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">
                  View Full Architecture →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}