
import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [charAllowed, setCharAllowed] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

   
    let strength = "Weak";
    if (length > 10 && numberAllowed && charAllowed) strength = "Strong";
    else if (length > 8 && (numberAllowed || charAllowed)) strength = "Medium";
    setPasswordStrength(strength);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    if (password) {
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      alert("Password copied to clipboard!");
    }
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="container mx-auto max-w-lg p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4">Password Generator</h1>

     
      <div className="password-display bg-gray-800 p-4 rounded-md flex items-center justify-between mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="bg-transparent text-xl w-full outline-none text-white"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1"
        >
          Copy
        </button>
      </div>

    
      <div
        className={`strength-indicator h-2 w-full rounded-full mb-4 ${
          passwordStrength === "Strong"
            ? "bg-green-500"
            : passwordStrength === "Medium"
            ? "bg-yellow-500"
            : "bg-red-500"
        }`}
      ></div>
      <p className="text-center mb-4">Strength: {passwordStrength}</p>

    
      <div className="settings flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className="text-sm">
            Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="6"
            max="100"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="cursor-pointer"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="numbers"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
            className="cursor-pointer"
          />
          <label htmlFor="numbers" className="text-sm ml-2">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="special-characters"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
            className="cursor-pointer"
          />
          <label htmlFor="special-characters" className="text-sm ml-2">
            Include Special Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
