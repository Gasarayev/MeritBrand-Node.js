const fs = require('fs');
const path = require('path');
const multer = require('multer');

const productsFilePath = path.join(__dirname, '../data/products.json');

const loadProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../productUpload')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadProductImage = upload.single('image');

const generateUniqueId = (products) => {
  let newId;
  do {
    newId = Math.floor(Math.random() * 100); 
  } while (products.find(product => product.id === newId)); 
  return newId;
};

exports.getAllProducts = (req, res) => {
  const products = loadProducts();
  res.status(200).json(products);
};

exports.createProduct = (req, res) => {
  const products = loadProducts();

  const newProduct = {
    id: generateUniqueId(products), 
    category: req.body.category,
    brand: req.body.brand,
    name: req.body.name,
    text: req.body.text,
    image: req.file ? `http://localhost:3009/productUpload/${req.file.filename}` : '',
    comment: req.body.comment || '',
  };

  products.push(newProduct);
  saveProducts(products);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const products = loadProducts();
  const productIndex = products.findIndex((p) => p.id === parseInt(req.params.id));

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products[productIndex] = {
    ...products[productIndex],
    ...req.body,
    image: req.file ? `http://localhost:3009/productUpload/${req.file.filename}` : products[productIndex].image,
  };

  saveProducts(products);
  res.status(200).json(products[productIndex]);
};

exports.getProductById = (req, res) => {
  const products = loadProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(product);
};

exports.deleteProduct = (req, res) => {
  const products = loadProducts();
  const updatedProducts = products.filter((p) => p.id !== parseInt(req.params.id));

  if (updatedProducts.length === products.length) {
    return res.status(404).json({ message: 'Product not found' });
  }

  saveProducts(updatedProducts);
  res.status(204).send();
};
