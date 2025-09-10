const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const { JWT_SECRET } = require('../config/env');
const User = require('../models/User');


const protect = async (req, _res, next) => {
const auth = req.headers.authorization;
if (!auth || !auth.startsWith('Bearer ')) return next(new ApiError(401, 'Unauthorized'));
try {
const token = auth.split(' ')[1];
const payload = jwt.verify(token, JWT_SECRET);
const user = await User.findById(payload.id).select('+role');
if (!user) return next(new ApiError(401, 'User not found'));
req.user = user; // Encapsulation: attach current user to request
next();
} catch (e) {
next(new ApiError(401, 'Invalid/Expired token'));
}
};


const allow = (...roles) => (req, _res, next) => {
if (!roles.includes(req.user.role)) return next(new ApiError(403, 'Forbidden'));
next();
};


module.exports = { protect, allow };