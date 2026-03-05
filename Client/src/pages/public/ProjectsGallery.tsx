import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProjectGallery() {
  const [projects, setProjects] = useState<any[]>([]);
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(result => {
        const actualProjects = result.data || result;
        setProjects(Array.isArray(actualProjects) ? actualProjects : []);
      })
      .catch(err => console.error("Gallery fetch failed:", err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <Link to={`/projects/${project._id}`} key={project._id} className="block group">
            <div className="glass p-6 rounded-2xl border border-white/5 group-hover:border-electric-teal/30 transition-all h-full flex flex-col">
              
              {/* Header & Description */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-electric-teal transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack?.map((tech: string) => (
                    <span key={tech} className="text-[10px] bg-electric-teal/10 text-electric-teal px-2 py-1 rounded border border-electric-teal/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTON AREA - REPLACED SOURCE WITH LIVE */}
              <div className="pt-4 border-t border-white/5">
                <a 
                  href={project.liveUrl || "#"} 
                  target="_blank" // Opens in new tab
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevents opening the detail page
                  className={`block w-full text-center py-3 rounded-xl font-bold text-sm tracking-widest transition-all ${
                    project.liveUrl 
                      ? "bg-electric-teal text-black hover:opacity-90 shadow-[0_0_20px_rgba(0,229,255,0.2)]" 
                      : "bg-white/5 border border-white/10 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {project.liveUrl ? "LIVE ↗" : "LIVE LINK PENDING"}
                </a>
              </div>

              <p className="mt-4 text-[9px] text-center text-gray-500 uppercase tracking-widest font-bold group-hover:text-white transition-colors">
                View Full Architecture →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}