'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import useProfileStore from '../store/store'
import { 
  Target, Briefcase, Bookmark, Eye, ArrowRight, 
  MapPin, CheckCircle2, TrendingUp, Lightbulb, Zap 
} from 'lucide-react'

export default function JobAnalyze() {
    const [jobs, setjobs] = useState([])
    const [loading, setLoading] = useState(false)
    const user = useProfileStore((state) => state.user)

    const FindJobs = async () => {
        try {
            setLoading(true)
            const jobdatas = await axios.get('http://localhost:5001/api/job', {
                withCredentials: true
            })
            setjobs(jobdatas.data?.newjob?.jobdata || jobdatas.data?.jobs || [])
        } catch(e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    } 

    useEffect(() => {
        async function getrank() {
            try {
                const jobdata = await axios.get('http://localhost:5001/api/jobrank', {
                    withCredentials: true 
                })
                if(jobdata.data?.jobs) {
                    setjobs(jobdata.data.jobs)
                }
            } catch(e) {
                console.error(e)
            }
        }
        getrank()
    }, [])

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Top Stat Cards */}


            {/* Matched Jobs Section */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Top Matched Jobs {jobs.length > 0 ? `(${jobs.length})` : ''}</h2>
                    <button 
                        onClick={FindJobs}
                        disabled={loading}
                        className={`text-sm font-semibold flex items-center gap-1 ${loading ? 'text-slate-400' : 'text-[#5B4EEF] hover:text-indigo-700'}`}
                    >
                        {loading ? 'Finding Jobs...' : 'Find New Matches'} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {!jobs || jobs.length === 0 ? (
                    <div className="text-center py-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <p className="text-slate-500 font-medium mb-4">No jobs found yet.</p>
                        <button onClick={FindJobs} disabled={loading} className={`text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-[#5B4EEF] hover:bg-indigo-700'}`}>
                            {loading ? 'Analyzing your profile and finding jobs...' : 'Find Jobs Now'}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobs.map((job, index) => {
                            // Determine visual styling randomly or consistently based on index
                            const colors = [
                                { bg: 'bg-blue-600', text: 'text-white', icon: 'TC' },
                                { bg: 'bg-[#FF5A5F]', text: 'text-white', icon: 'A' },
                                { bg: 'bg-[#1DB954]', text: 'text-white', icon: 'S' }
                            ];
                            const style = colors[index % colors.length];

                            return (
                                <div key={job._id || index} className="group border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:shadow-md transition-all hover:border-slate-200 bg-white relative">
                                    {/* Company Logo Placeholder */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg ${style.bg} ${style.text}`}>
                                        {job.company ? job.company.charAt(0).toUpperCase() : style.icon}
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0 mb-1">
                                            <div className="truncate pr-4">
                                                <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-[#5B4EEF] transition-colors cursor-pointer">
                                                    {job.title}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <p className="text-sm text-slate-500 font-medium">{job.company}</p>
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-bold text-emerald-500">
                                                        {/* {Math.floor(Math.random() * (98 - 80 + 1) + 80)}% Match */}
                                                        {Math.ceil(job.rank_score * 100)} % Match 
                                                    </span>
                                                    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 36 36">
                                                        <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="text-emerald-500" strokeDasharray={ (Math.ceil(job.rank_score * 100) )} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                                                    </svg>
                                                </div>
                                                {/* <button className="text-slate-300 hover:text-slate-600 transition-colors">
                                                    <Bookmark className="w-5 h-5" />
                                                </button> */}
                                            </div>
                                        </div>

                                        {/* Tags and Metadata */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3 sm:gap-0">
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills && job.skills.slice(0, 4).map((skill, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-[#F8F9FE] text-slate-600 rounded-lg text-xs font-semibold border border-slate-100">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold whitespace-nowrap">
                                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.remote ? "Remote" : "On Site"}</span>
                                                <span>{job.salary ? `₹ ${job.salary.min} - ${job.salary.max}` : '₹ 20,000 /month'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Link overlay */}
                                    {job.applyLink && (
                                        <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                                            <span className="sr-only">Apply</span>
                                        </a>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* AI Insights & Recommendations */}
            <div className="bg-transparent border border-slate-100 rounded-3xl p-6 shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-[#5B4EEF]" />
                    <h2 className="text-base font-bold text-slate-900">AI Insights & Recommendations</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1">You're a great match for Frontend Developer roles</h4>
                            <p className="text-xs font-medium text-slate-600">Your React skills are in high demand!</p>
                        </div>
                    </div>
                    <div className="bg-[#FFF8EB] rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1">Improve your chances</h4>
                            <p className="text-xs font-medium text-slate-600">Add Tailwind CSS to your skills to match more jobs</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 flex items-start gap-3">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 mb-1">High demand skills for you</h4>
                            <p className="text-xs font-medium text-slate-600">TypeScript, Next.js, and Docker are top in demand</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
