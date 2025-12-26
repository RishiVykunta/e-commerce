const pool = require('../config/database');

class Review {
  static async findByProductId(productId) {
    const query = `
      SELECT r.*, u.name as user_name, u.email as user_email
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1
      ORDER BY r.created_at DESC
    `;
    const result = await pool.query(query, [productId]);
    return result.rows;
  }

  static async getAverageRating(productId) {
    const query = `
      SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews
      FROM reviews
      WHERE product_id = $1
    `;
    const result = await pool.query(query, [productId]);
    return {
      avgRating: parseFloat(result.rows[0].avg_rating || 0).toFixed(1),
      totalReviews: parseInt(result.rows[0].total_reviews || 0),
    };
  }

  static async createOrUpdate(reviewData) {
    const { product_id, user_id, rating, comment } = reviewData;

    const existingQuery = 'SELECT * FROM reviews WHERE product_id = $1 AND user_id = $2';
    const existing = await pool.query(existingQuery, [product_id, user_id]);

    if (existing.rows.length > 0) {
      const updateQuery = `
        UPDATE reviews
        SET rating = $1, comment = $2, updated_at = NOW()
        WHERE product_id = $3 AND user_id = $4
        RETURNING *
      `;
      const result = await pool.query(updateQuery, [rating, comment, product_id, user_id]);
      return result.rows[0];
    } else {
      const insertQuery = `
        INSERT INTO reviews (product_id, user_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const result = await pool.query(insertQuery, [product_id, user_id, rating, comment]);
      return result.rows[0];
    }
  }

  static async delete(productId, userId) {
    const query = 'DELETE FROM reviews WHERE product_id = $1 AND user_id = $2 RETURNING *';
    const result = await pool.query(query, [productId, userId]);
    return result.rows[0];
  }

  static async findByProductAndUser(productId, userId) {
    const query = `
      SELECT r.*, u.name as user_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = $1 AND r.user_id = $2
    `;
    const result = await pool.query(query, [productId, userId]);
    return result.rows[0];
  }
}

module.exports = Review;
