import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <div style={styles.cards}>
        <Link to="/admin/products" style={styles.card}>
          <div style={styles.cardIcon}>📦</div>
          <h2 style={styles.cardTitle}>Manage Products</h2>
          <p style={styles.cardDescription}>Add, edit, or delete products</p>
        </Link>
        <Link to="/admin/orders" style={styles.card}>
          <div style={styles.cardIcon}>📋</div>
          <h2 style={styles.cardTitle}>Manage Orders</h2>
          <p style={styles.cardDescription}>View and update order status</p>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '40px',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    padding: '40px',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  cardIcon: {
    fontSize: '64px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--text-color)',
  },
  cardDescription: {
    color: 'var(--text-light)',
    fontSize: '16px',
  },
};

export default AdminDashboard;

