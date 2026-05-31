const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devconnect_users',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const coverStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'devconnect_covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 400, crop: 'limit' }],
  },
});

const uploadAvatar = multer({ storage: storage });
const uploadCover = multer({ storage: coverStorage });

module.exports = {
  uploadAvatar,
  uploadCover
};
