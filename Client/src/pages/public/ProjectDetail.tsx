import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";


interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl ? : string;
}

export default function ProjectDetail() {
  const { id } = useParams<{id:string}>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(()=>{
    const fetchProject = async() => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        if(response.ok)
        {
          const data = await response.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project details", error);
      } finally{
        setIsLoading(false);
      }
    };

    if(id) fetchProject();
  },[id]);

  if(isLoading)
  {
    return(
      <div className="flex-grow flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 rounded-full border-2 border-electric-teal border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if(!project)
  {
    return(
      <div className="flex-grow flex flex-col items-center justify-center text-center min-h-[50vh]">
          <h2 className="text-3xl font-bold mb-4"> Project <span className="text-electric-teal">Not Found</span></h2>
          <Link to= "/projects" className="text-gray-400 hover:text-white transition-colors">← Return to Gallery</Link>
      </div>
    );
  }

  return(
    <motion.div
    initial={{opacity: 0, y:20}}
    animate={{opacity:1, y:0}}
    className="container mx-auto px-6 py-12 max-w-4xl flex-grow">

      <Link to="/projects" className="inline-block text-gray-500 hover:text-electric-teal text-sm font-bold tracking-widest mb-8 transition-colors">
      ← BACK TO PROJECTS
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-10">
        {project.techStack.map((tech)=>(
          <span
          key={tech} className="text-xs uppercase tracking-widest text-electric-teal bg-electric-teal/10 px-3 py-1.5 rounded-md border border-electric-teal/20">
          {tech}
          </span>
        ))}
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Architecture And Overview</h2>
            <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-2">Links</h2>
            <a href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full glass border border-white/10 py-4 px-6 rounded-xl 
                            font-bold text-center hover:bg-white/5 hover:border-electric-teal/50 transition-all text-sm tracking-wide"   
            >SOURCE CODE ↗</a>

            {project.liveUrl && (
              <a href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-electric-teal text-balance py-4 px-6 rounded-xl 
                            font-bold text-cnter hover:bg-white/5 hover: border-electric-teal/50 
                            transition-all text-sm tracking-wide">
                      
                LIVE DEMO ↗
              </a>
            )}
          </div>
        </div>
    </motion.div>
  );
}