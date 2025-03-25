import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const { logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="font-[raleway] bg-black text-white px-6 py-4 shadow-lg select-none">
      <div className="container mx-auto flex justify-between items-center">

        {/* Desktop Menu */}
        <ul className="hidden font-semibold md:flex space-x-5">
          <li>
            <Link to="/" className="font-bold">Contact Us</Link>
          </li>

          <li className="relative">
            {/* <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="font-bold flex items-center space-x-1 focus:outline-none">
              <span>Ask AI</span>
              {dropdownOpen ? <IoChevronUpSharp /> : <IoChevronDownSharp />}
            </button>
            {dropdownOpen && (
              <ul className="z-10 absolute left-0 mt-2 w-40 bg-zinc-900 border-amber-50 border-1 text-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform origin-top scale-100">
                <li className="hover:bg-cyan-600 px-4 py-2 cursor-pointer transition-colors">GPT-4</li>
                <li className="hover:bg-cyan-600 px-4 py-2 cursor-pointer transition-colors">DeepSeek</li>
                <li className="hover:bg-cyan-600 px-4 py-2 cursor-pointer transition-colors">Code Llama</li>
              </ul>
            )} */}
          </li>
        </ul>

        <div
          className="text-4xl cursor-default font-extrabold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent transition-all duration-300 ease-in-out flex items-center p-0.5 hover:from-white hover:to-cyan-400 ml-24 hover:scale-110">
          Code<i className="text-4xl mb-1">X</i>
        </div>

        {/* Authentication Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onLoginClick}
            className="hidden md:block cursor-pointer relative px-4 py-2 overflow-hidden font-bold rounded-full group">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="flex items-center gap-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">Login</span>
            <span className="absolute inset-0 rounded-full"></span>
          </button>

          <button
            onClick={onSignupClick}
            className="hidden md:block cursor-pointer relative px-4 py-2 overflow-hidden font-bold rounded-full group">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="flex items-center gap-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">SignUp</span>
            <span className="absolute inset-0 rounded-full"></span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl focus:outline-none text-white font-extrabold">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gradient-to-r from-blue-400 to-purple-500 font-bold p-4 mt-2 space-y-2 text-center">
          <li>
            <Link to="/" className="block py-2 text-white hover:text-blue-300 transition-colors">Profile</Link>
          </li>
          <li>
            <button onClick={onLoginClick} className="block py-2 text-white hover:text-blue-300 transition-colors">Login</button>
          </li>
          <li>
            <button onClick={onSignupClick} className="block py-2 text-white hover:text-blue-300 transition-colors">SignUp</button>
          </li>
          <button onClick={logout} className="w-full cursor-pointer text-white font-semibold bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg mt-2">Logout</button>
        </ul>
      )}
      <hr className="mt-1" />
    </nav>
  );
};

export default Navbar;
