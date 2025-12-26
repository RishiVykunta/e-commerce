const Review = require('../models/Review');

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.findByProductId(req.params.productId);
    const ratingStats = await Review.getAverageRating(req.params.productId);

    res.json({
      reviews,
      rating: ratingStats,
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Valid product_id and rating (1-5) are required' });
    }

    const review = await Review.createOrUpdate({
      product_id,
      user_id: req.user.id,
      rating,
      comment: comment || '',
    });

    const ratingStats = await Review.getAverageRating(product_id);

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
      rating: ratingStats,
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByProductAndUser(req.params.productId, req.user.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await Review.delete(req.params.productId, req.user.id);

    const ratingStats = await Review.getAverageRating(req.params.productId);

    res.json({
      message: 'Review deleted successfully',
      rating: ratingStats,
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserReview = async (req, res) => {
  try {
    const review = await Review.findByProductAndUser(req.params.productId, req.user.id);
    res.json(review || null);
  } catch (error) {
    console.error('Get user review error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
