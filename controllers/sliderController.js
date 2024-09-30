const fs = require('fs');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir); 
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});


const uploadSliderImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a file" });
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
};


const getSliderImages = (req, res) => {
  const uploadsDir = path.join(__dirname, '../uploads');

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files" });
    }

    const sliderImageFiles = files.map(file => ({
      filename: file,
      url: `/uploads/${file}`
    }));

    res.status(200).json(sliderImageFiles);
  });
};

const deleteSliderImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads', filename); // Tam yol

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ message: "Image not found" });
      }

      return res.status(500).json({ message: "Unable to delete the image" });
    }
    res.status(200).json({ message: "Image deleted successfully" });
  });
};

module.exports = {
  upload,
  uploadSliderImage,
  getSliderImages,
  deleteSliderImage 
};
