const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
};

exports.getAllProducts = (req, res) => {
  const products = getProducts();
  res.json(products);
};

exports.getProductById = (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.json(product);
};

exports.createProduct = (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Product not found");
  }
  products[index] = { id: parseInt(req.params.id), ...req.body };
  saveProducts(products);
  res.json(products[index]);
};

exports.deleteProduct = (req, res) => {
  const products = getProducts();
  const newProducts = products.filter((p) => p.id !== parseInt(req.params.id));
  if (products.length === newProducts.length) {
    return res.status(404).send("Product not found");
  }
  saveProducts(newProducts);
  res.status(204).send();
};
