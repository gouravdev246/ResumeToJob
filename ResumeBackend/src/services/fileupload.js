import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';

const uploadDir = path.join(os.tmpdir(), 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    // Check both mime type and file extension
    const isPdf = file.mimetype === 'application/pdf' && path.extname(file.originalname).toLowerCase() === '.pdf';
    
    if (isPdf) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});
