import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [characterAllowed, setCharacterAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()[]{}~";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            readOnly
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-600 bg-gray-700 text-white outline-none"
          />
          <button
            onClick={copyPassword}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-md transition"
          >
            Copy
          </button>
        </div>

        <div className="space-y-4 text-white text-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Length: <span className="text-blue-400">{length}</span>
            </label>
            <input
              id="length"
              type="range"
              min="6"
              max="50"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 cursor-pointer accent-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="font-medium">
              Include Numbers
            </label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-blue-500 w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="font-medium">
              Include Special Characters
            </label>
            <input
              type="checkbox"
              id="characterInput"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="accent-blue-500 w-5 h-5"
            />
          </div>
        </div>

        <button
          onClick={generatePassword}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
        >
          Generate New Password
        </button>
      </div>
    </div>
  );
};

export default App;
