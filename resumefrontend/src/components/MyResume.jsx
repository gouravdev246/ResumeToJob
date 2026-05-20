'use client'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { Mail, Phone, Briefcase, GraduationCap, Code, Award, ExternalLink, Loader2, Share2, Check } from 'lucide-react';

export default function MyResume({ id }) {
    const [resumeData, setResumeData] = useState(null);
    const [resumeId, setResumeId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function getResumeData() {
            try {
                const endpoint = id ? `${BASE_URL}/api/share/resume/${id}` : `${BASE_URL}/api/pdf/getinfo`;
                const response = await axios.get(endpoint, {
                    withCredentials: true,
                });
                
                const data = id ? response.data?.pdfdata?.pdfdata : response.data?.data?.pdfdata;
                const rId = id ? response.data?.pdfdata?._id : response.data?.data?._id;
                
                if (data) {
                    setResumeData(data); 
                    setResumeId(rId);
                } else {
                    console.error("Could not find pdfdata in response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching resume data", error);
            } finally {
                setLoading(false);
            }
        }
        getResumeData();
    }, [id]);

    const handleShare = () => {
        if (!resumeId) return;
        const shareUrl = `${window.location.origin}/myresume/${resumeId}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error("Failed to copy link: ", err);
            });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                    <p className="text-sm font-medium text-slate-600">Loading your resume...</p>
                </div>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <p className="text-slate-600 font-medium">No resume data found. Please upload your resume first.</p>
            </div>
        );
    }

return (
  <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#5B4EEF] to-indigo-600 px-8 py-10 sm:py-12 text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
              {resumeData.full_name}
            </h1>
            
            {resumeData.preferences_role && resumeData.preferences_role.length > 0 && (
              <h2 className="text-xl sm:text-2xl text-indigo-100 font-medium">
                {resumeData.preferences_role.map(role => role.role).join(" | ")}
              </h2>
            )}
          </div>
          {resumeId && (
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2.5 rounded-xl backdrop-blur-md border border-white/10 transition-all active:scale-95 cursor-pointer shadow-sm self-start sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                  <span className="text-emerald-100 text-sm">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-indigo-100" />
                  <span className="text-sm">Share Resume</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-medium text-indigo-50 mt-4">
          {resumeData.contact?.email && (
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${resumeData.contact.email}`} className="hover:text-white transition-colors">
                {resumeData.contact.email}
              </a>
            </div>
          )}
          {resumeData.contact?.phone && (
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Phone className="w-4 h-4" />
              <span>{resumeData.contact.phone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 sm:p-12 space-y-12">
        
        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Experience</h3>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="relative pl-5 border-l-2 border-indigo-100 hover:border-indigo-400 transition-colors">
                  <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                    <h4 className="text-lg font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0">
                      {exp.years}
                    </span>
                  </div>
                  <p className="text-md font-semibold text-slate-600 mb-2">{exp.company}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.projects.map((project, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {project.projectname}
                    </h4>
                    {project.projectlink && project.projectlink.trim() !== "" && (
                      <a href={project.projectlink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-indigo-600 p-1 bg-white rounded-md shadow-sm">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {project.projectsummary}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Education</h3>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                  <div>
                    <h4 className="text-md font-bold text-slate-900 mb-1">{edu.degree}</h4>
                    <p className="text-sm font-medium text-slate-500">{edu.university}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 bg-[#F8F9FE] text-slate-700 text-sm font-bold rounded-lg border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  </div>
);

}
