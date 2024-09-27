const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/slider.json");

const getSliderInfo = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveSliderInfo = (slider) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(slider, null, 2));
};

exports.getSliderInfo = (req, res) => {
  const slider = getSliderInfo();
  res.json(slider);
};

exports.createSliderInfo = (req, res) => {
  const slider = getSliderInfo();
  const newSlider = {
    id: slider.length + 1,
    ...req.body,
  };
  slider.push(newSlider);
  saveSliderInfo(slider);
  res.status(201).json(newSlider);
};

exports.deleteSliderInfoById = (req, res) => {
  const slider = getSliderInfo();
  const newSlider = slider.filter((item) => item.id !== parseInt(req.params.id));
  if (slider.length === newSlider.length) {
    return res.status(404).send("Slider info not found");
  }

  saveSliderInfo(newSlider);
  res.status(204).send();
};
