// const Review = require('../models/Review');

// const createReview = async (req, res) => {
//   const { rating, comment, productId } = req.body;
//   const review = new Review({
//     user: req.user.id,
//     product: productId,
//     rating,
//     comment,
//   });
//   await review.save();
//   res.status(201).json(review);
// };

// const getProductReviews = async (req, res) => {
//   const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
//   res.json(reviews);
// };


// module.exports ={
//     createReview,
//     getProductReviews
// }