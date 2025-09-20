import multer from "multer";

// Use memory storage for Vercel serverless functions
// Vercel doesn't support persistent file storage, so we use memory storage
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    fileFilter: (req, file, callback) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            callback(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    }
})

export default upload;