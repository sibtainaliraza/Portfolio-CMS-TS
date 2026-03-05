import { useState } from "react";

export default function Settings() {
  const [resumeUrl, setResumeUrl] = useState("");
  
  // This would point to your uploadRoutes in the future
  const handleUpdateResume = () => {
    console.log("Updating resume link to:", resumeUrl);
    // Add fetch logic to update user profile here
  };

  return (
    <div className="max-w-2xl space-y-12">
      <h1 className="text-3xl font-bold">System <span className="text-electric-teal">Settings</span></h1>

      <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-2">Profile Assets</h2>
          <p className="text-sm text-gray-500 mb-6">Manage the primary resume file used for the public "Download CV" button.</p>
          
          <div className="flex gap-4">
            <input 
              type="text"
              placeholder="Cloudinary or S3 URL"
              className="flex-grow bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-electric-teal"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
            <button 
              onClick={handleUpdateResume}
              className="bg-white/5 border border-white/10 text-white px-6 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}