const ApiError = require('../utils/ApiError');


const notFound = (req, _res, next) => next(new ApiError(404, `Not Found: ${req.originalUrl}`));


const errorHandler = (err, _req, res, _next) => {
const status = err.statusCode || 500;
const message = err.message || 'Something went wrong';
if (process.env.NODE_ENV !== 'production') console.error(err);
res.status(status).json({ status, message });
};


module.exports = { notFound, errorHandler };