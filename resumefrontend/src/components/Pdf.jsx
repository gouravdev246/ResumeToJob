'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';


export default function Pdf() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [PdfData, setPdfData] = useState(null)


    useEffect(() => {
        async function getData() {

            const exsistData = await axios.get('http://localhost:5001/api/pdf/getinfo', {
                withCredentials: true
            })
            console.log(exsistData.data.data.pdfdata)
            setPdfData(exsistData.data.data.pdfdata)

        }
        getData()

    }, [])



    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            // Use absolute URL to bypass Next.js rewrites for multipart/form-data
            const resumeData = await axios.post('http://localhost:5001/api/pdf/uploadpdf', formData, {
                withCredentials: true
            });
            console.log("Upload success:", resumeData.data);

            setPdfData(resumeData.data.pdfdata)
        } catch (err) {
            console.error("Upload error:", err);
        }
    };


    return (
        <div>
            {!PdfData ?

                <form onSubmit={handleSubmit}>
                    File upload <input type="file" accept='.pdf' onChange={handleFileChange} />
                    <button type='submit'>Analyze</button>
                </form>

                :
                <>
                    <h3>Name : {PdfData.full_name}</h3>
                    <p>Skills : 
                        Total {PdfData.skills.length} 
                        <ul className="flex flex-row flex-wrap gap-x-2 gap-y-1">
                        {PdfData.skills && PdfData.skills.map((skill, index) =>(
                            <li key={index} >{skill} </li>
                        ))}
                        </ul>
                    </p>
                    
                    <h3>Role : {PdfData.preferences_role[0].role}</h3>
                </>
            }
        </div>
    )
}
