import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { validemail } from "../../utils/helper";
import Passinput from "../../components/input/passinput";
import axiosInstance from "../../utils/axiosInst";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validemail(Email)) return setError("Please enter a valid Email");
        if (!password) return setError("Please enter a Password");
        setError("");

        try {
            const response = await axiosInstance.post("/login", {
                email: Email,
                password: password,
            });

            if (response.data?.error) {
                setError(response.data.message);
                return;
            }

            if (response.data?.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "An unexpected error has occurred. Please try again!"
            );
        }
    };

    return (
        <>
            <style>{`
                @keyframes particleFloat {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
                    100% { transform: translateY(0) scale(1); opacity: 0.8; }
                }

                @keyframes glowShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .glow-border {
                    position: relative;
                    border-radius: 20px;
                }

                .glow-border::before {
                    content: '';
                    position: absolute;
                    top: -4px;
                    left: -4px;
                    right: -4px;
                    bottom: -4px;
                    z-index: -1;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #fef9c3, #a78bfa, #e0f2fe);
                    background-size: 300% 300%;
                    animation: glowShift 6s ease infinite;
                    filter: blur(18px);
                    opacity: 0.9;
                }

                .particles {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    z-index: 0;
                }

                .particles span {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background: radial-gradient(circle, #fef08a, #a78bfa, #e0f2fe);
                    border-radius: 9999px;
                    animation: particleFloat 5s ease-in-out infinite;
                    opacity: 0.6;
                    filter: blur(1px);
                }

                .particles span:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
                .particles span:nth-child(2) { top: 50%; left: 70%; animation-delay: 1.2s; }
                .particles span:nth-child(3) { top: 80%; left: 30%; animation-delay: 2.4s; }
                .particles span:nth-child(4) { top: 35%; left: 85%; animation-delay: 3s; }
                .particles span:nth-child(5) { top: 65%; left: 40%; animation-delay: 0.8s; }
                .particles span:nth-child(6) { top: 15%; left: 60%; animation-delay: 1.6s; }
                .particles span:nth-child(7) { top: 75%; left: 15%; animation-delay: 2.8s; }
                .particles span:nth-child(8) { top: 45%; left: 50%; animation-delay: 3.5s; }
            `}</style>

            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-purple-950 to-yellow-900 relative">
                <div className="particles">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className="relative glow-border p-[2px]">
                    <div className="w-[400px] rounded-[18px] bg-black/30 backdrop-blur-xl border border-purple-700 px-8 py-10 text-yellow-100 relative z-10 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        <form onSubmit={handleLogin}>
                            <h2 className="text-2xl font-semibold text-center text-purple-200 mb-6 tracking-wider">
                                LOGIN
                            </h2>

                            <div className="flex items-center mb-4 border border-purple-600 rounded-xl px-4 bg-transparent">
                                <input
                                    className="w-full text-sm bg-transparent py-3 text-yellow-100 placeholder-yellow-400 outline-none"
                                    type="text"
                                    placeholder="Email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <Passinput
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {Error && (
                                <p className="text-red-400 text-sm mt-1">{Error}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-400 text-black font-semibold shadow-md transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_#eab308] hover:brightness-110 active:scale-95 active:shadow-[0_0_30px_#a855f7]"
                            >
                                Log in
                            </button>

                            <p className="text-sm text-center mt-5 text-yellow-200">
                                Don&apos;t have an Account?{" "}
                                <Link to="/signup" className="text-yellow-300 hover:underline hover:text-purple-500  font-medium">
                                    Sign up here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
