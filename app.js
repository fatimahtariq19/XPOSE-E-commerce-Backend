// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const routes = require('./routes/index');
const categoryRoutes = require('./routes/v1/catalog.routes');

const app = express();

// ================== Middleware ==================
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(compression());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

// ================== Health Check ==================
app.get('/health', (_req, res) => res.json({ ok: true }));

// ================== Routes ==================
app.use('/api/v1', routes);
app.use('/api/categories', categoryRoutes);
// ================== Error Handling ==================
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;




// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
// const hpp = require('hpp');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');

// // Import routes
// const app = express();
// const routes = require('./routes/index');

// // ================== Config ==================
// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

// // Rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100,
// });

// // ================== Middleware ==================
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
// app.use(compression());
// app.use(xss());
// app.use(mongoSanitize());
// app.use(hpp());
// app.use(cookieParser());
// app.use(express.json({ limit: '1mb' }));
// app.use(express.urlencoded({ extended: true }));

// if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));
// app.use('/api', limiter);

// // ================== Health Check ==================
// app.get('/health', (_req, res) => res.json({ ok: true }));

// // ================== Routes ==================
// app.use('/api/v1', routes);
// // ================== Error Handling ==================
// app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal server error' });
// });

// // ================== DB Connection + Server Start ==================
// mongoose
//   .connect('mongodb+srv://fatimahtariq687:fatimahtariq687@cluster1.misvfzv.mongodb.net/shoes-store'
//     , { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('✅ MongoDB connected');
//     app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });
