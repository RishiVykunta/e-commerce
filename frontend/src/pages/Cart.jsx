import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={styles.container}>
        <h1 style={styles.title}>Shopping Cart</h1>
        <div style={styles.emptyCart}>
          <p style={styles.emptyText}>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      <div style={styles.cartContainer}>
        <div style={styles.itemsContainer}>
          {cart.map((item) => (
            <div key={item.id} className="card" style={styles.cartItem}>
              <Link to={`/products/${item.id}`} style={styles.itemImage}>
                <img
                  src={item.image_url || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  style={styles.image}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </Link>
              <div style={styles.itemDetails}>
                <Link to={`/products/${item.id}`}>
                  <h3 style={styles.itemName}>{item.name}</h3>
                </Link>
                <p style={styles.itemPrice}>₹{parseFloat(item.price || 0).toFixed(2)}</p>
                <div style={styles.quantityControl}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="btn btn-outline"
                    style={styles.quantityButton}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-outline"
                    style={styles.quantityButton}
                    disabled={item.stock <= item.quantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={styles.itemTotal}>
                <p style={styles.totalPrice}>₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn btn-danger"
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.summaryContainer}>
          <div className="card" style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div style={styles.summaryRowTotal}>
              <span>Total:</span>
              <span style={styles.totalAmount}>₹{total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary"
              style={styles.checkoutButton}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="btn btn-outline" style={styles.continueButton}>
              Continue Shopping
            </Link>
          </div>
        </div>
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
    marginBottom: '30px',
  },
  emptyCart: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: '20px',
    color: 'var(--text-light)',
    marginBottom: '30px',
  },
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '30px',
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  cartItem: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  itemImage: {
    flexShrink: 0,
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
    color: 'var(--text-color)',
  },
  itemPrice: {
    fontSize: '18px',
    color: 'var(--text-light)',
    marginBottom: '15px',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  quantityButton: {
    padding: '5px 15px',
    minWidth: '40px',
  },
  quantity: {
    fontSize: '18px',
    fontWeight: '500',
    minWidth: '30px',
    textAlign: 'center',
  },
  itemTotal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '15px',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  removeButton: {
    padding: '8px 16px',
  },
  summaryContainer: {
    position: 'sticky',
    top: '100px',
    height: 'fit-content',
  },
  summary: {
    padding: '30px',
  },
  summaryTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '16px',
  },
  summaryRowTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid var(--border-color)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  totalAmount: {
    color: 'var(--primary-color)',
    fontSize: '24px',
  },
  checkoutButton: {
    width: '100%',
    padding: '15px',
    marginTop: '20px',
    fontSize: '18px',
  },
  continueButton: {
    width: '100%',
    padding: '15px',
    marginTop: '15px',
    fontSize: '18px',
    textAlign: 'center',
    display: 'block',
  },
};

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 968px)');
  const updateStyles = () => {
    if (mediaQuery.matches) {
      styles.cartContainer.gridTemplateColumns = '1fr';
      styles.summaryContainer.position = 'static';
    }
  };
  mediaQuery.addEventListener('change', updateStyles);
  updateStyles();
}

export default Cart;

