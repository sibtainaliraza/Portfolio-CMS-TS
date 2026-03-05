import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const API_BASE_URL = "http://localhost:8000/api";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                // Captures "sucess: false" or validation errors from your controller
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);

        } catch (error: any) {
            console.error("Submission Error:", error.message);
            setErrorMessage(error.message);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto py-12 px-6 flex-grow"
        >
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight mb-4">
                    Get In <span className="text-electric-teal">Touch</span>
                </h2>
                <p className="text-gray-400">Have a project in mind or just want to say hi?</p>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 relative overflow-hidden">
                {/* Success Overlay */}
                {status === "success" && (
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-electric-teal/20 text-electric-teal flex items-center justify-center text-3xl mb-4 border border-electric-teal/50">✓</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Message Secured</h3>
                        <p className="text-gray-400">Transmitted to the admin core successfully.</p>
                    </div>
                )}

                {/* Error Overlay with dynamic message */}
                {status === "error" && (
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-10 flex flex-col items-center justify-center text-center p-6">
                        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-3xl mb-4 border border-red-500/50">✕</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Transmission Failed</h3>
                        <p className="text-gray-400 text-sm max-w-xs">{errorMessage || "Check your network or form data."}</p>
                        <button onClick={() => setStatus("idle")} className="mt-4 text-xs text-electric-teal underline font-bold uppercase tracking-widest">Retry</button>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2 font-bold">Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Your Name" className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white text-sm" />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2 font-bold">Email</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@example.com" className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white text-sm" />
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <div className="flex justify-between items-center ml-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Message</label>
                        <span className={`text-[9px] font-bold ${formData.message.length < 10 ? 'text-red-500/50' : 'text-electric-teal/50'}`}>
                            {formData.message.length}/10 min
                        </span>
                    </div>
                    <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." className="bg-white/5 border border-white/10 rounded-xl p-3 focus:border-electric-teal outline-none transition-all text-white text-sm" ></textarea>
                </div>

                <button disabled={status === "loading"} type="submit" className="md:col-span-2 bg-electric-teal text-black font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 flex justify-center items-center h-14">
                    {status === "loading" ? <div className="w-6 h-6 rounded-full border-2 border-black border-t-transparent animate-spin"></div> : "SEND MESSAGE"}
                </button>
            </form>
        </motion.div>
    );
}