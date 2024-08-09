const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// File filter to accept only specific file formats
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.png', '.docx', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .docx, and .pdf files are allowed'), false);
    }
};

// Multer configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: fileFilter
});

// Middleware to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Optional: Check image dimensions if the file is a .png
    if (path.extname(req.file.originalname).toLowerCase() === '.png') {
        try {
            const metadata = await sharp(req.file.path).metadata();
            if (metadata.width > 400 || metadata.height > 300) {
                return res.status(400).send('Image dimensions should be less than 400 x 300 pixels.');
            }
        } catch (err) {
            return res.status(500).send('Error processing image.');
        }
    }

    res.json({ fileUrl: fileUrl });
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});