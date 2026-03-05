import { useState } from "react";
import {motion } from"framer-motion";
2

export default function Contact() {
    const [formData, setFormData] = useState({name:"", email:"", message:""});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error"> ("idle");

    const API_BASE_URL = "http://localhost:8000/api";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch(`${API_BASE_URL}/messages`,{
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(formData),
        });
        if(!response.ok) throw new Error("Failed to send message");

        setStatus("success");
        setFormData({name:"", email:"", message: ""});

        setTimeout(()=> setStatus("idle"),3000);

        } catch (error) {
            console.error(error);
            setStatus("error");

            setTimeout(()=> setStatus("idle"),3000);
        }
    };

    return(
        <motion.div
        initial={{opacity: 0, y:20}}
        animate={{opacity:1, y:0}}
        className="max-w-4xl mx-auto py-12 px-6 flex-grow">

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                    Get In <span className="text-electric-teal">Touch</span>
                </h2>

                <p className="text-gray-400">
                        Have a project in mind or just want to say hi ?
                </p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                {status === "success" && (
                    <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-electric-teal/20 text-electric-teal flex items-center justify-center text-3xl mb-4 border-electric-teal/50">
                            ✓
                        </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Secured</h3>
                            <p className="text-gray-400">Message sent </p>
                    </div>
                )}

                {status === "error" && (
                    <div className="absolute inset-0 bg-obsidian/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-3xl mb-4 border-red-500/50">
                            ✕
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">Failed to send message</h3>

                        <p className="text-gray-400">
                            There was an error sending your message. Please try again
                        </p>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-2">Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-2">Email</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 ml-2">Message</label>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={5}  placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white" ></textarea>
                </div>

                <button disabled={status === "loading"} type="submit" className="md:col-span-2 bg-electric-teal text-black font-bold py-4 rounded-xl hover:scale[1.02] active: scale-95 transition-all shadow-[0_0_20px_rgba(0, 229, 55, 0.3)] disabled:opacity-50 disabled:hover:scale-100 flex justify-center items-center h-14">

                    {status === "loading" ?(
                            <div className="w-6 h-6 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
                    ) : (
                        "Send message"
                    )}
                
                </button>
            </form>
        </motion.div>
    );
}