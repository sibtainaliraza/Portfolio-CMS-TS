import { useState } from "react";

export default function SystemSettings() {
  const [isUploading, setIsUploading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const token = localStorage.getItem("adminToken");

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file); // Must match upload.single("resume")

    try {
      const response = await fetch(`${API_BASE_URL}/resume/upload`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}` 
            // DO NOT SET CONTENT-TYPE HERE
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("CV Synchronized with Cloudinary and Database!");
      } else {
        alert(`Upload Failed: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Network transmission error.");
    } finally {
      setIsUploading(false);
      e.target.value = ""; // Clear input for next upload
    }
  };

  return (
    <div className="max-w-4xl space-y-12">
      <h1 className="text-3xl font-bold text-white">System <span className="text-electric-teal">Settings</span></h1>
      <div className="glass p-10 rounded-3xl border border-white/10 text-center">
        <input type="file" id="resume-upload" className="hidden" accept=".pdf" onChange={onFileChange} />
        <label 
          htmlFor="resume-upload" 
          className={`cursor-pointer inline-block bg-electric-teal text-black font-bold py-4 px-10 rounded-xl transition-all ${isUploading ? 'opacity-50 animate-pulse' : 'hover:scale-105'}`}
        >
          {isUploading ? "SYNCING TO CLOUD..." : "UPLOAD MASTER CV (PDF)"}
        </label>
      </div>
    </div>
  );
}