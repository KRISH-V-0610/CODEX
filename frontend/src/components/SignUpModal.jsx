import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";

const SignupModal = ({ onClose, onLoginClick }) => {
  const { signup, authUser } = useAuthStore(); // Ensure setAuthUser is available
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (authUser && authUser.user.username) {
      navigate(`/${authUser.user.username}`);
      window.location.reload();
    }
  }, [authUser, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await signup(formData); // Ensure signup returns user data
   
  };

  const validateForm = () => {
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out 
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96 relative z-10 border border-white/20">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-md font-semibold hover:bg-cyan-700 transition">
            Sign up
          </button>
        </form>

        <p className="text-center mt-4 text-white">
          Already have an account?{" "}
          <button onClick={() => { handleClose(); onLoginClick(); }} className="text-cyan-300 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
