const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/category.json");

const getCategories = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveCategories = (categories) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
};

exports.getAllCategories = (req, res) => {
  const categories = getCategories();
  res.json(categories);
};

exports.getCategoryById = (req, res) => {
  const categories = getCategories();
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).send("Category not found");
  }
  res.json(category);
};

exports.createCategory = (req, res) => {
  const categories = getCategories();
  const newCategory = {
    id: categories.length + 1,
    ...req.body,
  };
  categories.push(newCategory);
  saveCategories(categories);
  res.status(201).json(newCategory);
};

exports.updateCategory = (req, res) => {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Category not found");
  }
  categories[index] = { id: parseInt(req.params.id), ...req.body };
  saveCategories(categories);
  res.json(categories[index]);
};

exports.deleteCategory = (req, res) => {
  const categories = getCategories();
  const newCategories = categories.filter(
    (c) => c.id !== parseInt(req.params.id)
  );
  if (categories.length === newCategories.length) {
    return res.status(404).send("Category not found");
  }
  saveCategories(newCategories);
  res.status(204).send();
};
