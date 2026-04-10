const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// === Middleware ===
app.use(cors({ origin: '*' })); // Cho phép frontend Web gọi API
app.use(bodyParser.json());

// === Static folder ===
app.use('/image/products', express.static('public/products'));
app.use('/image/category', express.static('public/category'));
app.use('/image/poster', express.static('public/posters'));

// === MongoDB connection ===
const URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/MobileDB";

mongoose.connect(URL)
  .then(() => console.log('Connected to Database'))
  .catch((error) => console.error('MongoDB connection error:', error));

// === Routes ===
app.use('/categories', require('./routes/category'));
app.use('/subCategories', require('./routes/subCategory'));
app.use('/brands', require('./routes/brand'));
app.use('/variantTypes', require('./routes/variantType'));
app.use('/variants', require('./routes/variant'));
app.use('/products', require('./routes/product'));
app.use('/couponCodes', require('./routes/couponCode'));
app.use('/posters', require('./routes/poster'));
app.use('/users', require('./routes/user'));
app.use('/orders', require('./routes/order'));
app.use('/payment', require('./routes/payment'));
app.use('/notification', require('./routes/notification'));

// === Example root route ===
app.get('/', asyncHandler(async (req, res) => {
    res.json({ success: true, message: 'API working successfully', data: null });
}));

// === Global error handler ===
app.use((error, req, res, next) => {
    res.status(500).json({ success: false, message: error.message, data: null });
});

// === Start server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});