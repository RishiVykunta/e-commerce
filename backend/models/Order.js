const pool = require('../config/database');

class Order {
  static async create(orderData) {
    const { user_id, items, total_amount, shipping_address, phone_number, payment_intent_id } = orderData;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const orderQuery = `
        INSERT INTO orders (user_id, total_amount, shipping_address, phone_number, payment_intent_id, status)
        VALUES ($1, $2, $3, $4, $5, 'placed')
        RETURNING *
      `;
      const orderResult = await client.query(orderQuery, [user_id, total_amount, shipping_address, phone_number, payment_intent_id]);
      const order = orderResult.rows[0];

      const orderItems = [];
      for (const item of items) {
        const itemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES ($1, $2, $3, $4)
          RETURNING *
        `;
        const itemResult = await client.query(itemQuery, [order.id, item.product_id, item.quantity, item.price]);
        orderItems.push(itemResult.rows[0]);

        await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
      }

      await client.query('COMMIT');
      return { ...order, items: orderItems };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async findByUserId(userId) {
    const query = `
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'product_image', p.image_url,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async findAll() {
    const query = `
      SELECT o.*, u.name as user_name, u.email as user_email,
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, u.name, u.email
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT o.*, u.name as user_name, u.email as user_email,
             json_agg(
               json_build_object(
                 'id', oi.id,
                 'product_id', oi.product_id,
                 'product_name', p.name,
                 'product_image', p.image_url,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
      GROUP BY o.id, u.name, u.email
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const query = `
      UPDATE orders 
      SET status = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
  }
}

module.exports = Order;
