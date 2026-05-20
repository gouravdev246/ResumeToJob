'use client'

import React, { useState, useEffect } from 'react'
import Pdf from '../../components/Pdf'
import JobAnalyze from '../../components/JobAnalyze'
import useProfileStore from '../../store/store'
import Logout from '../../components/Logout'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, FileText, Briefcase, Bookmark, Send, 
  BarChart2, FileUp, Bell, Settings, HelpCircle, 
  Menu, X, Search, Crown, ChevronDown
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const user = useProfileStore((state) => state.user)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setSidebarOpen(true)
    }
  }, [])

  if (!mounted) return null

  // Ensure user is logged in
  const localData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {}
  const currentUser = user?.name ? user : localData
  
  if (!currentUser?.name && !currentUser?.email) {
    router.push('/')
    return null
  }

  return (
    <div className="flex h-screen bg-[#F8F9FE] font-sans text-slate-900 overflow-hidden">
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:hidden lg:w-0 lg:border-none'
        }`}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-50 lg:border-none">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 rounded text-[#5B4EEF]">
              <FileText className="w-8 h-8" strokeWidth={1.5} />
              <Search className="w-4 h-4 absolute bottom-0 right-0 bg-white rounded-full text-[#5B4EEF]" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ResumeToJob</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 scrollbar-hide">
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#F2F0FF] text-[#5B4EEF] text-sm font-semibold transition-colors">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="myresume" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <FileText className="w-5 h-5" /> My Resume
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Briefcase className="w-5 h-5" /> Matched Jobs
            </a>
            {/* <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Bookmark className="w-5 h-5" /> Saved Jobs
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Send className="w-5 h-5" /> Applications
            </a> */}
            
            <div className="my-2 border-t border-slate-100" />
            
            {/* <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <BarChart2 className="w-5 h-5" /> Skill Analysis
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <FileUp className="w-5 h-5" /> Resume Optimizer
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <FileText className="w-5 h-5" /> Cover Letter
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Bell className="w-5 h-5" /> Job Alerts
            </a> */}

            <div className="my-2 border-t border-slate-100" />

            {/* <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 text-sm font-medium transition-colors">
              <HelpCircle className="w-5 h-5" /> Help & Support
            </a> */}
          </nav>
        </div>

        <div className="p-4">
          <div className="bg-[#F8F9FE] border border-slate-100 rounded-2xl p-4 mb-4">
            { currentUser?.acctype === "pro" || currentUser?.acctype === "pro-max" ? (
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" /> Pro Member
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2 text-sm font-bold text-slate-800"> 
                  <Crown className="w-4 h-4 text-amber-500 fill-amber-500" /> Upgrade to Pro
                </div>
                <p className="text-xs text-slate-500 mb-3 font-medium">Unlock unlimited matches, AI resume review and more.</p>
                <button  className="w-full bg-[#5B4EEF] text-white py-2 rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
                  <Link href="/premium">
                  Upgrade Now
                  </Link>
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-slate-50 rounded-xl transition-colors">
            <img src={`https://ui-avatars.com/api/?name=${currentUser?.name || 'User'}&background=random`} alt="Profile" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{currentUser?.name || 'User'} </p>
              <p className="text-xs text-slate-500 font-medium truncate">{currentUser?.email || 'user@example.com'}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 bg-transparent flex items-center justify-between px-4 md:px-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 -ml-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-xl font-extrabold text-slate-900">Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}! <span className="text-2xl">👋</span></h1>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Here's what's happening with your job search today.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 w-80 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search jobs, companies..." 
                className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button className="relative p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <Logout />
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-auto scrollbar-hide px-4 md:px-8 pb-12 pt-2">
          
          <div className="md:hidden mb-6">
             <h1 className="text-xl font-extrabold text-slate-900">Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}! <span className="text-2xl">👋</span></h1>
             <p className="text-sm text-slate-500 font-medium mt-0.5">Here's what's happening with your job search today.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
             {/* Left Column (Job Analyze takes up most space) */}
             <div className="flex-1 flex flex-col gap-6">
                <JobAnalyze />
             </div>

             {/* Right Column (PDF & Skills Overview takes sidebar-like space) */}
             <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-6">
                <Pdf />
             </div>
          </div>

        </div>
      </main>
    </div>
  )
}
