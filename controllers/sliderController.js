const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Şəkil saxlanılması üçün konfiqurasiya
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../uploads');
    // Yükləmə qovluğunun olub olmadığını yoxlayırıq
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir); // Yoxdursa, yaradırıq
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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

module.exports = {
  upload,
  uploadSliderImage,
  getSliderImages 
};
