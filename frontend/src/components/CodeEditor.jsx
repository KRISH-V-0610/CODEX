import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { toast } from "react-hot-toast";
import { Play, Trash2, Settings } from "lucide-react";
import { FaPython, FaJsSquare, FaJava } from "react-icons/fa"; // Add language icons
import { SiC, SiCplusplus } from "react-icons/si";


import { AxiosInstance } from "../lib/axios"
import { codeStore } from "../store/codeStore";


const CodeEditor = ({ onCodeEditorSettingsClick }) => {

  const { selectedLanguage, setLanguage } = codeStore();

  const [code, setCode] = useState("// Write your code here...");
  const [userInput, setUserInput] = useState("")
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);


  const handleRunCode = async () => {
    try {
      const response = await AxiosInstance.post('/execute/code', { language: selectedLanguage, code, userInput });
      // console.log(response.data);
      if (response.data.output.trim()) {
        setOutput(response.data.output);
        setError(false);
        toast.success("Code executed successfully!", {
          duration: 2000, // Toast disappears after 2 seconds
        });
      } else {
        setOutput(response.data.error);
        setError(true);
        toast.error("Execution error!", {
          duration: 2000, // Toast disappears after 2 seconds
        });
      }
    } catch (err) {
      setOutput("Error executing code");
      setError(true);
      toast.error("Something went wrong", {
        duration: 2000, // Toast disappears after 2 seconds
      });
    }
  };
  const handleEditorDidMount = (editor, monaco) => {
    // Define custom theme
    monaco.editor.defineTheme("my-custom-theme", {
      base: "vs-dark", // Base theme: "vs", "vs-dark", "hc-black"
      inherit: true, // Inherit from base theme
      rules: [
        { token: "comment", foreground: "A5F3FC", fontStyle: "italic" },
        { token: "keyword", foreground: "00bcd4", fontStyle: "bold" },
        { token: "string", foreground: "CE9178" },
      ],
      colors: {
        "editor.background": "#18181b",
        "editor.lineHighlightBackground": "#333333",
        "editor.selectionBackground": "#264f78",
        "editorCursor.foreground": "#ffffff", // Cursor color should apply now!
      },
    });

    // Set the custom theme
    monaco.editor.setTheme("my-custom-theme");
  };

  const languages = [
    { name: "cpp", icon: <SiCplusplus className={`text-2xl ${selectedLanguage === "cpp" ? "text-white" : "text-cyan-300"}`} /> },
    { name: "c", icon: <SiC className={`text-2xl ${selectedLanguage === "c" ? "text-white" : "text-cyan-300"}`} /> },
    { name: "java", icon: <FaJava className={`text-2xl ${selectedLanguage === "java" ? "text-white" : "text-cyan-300"}`} /> },
    { name: "python", icon: <FaPython className={`text-2xl ${selectedLanguage === "python" ? "text-white" : "text-cyan-300"}`} /> },
    { name: "javascript", icon: <FaJsSquare className={`text-2xl ${selectedLanguage === "javascript" ? "text-white" : "text-cyan-300"}`} /> },
  ];




  return (

    <div className=" font-[raleway] h-screen w-full bg-black text-white p-6 flex flex-col  md:flex-row  space-x-2 ">

      {/* Left */}
      <div className="h-[80%] flex flex-col justify-center items-center">
        {languages.map((language) => (
          <div
            key={language.name}
            onClick={() => setLanguage(language.name)}
            className={`group relative w-12 h-12 p-4 flex items-center justify-center mb-6 transition-all cursor-pointer border border-white/10  rounded-lg 
        ${selectedLanguage === language.name
                ? "text-white shadow-xl border-amber-600 ring-2 ring-cyan-400 transition-all duration-200 ease-out"
                : "bg-black text-cyan-300 hover:text-white hover:shadow-lg transform scale-90 transition-all duration-200 ease-out"}
      `}
            style={{ zIndex: 1 }}
          >
            <span className="rounded flex items-center justify-center">
              {language.icon}
            </span>
            {/* Tooltip */}
            <div
              className="absolute top-1/2 left-full ml-2 -translate-y-1/2 hidden group-hover:flex px-3 py-1 text-xs font-medium text-white bg-cyan-500 rounded-lg shadow-md whitespace-nowrap transition-all duration-200"
              style={{ zIndex: 1000 }}
            >
              {language.name}
            </div>
          </div>
        ))}
      </div>

      {/* Mid */}
      <div className=" w-[50%] h-[80%] flex  sm:flex-col  gap-4 ">


        <div className="w-[100%] flex flex-col justify-end  sm:flex-row ">


          <button
            onClick={handleRunCode}
            className="cursor-pointer relative   bg-cyan-900   px-4 py-2 overflow-hidden font-bold rounded-full group">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="flex items-center gap-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900"> <Play size={16} /> Run</span>
            <span className="absolute inset-0 rounded-full"></span>
          </button>



        </div>


        <div className=" h-full overflow-clip  border-white/60 border-[1.5px] ">
          <MonacoEditor
            height="100%"
            language={selectedLanguage}
            value={code}
            onChange={(newValue) => setCode(newValue)}
            theme="my-custom-theme"
            onMount={handleEditorDidMount}
            options={{
              fontSize: 13,
              minimap: { enabled: false }, // Disable the minimap
              wordWrap: "on",
              automaticLayout: true,
              lineNumbers: "on",
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                alwaysConsumeMouseWheel: true,
              },
            }}
          />
        </div>



      </div>

      {/* Right */}
      <div className=" w-[50%]  h-[80%]  flex   sm:flex-col  gap-2">
        <div className="w-[100%] flex flex-col  sm:flex-row ">

          <button
            onClick={onCodeEditorSettingsClick}
            className="cursor-pointer relative bg-cyan-900 mb-2 px-4 py-2 overflow-hidden font-bold rounded-full group">
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="flex items-center gap-2 relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900"><Settings size={16} /> Settings</span>
            <span className="absolute inset-0rounded-full"></span>
          </button>
        </div>


        <div className=" h-[50%] flex flex-col  ">
          <div className="px-3 py-2 h-full border-white/60 border-[1.5px] bg-zinc-900 overflow-hidden">
            <h2 className="text-sm font-semibold text-white flex  items-center gap-2">
              Input: <span className="text-sm text-zinc-400 mt-0.5">(optional)</span>
            </h2>
            <hr className="mt-2" />
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full h-full p-3 bg-transparent  text-white border-none outline-none resize-none overflow-auto"
              placeholder="Enter your runtime input here..."
            ></textarea>
          </div>
        </div>



        <div className=" h-[50%] flex flex-col  ">
          <div className="flex-1 px-3 py-2  border-white/60 border-[1.5px] bg-zinc-900 overflow-auto">
            <div className="flex justify-between">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                Output:
              </h2>
              <button
                onClick={() => {
                  setOutput("");
                  toast.success("Terminal cleared!", { duration: 2000 });
                }}
                className="text-[14px] font-semibold flex items-center gap-2 bg-zinc-800 text-white px-2 py-1 rounded-md hover:bg-zinc-700 w-full sm:w-auto focus:ring-2 focus:ring-cyan-400  "
              >
                <Trash2 size={14} /> Clear
              </button>
            </div>
            <hr className="mt-2" />
            <pre
              className={`mt-2 mb-2 p-3 rounded-md text-sm font-mono whitespace-pre-wrap break-words max-h-80 overflow-auto transition-all duration-300 ${error ? "bg-red-800 text-red-100" : "bg-cyan-700 text-whit  e"
                }`}
            >
              {output || "No output yet..."}
            </pre>


          </div>
        </div>

      </div>
    
    </div>


  );
};

export default CodeEditor;
