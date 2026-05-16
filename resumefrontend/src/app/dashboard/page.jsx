import React from 'react'
import PdfUpload from '../../components/PdfUpload'
import Pdf from '../../components/Pdf'
import JobAnalyze from '../../components/JobAnalyze'
export default function page() {
  return (
    <div>
        {/* <PdfUpload/> */}
        <Pdf/>
        <JobAnalyze/>
    </div>
  )
}
