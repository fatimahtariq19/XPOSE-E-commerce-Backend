const jwt2 = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');


class AuthService {
static signToken(user) {
return jwt2.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}


static async register({ name, email, password }) {
const exists = await User.findOne({ email });
if (exists) throw new ApiError(400, 'Email already registered');
const user = await User.create({ name, email, password });
const token = this.signToken(user);
return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
}


static async login({ email, password }) {
const user = await User.findOne({ email }).select('+password +role');
if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials');
const token = this.signToken(user);
return { user: { id: user._id, name: user.name, email: user.email, role: user.role }, token };
}
}


module.exports = AuthService;