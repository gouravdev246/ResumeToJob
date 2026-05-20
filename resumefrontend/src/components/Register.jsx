"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const register = await axios.post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      if (register.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A13] text-white flex font-jakarta relative overflow-hidden">
      {/* Injecting Plus Jakarta Sans font dynamically */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}} />

      {/* Background blur blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#5B4EEF]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Panel - Visual Branding & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-16 relative z-10 border-r border-white/5 grid-pattern">
        
        {/* Logo/Brand Section */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B4EEF] to-violet-500 flex items-center justify-center shadow-lg shadow-[#5B4EEF]/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            ResumeToJob
          </span>
        </div>

        {/* Floating Mockup (Memorability Anchor - Keyword Optimization) */}
        <div className="my-auto flex flex-col items-center">
          <div className="relative w-full max-w-[420px] bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl shadow-black/50 animate-y-float">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes y-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-y-float {
                animation: y-float 6s ease-in-out infinite;
              }
            `}} />
            
            {/* Header info */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                Keyword Tailoring Engine
              </span>
              <span className="text-xs text-[#8F85FF] font-bold">Optimizing...</span>
            </div>

            {/* Keyword comparison progress */}
            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-400">Current Match Rate</span>
                  <span className="text-slate-200">64%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#5B4EEF] h-full rounded-full w-[64%]" />
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-emerald-400">Target Match Rate</span>
                  <span className="text-emerald-300">96%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#5B4EEF] to-emerald-400 h-full rounded-full w-[96%]" />
                </div>
              </div>
            </div>

            {/* Keyword badges suggestions list */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Suggested Additions</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  + Cloud Architecture
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  + CI/CD Pipelines
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  + TypeScript
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 max-w-[400px]">
            <h3 className="text-3xl font-extrabold tracking-tight text-white mb-3">
              Resume Tailoring Made Easy
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Create an account to start scanning, matching, and improving your resume keyword fitment in seconds.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-600 font-medium">
          © 2026 ResumeToJob. All rights reserved.
        </p>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-[400px] bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl">
          
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Create account
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Join ResumeToJob and start optimizing today
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold p-3.5 rounded-xl mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="Gourav Dev"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-[#5B4EEF] focus:ring-1 focus:ring-[#5B4EEF] text-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-[#5B4EEF] focus:ring-1 focus:ring-[#5B4EEF] text-slate-100 rounded-xl py-3 pl-11 pr-4 text-sm font-medium transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/10 focus:border-[#5B4EEF] focus:ring-1 focus:ring-[#5B4EEF] text-slate-100 rounded-xl py-3 pl-11 pr-11 text-sm font-medium transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#5B4EEF] to-violet-600 hover:from-[#6b5eff] hover:to-violet-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#5B4EEF]/20 active:scale-98 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Switch page */}
          <div className="mt-8 text-center text-sm font-medium text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#8F85FF] font-bold hover:underline"
            >
              Sign in
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
