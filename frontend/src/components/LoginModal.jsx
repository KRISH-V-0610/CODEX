import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose, onSignupClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { login, authUser } = useAuthStore();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // console.log('authUser', authUser)
    if (authUser && authUser.user.username) {
      navigate(`/${authUser.user.username}`);
      window.location.reload();
    }
  }, [authUser, navigate]);


  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-96 relative z-10 border border-white/20">
        <button onClick={handleClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
              className="w-full px-3 py-2 bg-transparent text-white rounded border border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-md font-semibold hover:bg-cyan-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-white">
          Don’t have an account? {" "}
          <button onClick={() => { handleClose(); onSignupClick(); }} className="text-cyan-300 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
