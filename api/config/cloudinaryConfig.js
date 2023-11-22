const path = require('path');
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = { cloudinary };



