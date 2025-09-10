const asyncHandler = require('../utils/asyncHandler');
const { registerSchema, loginSchema } = require('../validation/schemas');
const AuthService = require('../services/AuthService');

const register = asyncHandler(async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) throw error;
  const data = await AuthService.register(value);
  res.status(201).json(data);
});

const login = asyncHandler(async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) throw error;
  const data = await AuthService.login(value);
  res.json(data);
});

module.exports = {
  login,
  register,
};
