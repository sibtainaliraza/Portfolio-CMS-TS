import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export default function ProjectGallery() {


  const [projects, setProjects] = useState<Project[]>([]);




  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("System Error: Failed to fetch proejcts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);


  return (
    <div className="container mx-auto px-6 py-12 flex-grow">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center md:text-left">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Selected <span className="text-electric-teal glow-text-teal">Works</span>
        </h1>

        <p className="text-gray-400 max-w-2xl text-lg">
          Dynamic architecture powered by my custom MERN CMS.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 rounded-full border-2 border-electric-teal border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/5 rounded-2xl overflow-hidden 
                  flex flex-col h-full hover:border-electric-teal/30 transition-all duration-500">

              <div className="p-6 flex flex-col flex-grow">
                <Link to={`/projects/${project._id}`} className="hover: text-electric-teal transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 "> {project.title}</h3>
                </Link>

                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] uppercase tracking-widest text-electric-teal bg-electric-teal/10 px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <Link to ={`/projects/${project._id}`}
                    className="text-xs font-bold text-white hover:text-electric-teal transition-colors" >
                    VIEW DETAILS
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

