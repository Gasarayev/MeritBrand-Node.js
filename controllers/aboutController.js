const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/about.json");

const getAboutInfo = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveAboutInfo = (about) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(about, null, 2));
};

// Get all about info
exports.getAboutInfo = (req, res) => {
  const about = getAboutInfo();
  res.json(about);
};

// Get about info by ID
exports.getAboutInfoById = (req, res) => {
  const about = getAboutInfo();
  const info = about.find((item) => item.id === parseInt(req.params.id));
  if (!info) {
    return res.status(404).send("About info not found");
  }
  res.json(info);
};

// Create new about info
exports.createAboutInfo = (req, res) => {
  const about = getAboutInfo();
  const newAbout = {
    id: about.length + 1,
    ...req.body,
  };
  about.push(newAbout);
  saveAboutInfo(about);
  res.status(201).json(newAbout);
};

// Update about info by ID
exports.updateAboutInfoById = (req, res) => {
  const about = getAboutInfo();
  const index = about.findIndex((item) => item.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("About info not found");
  }

  about[index] = { id: parseInt(req.params.id), ...req.body };
  saveAboutInfo(about);
  res.json(about[index]);
};

// Delete about info by ID
exports.deleteAboutInfoById = (req, res) => {
  const about = getAboutInfo();
  const newAbout = about.filter((item) => item.id !== parseInt(req.params.id));
  if (about.length === newAbout.length) {
    return res.status(404).send("About info not found");
  }

  saveAboutInfo(newAbout);
  res.status(204).send();
};
