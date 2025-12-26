const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { email, password, name, role = 'user' } = userData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO users (email, password, name, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, name, role, created_at
    `;

    const result = await pool.query(query, [email, hashedPassword, name, role]);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, name, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
