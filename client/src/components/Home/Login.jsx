import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:4000/login", { username, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            navigate("/chat");
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className="border p-2 w-full mb-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-blue-500 text-white p-2 w-full" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
