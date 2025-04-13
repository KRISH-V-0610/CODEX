import React, { useState, useEffect } from 'react';
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const CodeEditorSettingsModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { authUser } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const [username, setUsername] = useState(authUser?.username || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [fontSize, setFontSize] = useState("Medium");
  const [darkMode, setDarkMode] = useState(true);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Here you would typically save the settings to your store or backend
    // For now, we'll just close the modal
    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal container */}
      <div 
        className={`relative z-10 bg-[#1A1A1A] border-2 border-[#D72638] rounded-xl p-6 w-full max-w-md mx-4 transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-90"
        }`}
      >
        {/* Close button */}
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-[#FFCCCB] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Modal header */}
        <div className="text-center mb-6">
          <div className="logo-container mx-auto mb-2">
            <span className="logo-text">Code</span>
            <span className="logo-x">X</span>
          </div>
          <h2 className="text-2xl font-bold text-white select-none">Editor Settings</h2>
          <p className="text-[#FFCCCB] mt-1">Customize your coding experience</p>
        </div>

        {/* Settings form */}
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
              disabled
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#FFCCCB] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#2D2D2D] text-white rounded-lg border border-[#5C0000] focus:outline-none focus:ring-2 focus:ring-[#D72638] focus:border-transparent"
              disabled
            />
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold text-[#FFCCCB] mb-2">Editor Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white">Dark Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-[#5C0000] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D72638]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Font Size</span>
                <select 
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="bg-[#2D2D2D] text-white text-sm rounded-lg focus:ring-[#D72638] focus:border-[#D72638] block p-1 border border-[#5C0000]"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="button-54 w-full mt-6 py-3 flex items-center justify-center"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default CodeEditorSettingsModal;