import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Interface matches your blog.model.ts
interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  createdAt: string; 
}

export default function BlogGallery() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // FIX: Explicitly set to Port 5000 as requested
  const API_BASE_URL = "http://localhost:8000/api";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs`);
        if (response.ok) {
          const result = await response.json();
          
          /** * FIX: Extraction Logic
           * Your controller returns { success: true, data: [...] }
           * We must set the state to result.data, not the whole result object.
           */
          const blogData = result.data || [];
          setBlogs(Array.isArray(blogData) ? blogData : []);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]); // Fallback to empty array to prevent .map() crashes
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-6 py-12 flex-grow">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Latest <span className="text-electric-teal glow-text-teal">Insights</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg">
          Explorations of computer science concepts and full-stack architecture.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 rounded-full border-2 border-electric-teal border-t-transparent animate-spin"></div>
        </div>
      ) : blogs.length === 0 ? (
        /* Empty State prevents the "White Screen" when no data exists */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass border border-white/5 py-24 px-6 rounded-3xl text-center flex flex-col items-center justify-center"
        >
            <h3 className="text-2xl font-bold text-white mb-3">No Blog Found</h3>
            <p className="text-gray-500 max-w-md">
              The blog section is currently empty. Check back later.
            </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full hover:border-electric-teal/30 transition-all duration-500 group"
            >
              <div className="p-6 flex flex-col flex-grow">
                
                <span className="text-xs font-medium tracking-widest text-gray-500 mb-3 block uppercase">
                  {formatDate(blog.createdAt)}
                </span>

                <Link to={`/blog/${blog.slug}`} className="hover:text-electric-teal transition-colors">
                  <h3 className="text-xl font-bold text-white mb-3 leading-snug">{blog.title}</h3>
                </Link>
                
                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {blog.content.substring(0, 150)}...
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.slice(0, 3).map((tag) => ( 
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-electric-teal bg-electric-teal/10 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="block w-full text-center bg-white/5 border border-white/10 group-hover:border-electric-teal group-hover:bg-electric-teal/10 text-white group-hover:text-electric-teal text-xs font-bold tracking-widest py-3 rounded-xl transition-all duration-300"
                  >
                    READ ARTICLE
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