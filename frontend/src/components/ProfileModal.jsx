import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const ProfileModal = ({ onClose }) => {
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96 relative z-10 border border-white/20">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Profile Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              value={username}
              disabled

              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-gray-500 focus:outline-none"
            />
          </div>
          <button
            className="w-full bg-cyan-600 text-white py-2 rounded-md font-semibold hover:bg-cyan-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
