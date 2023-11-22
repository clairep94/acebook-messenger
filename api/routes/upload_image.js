const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { cloudinary } = require('../config/cloudinaryConfig');

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading image:', error); // More detailed logging
        res.status(500).send("Error uploading image");
    }
});

module.exports = router;

