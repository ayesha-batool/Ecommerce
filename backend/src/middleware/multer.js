import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, callback) => {
        // Accept images only
        if (file.mimetype.startsWith('image/')) {
            callback(null, true);
        } else {
            callback(new Error('Only image files are allowed!'), false);
        }
    }
})

export default upload;