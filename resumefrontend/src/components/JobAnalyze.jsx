'use client'

import axios from 'axios'
import React from 'react'
import { useState , useEffect } from 'react'


export default function JobAnalyze() {
    const [jobs , setjobs] = useState([])
    const FindJobs = async ()=>{
        const jobdatas = await axios.get('http://localhost:5001/api/jobs',{
            withCredentials : true
        })
        setjobs(jobdatas.jobdata.data.jobs)

    } 
    useEffect(()=>{
        async function getrank() {
            const jobdata = await axios.get('/api/jobrank' , {
                withCredentials : true 
            })
            setjobs(jobdata.data.jobs)

            
        }
        getrank()

    },[])
    console.log(jobs)
    return (
    <div>
        {!jobs ? 
        <button onClick={FindJobs}>Find Jobs </button>
        :
        <>
        {jobs.map((job , index) =>(
            <div key={job.id}>
                <p>{index + 1}</p>

                <h2>{job.title}</h2>
                <h3>{job.company}</h3>
                <p>{job.remote ? "Remote" : "On Site"}</p>
                <p> Salary : {job.salary["min"]} - {job.salary["max"]}</p>
                <p>Duration : {job.duration}</p>
                <ul>
                    {job.skills.map((skill , index ) => (
                        <li>{index + 1}.{skill}</li>
                    ))}
                </ul>
                <p><a href={job.applyLink} target="_blank" >Apply Link</a></p>

            </div>
        ))}
        </>
        }
    </div>
  )
}
