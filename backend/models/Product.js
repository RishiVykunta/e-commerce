const pool = require('../config/database');

class Product {
  static async findAll(filters = {}) {
    const { category, search, page = 1, limit = 10 } = filters;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async count(filters = {}) {
    const { category, search } = filters;

    let query = 'SELECT COUNT(*) FROM products WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count);
  }

  static async findById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(productData) {
    const { name, description, price, category, stock, image_url } = productData;
    const query = `
      INSERT INTO products (name, description, price, category, stock, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, price, category, stock, image_url]);
    return result.rows[0];
  }

  static async update(id, productData) {
    const { name, description, price, category, stock, image_url } = productData;
    const query = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, category = $4, stock = $5, image_url = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, price, category, stock, image_url, id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateStock(id, quantity) {
    const query = `
      UPDATE products 
      SET stock = stock - $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [quantity, id]);
    return result.rows[0];
  }
}

module.exports = Product;
