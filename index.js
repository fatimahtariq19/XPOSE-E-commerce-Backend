const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;
const routes = require('./routes/index');
app.use(express.json()); // <--- THIS IS REQUIRED

// Routes
// const reviewRoutes = require('./routes/reviewRoutes');
// const orderRoutes= require('./routes/orderRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/v1/catalog.routes');

// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/v1', routes);
app.get('/check', (req, res) => {
    res.send("HELLO TO NODE.js WORLD.....");
});



// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected ✅'))
.catch((err) => console.log('MongoDB Error ❌', err));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
