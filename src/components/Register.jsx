import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
        role,
      });
      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Register
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md 
                     hover:bg-blue-700 transition font-medium"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
