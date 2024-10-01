const fs = require('fs');
const path = require('path');
const multer = require('multer');

const aboutFilePath = path.join(__dirname, '../data/about.json');


const loadAboutInfo = () => {
  const data = fs.readFileSync(aboutFilePath, 'utf8');
  return JSON.parse(data);
};


const saveAboutInfo = (about) => {
  fs.writeFileSync(aboutFilePath, JSON.stringify(about, null, 2));
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../aboutUpload')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });


exports.uploadAboutImage = upload.single('image');


exports.getAboutInfo = (req, res) => {
  const about = loadAboutInfo();
  res.json(about);
};


exports.getAboutInfoById = (req, res) => {
  const about = loadAboutInfo();
  const info = about.find((item) => item.id === parseInt(req.params.id));
  if (!info) {
    return res.status(404).send("About info not found");
  }
  res.json(info);
};


exports.createAboutInfo = (req, res) => {
  const about = loadAboutInfo();

  const newAbout = {
    id: about.length + 1,
    title: req.body.title,
    description: req.body.description,
    image: req.file ? `http://localhost:3009/aboutUpload/${req.file.filename}` : '',
  };

  about.push(newAbout);
  saveAboutInfo(about);
  res.status(201).json(newAbout);
};


exports.updateAboutInfoById = (req, res) => {
  const about = loadAboutInfo();
  const index = about.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("About info not found");
  }

  about[index] = { id: parseInt(req.params.id), ...req.body };
  saveAboutInfo(about);
  res.json(about[index]);
};


exports.deleteAboutInfoById = (req, res) => {
  const about = loadAboutInfo();
  const newAbout = about.filter((item) => item.id !== parseInt(req.params.id));
  if (about.length === newAbout.length) {
    return res.status(404).send("About info not found");
  }

  saveAboutInfo(newAbout);
  res.status(204).send();
};
