'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '@/config'
import { 
  UploadCloud, FileText, CheckCircle2, TrendingUp, 
  Eye, Bookmark, ArrowRight, Loader2, Briefcase
} from 'lucide-react'

export default function Pdf() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [PdfData, setPdfData] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                const exsistData = await axios.get(`${BASE_URL}/api/pdf/getinfo`, {
                    withCredentials: true
                })
                if(exsistData.data?.data?.pdfdata) {
                    setPdfData(exsistData.data.data.pdfdata)
                }
            } catch(e) {
                console.error("Failed to fetch PDF info", e)
            }
        }
        getData()
    }, [])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedFile) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append('resume', selectedFile)

        try {
            const resumeData = await axios.post(`${BASE_URL}/api/pdf/uploadpdf`, formData, {
                withCredentials: true
            })
            if(resumeData.data?.pdfdata) {
                setPdfData(resumeData.data.pdfdata)
            }
        } catch (err) {
            console.error("Upload error:", err)
        } finally {
            setIsUploading(false)
        }
    }
    const handleDelete = async ()=>{
        const deleteData = await axios.delete(`${BASE_URL}/api/pdf/delete`,{
            withCredentials : true 
        })
        
    }

    return (
        <div className="flex flex-col gap-6">
            {!PdfData ? (
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-4">Upload Your Resume</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label 
                            className="border-2 border-dashed border-slate-200 bg-[#F8F9FE] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-indigo-50 text-[#5B4EEF] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold text-slate-700">Click to upload</span>
                            <span className="text-xs text-slate-500 mt-1">PDF (MAX. 5MB)</span>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handleFileChange} 
                                className="hidden" 
                            />
                        </label>
                        {selectedFile && (
                            <div className="flex items-center gap-3 bg-[#F2F0FF] p-3 rounded-xl border border-indigo-100 text-[#5B4EEF]">
                                <FileText className="w-5 h-5" />
                                <span className="text-sm font-semibold truncate flex-1">{selectedFile.name}</span>
                            </div>
                        )}
                        <button 
                            type="submit" 
                            disabled={!selectedFile || isUploading}
                            className={`w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                                !selectedFile || isUploading 
                                ? 'bg-slate-300 cursor-not-allowed' 
                                : 'bg-[#5B4EEF] hover:bg-indigo-700 shadow-sm shadow-indigo-200'
                            }`}
                        >
                            {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</> : 'Analyze Resume'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                    <h2 className="text-base font-bold text-slate-900 mb-6">Skill Match Overview</h2>
                    
                    <div className="flex items-center gap-6 mb-8">
                        {/* Donut Chart Mock */}
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="65 35" strokeDashoffset="0" />
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-65" />
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="12 88" strokeDashoffset="-80" />
                                <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="8 92" strokeDashoffset="-92" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-extrabold text-slate-900">85%</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Overall Match</span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span className="text-xs font-semibold text-slate-600">Matched Skills</span></div>
                                <span className="text-xs font-bold text-emerald-600">28</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span><span className="text-xs font-semibold text-slate-600">Partially Matched</span></div>
                                <span className="text-xs font-bold text-amber-600">7</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span><span className="text-xs font-semibold text-slate-600">Missing Skills</span></div>
                                <span className="text-xs font-bold text-red-600">5</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span><span className="text-xs font-semibold text-slate-600">Unknown Skills</span></div>
                                <span className="text-xs font-bold text-slate-500">2</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-xs text-slate-500 font-semibold mb-2">Parsed Info:</p>
                        <p className="text-sm font-bold text-slate-900 mb-1">{PdfData.full_name || 'Resume Parsed'}</p>
                        <p className="text-xs font-medium text-[#5B4EEF]">{PdfData.preferences_role?.[0]?.role || 'General Role'}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {PdfData.skills && PdfData.skills.slice(0, 8).map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-[#F8F9FE] text-slate-600 rounded-md text-[10px] font-semibold border border-slate-100">
                                {skill}
                            </span>
                        ))}
                        {PdfData.skills && PdfData.skills.length > 8 && (
                            <span className="px-2 py-1 bg-slate-50 text-slate-400 rounded-md text-[10px] font-semibold">
                                +{PdfData.skills.length - 8} more
                            </span>
                        )}
                    </div>

                    <div>
                        <button className='border-2 border-violet-500 rounded-xl p-2 text-violet-900' onClick={handleDelete}>Upload New One</button>
                    </div>

                   
                </div>
            )}

       
        </div>
    )
}
