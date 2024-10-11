// app/routes/login.tsx
import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "" || password === "") {
        setError("Please fill in all fields");
        return;
      }
      // Simple mock validation
      if (email === "user@example.com" && password === "password") {
        // Redirect to the chat page upon successful login
        navigate("/chat");
      } else {
        setError("Invalid email or password");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 uppercase">
          Remix GPT User Login
        </h2>
        {error && (
          <div className="bg-red-100 py-4 border border-red-500 mb-4 text-red-600 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              placeholder="password"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-900 transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
