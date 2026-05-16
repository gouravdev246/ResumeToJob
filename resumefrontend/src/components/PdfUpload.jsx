'use client'
import axios from 'axios';
import React, { useState, useRef } from 'react';

export default function PdfUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDropZoneClick = () => {
        fileInputRef.current.value = '';
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            const resumeData = await axios.post('http://localhost:5001/api/pdf/getinfo', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Upload success:", resumeData.data);
            // You can handle the response data here
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-white text-center mb-1">
                    Upload Resume
                </h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Upload your PDF resume to get AI-powered insights
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {/* Clickable drop zone */}
                    <div
                        onClick={handleDropZoneClick}
                        className="group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-white/20 rounded-xl cursor-pointer transition-all duration-300 hover:border-indigo-400 hover:bg-white/5"
                    >
                        {/* Icon */}
                        <svg
                            className="w-10 h-10 text-gray-500 group-hover:text-indigo-400 transition-colors mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16"
                            />
                        </svg>

                        {selectedFile ? (
                            <span className="text-sm text-indigo-300 font-medium truncate max-w-[90%]">
                                {selectedFile.name}
                            </span>
                        ) : (
                            <>
                                <span className="text-sm text-gray-400 group-hover:text-gray-300">
                                    Click to browse
                                </span>
                                <span className="text-xs text-gray-600 mt-1">Single PDF only</span>
                            </>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={!selectedFile}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg 
                            ${selectedFile 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/25 active:scale-[0.98]' 
                                : 'bg-gray-600 opacity-50 cursor-not-allowed'}`}
                    >
                        Analyze Resume
                    </button>
                </form>
            </div>
        </div>
    );
}
