const express = require('express');
const cors = require('cors');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const aboutRoutes = require('./routes/aboutRoutes'); 
const swaggerConfig = require('./swagger/swaggerConfig');
const contactRoutes = require('./routes/contactRoutes');

const PORT = 3009;
app.use(cors());
app.use(express.json());
swaggerConfig(app);

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', aboutRoutes); 
app.use('/api', contactRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger API docs available at http://localhost:${PORT}/api-docs`);
});
