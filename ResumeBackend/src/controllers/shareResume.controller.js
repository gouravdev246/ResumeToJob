import { PdfData } from "../models/pdf-data.model.js";


export const ShareResume = async (req, res) => {
    const { id } = req.params;

    try {
        const pdfdata = await PdfData.findById(id);
        if (!pdfdata) {
            return res.status(404).json({ message: "No Data Found PDF" });
        }
        return res.status(200).json({ message: "PDF DATA FOUND", pdfdata: pdfdata });
    } catch (err) {
        return res.status(500).json({ message: "No Data Found PDF" });
    }
};

