import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const stock = parseInt(product.stock || 0);
    if (stock < quantity) {
      setError('Insufficient stock');
      return;
    }
    addToCart(product, quantity);
    navigate('/cart');
  };

  if (loading) {
    return <div className="container" style={styles.container}><div className="loading">Loading...</div></div>;
  }

  if (error || !product) {
    return (
      <div className="container" style={styles.container}>
        <div className="error">{error || 'Product not found'}</div>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back
      </button>
      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img
            src={product.image_url || 'https://via.placeholder.com/500'}
            alt={product.name}
            style={styles.image}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500';
            }}
          />
        </div>
        <div style={styles.detailsContainer}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.price}>₹{parseFloat(product.price || 0).toFixed(2)}</p>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.stock}>
            <strong>Stock:</strong>{' '}
            {parseInt(product.stock || 0) > 0 ? (
              <span style={styles.inStock}>{product.stock} available</span>
            ) : (
              <span style={styles.outOfStock}>Out of stock</span>
            )}
          </div>
          {parseInt(product.stock || 0) > 0 && (
            <div style={styles.quantityContainer}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={parseInt(product.stock || 0)}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                style={styles.quantityInput}
              />
            </div>
          )}
          {error && <div className="error">{error}</div>}
          <button
            className="btn btn-primary"
            style={styles.addButton}
            onClick={handleAddToCart}
            disabled={parseInt(product.stock || 0) === 0}
          >
            {parseInt(product.stock || 0) > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-color)',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontWeight: '500',
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    marginTop: '20px',
  },
  imageContainer: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: 'var(--shadow)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'var(--text-color)',
  },
  category: {
    fontSize: '18px',
    color: 'var(--text-light)',
    textTransform: 'capitalize',
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--text-color)',
  },
  stock: {
    fontSize: '16px',
    color: 'var(--text-color)',
  },
  inStock: {
    color: 'var(--secondary-color)',
    fontWeight: '500',
  },
  outOfStock: {
    color: 'var(--danger-color)',
    fontWeight: '500',
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  quantityInput: {
    width: '80px',
    padding: '8px',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    fontSize: '16px',
  },
  addButton: {
    padding: '15px',
    fontSize: '18px',
    width: '100%',
  },
};

const mediaQuery = window.matchMedia('(max-width: 768px)');
if (mediaQuery.matches) {
  styles.productContainer.gridTemplateColumns = '1fr';
}

export default ProductDetails;

