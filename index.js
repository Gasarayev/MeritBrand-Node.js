const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const swaggerConfig = require('./swagger/swaggerConfig');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const aboutRoutes = require('./routes/aboutRoutes'); 
const contactRoutes = require('./routes/contactRoutes');
const sliderRoutes = require('./routes/sliderRoutes'); 
const commentRoutes = require('./routes/commentRoutes'); 

const app = express();
const PORT = 3009;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
swaggerConfig(app);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/productUpload', express.static(path.join(__dirname, 'productUpload')));
app.use('/aboutUpload', express.static(path.join(__dirname, 'aboutUpload')));


app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', aboutRoutes); 
app.use('/api', contactRoutes);
app.use('/api/images', sliderRoutes);
app.use('/api', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`);
});
