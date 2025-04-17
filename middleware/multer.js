const multer = require("multer");


const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/jpg', 'image/webp',"video/mp4", "video/webm", "video/mov"].includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error('Unsupported file type!'), false); 
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 100 } 
});

const uploadFile = upload.array("files",10)


module.exports = uploadFile