import { 
  Search, 
  Upload, 
  Crown, 
  Sparkles, 
  FileText, 
  LayoutDashboard, 
  Briefcase, 
  Bookmark, 
  Send, 
  User, 
  Settings,
  MapPin,
  ArrowRight
} from "lucide-react";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans text-slate-900 overflow-x-hidden relative">
      {/* Background soft blur effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] sm:w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[45%] sm:w-[30%] h-[30%] rounded-full bg-indigo-100/40 blur-[70px] sm:blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 md:px-16 py-5 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded text-[#5B4EEF]">
            <FileText className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />
            <Search className="w-3.5 h-3.5 absolute bottom-0 right-0 bg-[#F8F9FE] rounded-full text-[#5B4EEF]" strokeWidth={2.5} />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">ResumeToJob</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="text-[#5B4EEF] border-b-2 border-[#5B4EEF] py-1">Home</Link>
          <Link href="#" className="hover:text-slate-900 transition-colors">How it works</Link>
          <Link href="/premium" className="hover:text-slate-900 transition-colors">Pricing</Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
          <Link href="/register" className="bg-[#5B4EEF] text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/login" className="text-xs font-bold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 transition-colors">
            Log in
          </Link>
          <Link href="/register" className="bg-[#5B4EEF] text-white px-3 py-2 text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 py-8 sm:py-12 max-w-[1400px] mx-auto w-full gap-8 lg:gap-8">
        
        {/* Left Content */}
        <div className="flex-1 w-full max-w-2xl shrink-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F0FF] text-[#5B4EEF] text-xs sm:text-sm font-semibold mb-5 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            AI-Powered Job Matching
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.1] text-[#1e2330] mb-5 sm:mb-6 tracking-tight">
            Find Jobs That <br className="hidden sm:inline" />
            Truly <span className="text-[#5B4EEF]">Match You</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Upload your resume and let our AI find the best job opportunities tailored to your skills and experience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10 sm:mb-12">
            <Link href="/register" className="flex items-center justify-center gap-2 bg-[#5B4EEF] text-white px-8 py-3.5 sm:py-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 w-full sm:w-auto text-base">
              Upload Resume <Upload className="w-4 h-4" />
            </Link>
            <Link href="/register" className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-3.5 sm:py-4 rounded-xl font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto text-base">
              Explore Jobs
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=11" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pravatar.cc/100?img=12" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="https://i.pravatar.cc/100?img=5" alt="User 3" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-400 flex items-center justify-center text-xs font-bold text-white z-10">
                2k+
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed text-center sm:text-left">
              Join 2,000+ job seekers <br className="hidden sm:inline" /> who found their dream job
            </p>
          </div>
        </div>

        {/* Right Content - Dashboard Mockup */}
        <div className="flex-1 w-full max-w-2xl relative lg:ml-8 mt-6 lg:mt-0">
          <div className="bg-white rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] p-4 sm:p-6 flex border border-slate-100 w-full overflow-hidden">
            
            {/* Sidebar - Hidden on mobile screens to save space and avoid overflow */}
            <div className="hidden md:flex w-48 border-r border-slate-100 pr-6 flex-col shrink-0">
              <div className="mb-8 mt-2">
                <p className="text-xs text-slate-400 font-medium mb-1">Welcome back,</p>
                <p className="text-sm font-bold text-slate-900">Alex Johnson <span className="text-base">👋</span></p>
              </div>
              
              <nav className="flex flex-col gap-1.5 flex-1">
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F2F0FF] text-[#5B4EEF] text-xs font-semibold cursor-default">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium cursor-default">
                  <FileText className="w-4 h-4" /> My Resume
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium cursor-default">
                  <Briefcase className="w-4 h-4" /> Matched Jobs
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium cursor-default">
                  <Bookmark className="w-4 h-4" /> Saved Jobs
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium cursor-default">
                  <Send className="w-4 h-4" /> Applications
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium mt-2 cursor-default">
                  <User className="w-4 h-4" /> Profile
                </span>
                <span className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 text-xs font-medium cursor-default">
                  <Settings className="w-4 h-4" /> Settings
                </span>
              </nav>

              <div className="mt-12 mb-2">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 text-xs font-bold cursor-default">
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-500" /> 
                  <span className="flex-1">Upgrade to Pro</span>
                </div>
                <p className="text-[10px] text-slate-400 pl-10 font-medium">who more matches</p>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 md:pl-6 pt-2 w-full min-w-0">
              
              {/* Top Cards - Stacks on narrow mobile screens, columns side-by-side on sm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <h3 className="text-[11px] font-semibold text-slate-500 mb-1">Resume Match Score</h3>
                    <div className="text-2xl font-bold text-emerald-500">85%</div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Great match!</p>
                  </div>
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray="85, 100"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div>
                    <h3 className="text-[11px] font-semibold text-slate-500 mb-1">Jobs Found</h3>
                    <div className="text-2xl font-bold text-[#5B4EEF]">128</div>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">New matches</p>
                  </div>
                  <div className="flex items-end gap-[3px] h-10 flex-shrink-0">
                    <div className="w-[5px] bg-slate-200 rounded-sm h-4"></div>
                    <div className="w-[5px] bg-slate-200 rounded-sm h-6"></div>
                    <div className="w-[5px] bg-indigo-200 rounded-sm h-8"></div>
                    <div className="w-[5px] bg-indigo-300 rounded-sm h-5"></div>
                    <div className="w-[5px] bg-[#5B4EEF] rounded-sm h-10"></div>
                    <div className="w-[5px] bg-slate-200 rounded-sm h-3"></div>
                  </div>
                </div>
              </div>

              {/* Matched Jobs Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">Top Matched Jobs</h2>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  View all jobs <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Matched Jobs Cards List */}
              <div className="flex flex-col gap-3">
                {/* Job Card 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    F
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="truncate pr-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">Frontend Developer Intern</h4>
                        <p className="text-[11px] text-slate-500 font-medium">TechFlow Inc.</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-500">92% Match</span>
                        <Bookmark className="w-4 h-4 text-slate-300 mt-1 hover:text-slate-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">React</span>
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">JavaScript</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Remote</span>
                        <span>₹1,500/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Card 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0 p-2.5">
                    <svg viewBox="0 0 24 24" fill="#FF5A5F" className="w-full h-full"><path d="M12.001 1.704c-1.895 0-3.666.703-5.076 1.982l-5.748 5.21c-.815.74-.875 2.002-.135 2.817.34.376.81.587 1.3.587.426 0 .842-.158 1.16-.446l5.5-4.985c.82-.743 1.895-1.152 3-1.152s2.18.41 3 1.153l5.5 4.985c.318.288.734.446 1.16.446.49 0 .96-.21 1.3-.587.74-.815.68-2.077-.135-2.817l-5.748-5.21c-1.41-1.28-3.18-1.983-5.078-1.983zm0 5.485c-2.646 0-4.8 2.155-4.8 4.8 0 1.956 1.16 3.84 3.01 4.707l1.378.643c.13.06.28.06.41 0l1.378-.642C15.228 15.828 16.388 13.945 16.388 12c0-2.645-2.155-4.8-4.8-4.8zm0 2.4c1.324 0 2.4 1.076 2.4 2.4 0 1.054-.606 2.025-1.543 2.463l-.856.4-.857-.4C10.207 14.025 9.6 13.054 9.6 12c0-1.324 1.076-2.4 2.4-2.4z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="truncate pr-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">Software Engineer Intern</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Airbnb</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-500">88% Match</span>
                        <Bookmark className="w-4 h-4 text-slate-300 mt-1 hover:text-slate-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">JavaScript</span>
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">Node.js</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> San Francisco</span>
                        <span>₹2,000/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Card 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 sm:p-4 flex gap-3 sm:gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 p-2">
                    <svg viewBox="0 0 24 24" fill="#1DB954" className="w-full h-full"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.45 17.29c-.21.345-.667.458-1.01.247-2.775-1.696-6.26-2.077-10.38-1.138-.387.087-.768-.155-.856-.543-.087-.387.155-.768.543-.856 4.484-1.025 8.324-.593 11.455 1.32.344.21.458.667.247 1.012zm1.442-3.236c-.266.427-.818.566-1.246.3-3.176-1.95-8.054-2.55-11.758-1.396-.48.148-1.002-.123-1.15-.603-.148-.48.123-1.002.603-1.15 4.25-1.324 9.613-.655 13.25 1.58.427.266.566.818.3 1.246zm.13-3.376c-3.805-2.257-10.063-2.463-13.682-1.365-.572.172-1.17-.152-1.344-.724-.172-.572.152-1.17.724-1.344 4.14-1.256 11.08-1.018 15.44 1.568.513.303.684.975.38 1.488-.303.513-.975.684-1.488.38h-.03z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <div className="truncate pr-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">Backend Developer Intern</h4>
                        <p className="text-[11px] text-slate-500 font-medium">Spotify</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-[10px] font-bold text-emerald-500">85% Match</span>
                        <Bookmark className="w-4 h-4 text-slate-300 mt-1 hover:text-slate-500 cursor-pointer" />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">Python</span>
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 rounded text-[9px] font-medium border border-slate-100">Django</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> New York</span>
                        <span>₹1,800/mo</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
