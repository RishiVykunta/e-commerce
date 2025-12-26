import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card" style={styles.card}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          style={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300';
          }}
        />

        <div style={styles.content}>
          <h3 style={styles.name}>{product.name}</h3>

          <p style={styles.category}>
            {product.category || 'general'}
          </p>

          <div style={styles.footer}>
            <span style={styles.price}>
              ₹{parseFloat(product.price || 0).toFixed(2)}
            </span>

            <span style={styles.stock}>
              {product.stock > 0
                ? `${product.stock} in stock`
                : 'Out of stock'}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
    padding: 0,
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  name: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: 'var(--text-color)',
  },
  category: {
    fontSize: '14px',
    color: 'var(--text-light)',
    marginBottom: '12px',
    textTransform: 'capitalize',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  stock: {
    fontSize: '14px',
    color: 'var(--text-light)',
  },
};

export default ProductCard;
