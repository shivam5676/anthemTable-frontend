import { useState } from "react";
export default function LoginModal({ setShowLogin, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    setUser({ email, password });
    localStorage.setItem("user", JSON.stringify({ email, password }));
    setShowLogin(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full mt-2">Sign In</button>
        <button onClick={() => setShowLogin(false)} className="mt-2 w-full">Close</button>
      </div>
    </div>
  );
}