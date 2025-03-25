import React,{useState,useEffect} from 'react'
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

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96 relative z-10 border border-white/20">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white select-none">Settings</h2>

    
      </div>  
    </div>
  );
}

export default CodeEditorSettingsModal