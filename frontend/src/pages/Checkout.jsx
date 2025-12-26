import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { loadRazorpay } from '../utils/razorpay';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    doorNumber: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
    loadRazorpay()
      .then(() => setRazorpayLoaded(true))
      .catch((err) => {
        console.error('Failed to load Razorpay:', err);
        setError('Failed to load payment gateway. Please refresh the page.');
      });
  }, [cart, navigate]);

  const total = getCartTotal();

  const isFormValid = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;
    return (
      formData.phone.trim() &&
      phoneRegex.test(formData.phone.replace(/\s+/g, '')) &&
      formData.doorNumber.trim() &&
      formData.street.trim() &&
      formData.city.trim() &&
      formData.state.trim() &&
      formData.pincode.trim() &&
      pincodeRegex.test(formData.pincode.replace(/\s+/g, ''))
    );
  };

  const validateForm = () => {
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ''))) {
      setError('Please enter a valid 10-digit Indian phone number');
      return false;
    }
    if (!formData.doorNumber.trim()) {
      setError('Please enter door/flat number');
      return false;
    }
    if (!formData.street.trim()) {
      setError('Please enter street/area name');
      return false;
    }
    if (!formData.city.trim()) {
      setError('Please enter city');
      return false;
    }
    if (!formData.state.trim()) {
      setError('Please enter state');
      return false;
    }
    if (!formData.pincode.trim()) {
      setError('Please enter pincode');
      return false;
    }
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pincode.replace(/\s+/g, ''))) {
      setError('Please enter a valid 6-digit pincode');
      return false;
    }
    return true;
  };

  const formatShippingAddress = () => {
    return `${formData.doorNumber}, ${formData.street}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (!razorpayLoaded) {
      setError('Payment gateway is still loading. Please wait...');
      return;
    }

    setLoading(true);

    try {
      const { orderId, key } = await orderService.createRazorpayOrder(total);

      const Razorpay = window.Razorpay;

      const options = {
        key: key,
        amount: Math.round(total * 100),
        currency: 'INR',
        name: 'E-Commerce Store',
        description: `Order Payment - ${cart.length} item(s)`,
        order_id: orderId,
        handler: async function (response) {
          try {
            const verification = await orderService.verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification.success) {
        const items = cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        }));

        await orderService.createOrder({
          items,
          shipping_address: formatShippingAddress(),
          phone_number: formData.phone.replace(/\s+/g, ''),
          payment_intent_id: verification.paymentId,
        });

        clearCart();
        navigate('/orders', { state: { orderSuccess: true } });
            } else {
              setError('Payment verification failed. Please contact support.');
              setLoading(false);
            }
          } catch (err) {
            console.error('Order creation error:', err);
            setError(err.response?.data?.message || 'Failed to create order. Payment was successful, please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: formData.phone.replace(/\s+/g, ''),
        },
        notes: {
          address: formatShippingAddress(),
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled');
          },
        },
      };

      const razorpayInstance = new Razorpay(options);
      razorpayInstance.on('payment.failed', function (response) {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpayInstance.open();
      setLoading(false);
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>
      <div style={styles.checkoutContainer}>
        <div style={styles.orderSummary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} style={styles.orderItem}>
              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity} × ₹{parseFloat(item.price || 0).toFixed(2)}</p>
              </div>
              <strong>₹{(parseFloat(item.price || 0) * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div style={styles.orderTotal}>
            <strong>Total: ₹{total.toFixed(2)}</strong>
          </div>
        </div>
        <div style={styles.paymentSection}>
          <h2 style={styles.sectionTitle}>Shipping Information</h2>
          <form onSubmit={handlePayment} style={styles.form}>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  if (value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                placeholder="10-digit mobile number (e.g., 9876543210)"
                required
                maxLength="10"
                disabled={loading}
              />
              <small style={{ color: 'var(--text-light)', fontSize: '12px' }}>
                Enter 10-digit Indian mobile number (starts with 6, 7, 8, or 9)
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="doorNumber">Door/Flat Number *</label>
              <input
                type="text"
                id="doorNumber"
                className="form-control"
                value={formData.doorNumber}
                onChange={(e) => setFormData({ ...formData, doorNumber: e.target.value })}
                placeholder="e.g., Flat 101, House No. 123"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street/Area *</label>
              <input
                type="text"
                id="street"
                className="form-control"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="Street name, Area, Locality"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City name"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                className="form-control"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State name"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                className="form-control"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                placeholder="6-digit pincode (e.g., 560001)"
                required
                maxLength="6"
                disabled={loading}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div style={styles.paymentInfo}>
              <p style={styles.infoText}>
                <strong>Payment Methods Available:</strong>
              </p>
              <ul style={styles.methodsList}>
                <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
                <li>Credit/Debit Cards</li>
                <li>Net Banking</li>
                <li>Wallets</li>
              </ul>
            </div>
            <div style={styles.total}>
              <strong>Total Amount: ₹{total.toFixed(2)}</strong>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={styles.submitButton}
              disabled={loading || !razorpayLoaded || !isFormValid()}
            >
              {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
            </button>
            {!razorpayLoaded && (
              <p style={styles.loadingText}>Loading payment gateway...</p>
            )}
          </form>
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
  checkoutContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '40px',
  },
  orderSummary: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: 'var(--shadow)',
    height: 'fit-content',
    position: 'sticky',
    top: '100px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 0',
    borderBottom: '1px solid var(--border-color)',
  },
  orderTotal: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid var(--border-color)',
    fontSize: '20px',
  },
  paymentSection: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: 'var(--shadow)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  paymentInfo: {
    padding: '15px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  infoText: {
    marginBottom: '10px',
    fontSize: '14px',
    color: 'var(--text-color)',
  },
  methodsList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: 'var(--text-light)',
  },
  total: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: 'var(--bg-color)',
    borderRadius: '6px',
  },
  submitButton: {
    width: '100%',
    padding: '15px',
    fontSize: '18px',
  },
  loadingText: {
    textAlign: 'center',
    color: 'var(--text-light)',
    fontSize: '14px',
    marginTop: '10px',
  },
};

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 968px)');
  const updateStyles = () => {
    if (mediaQuery.matches) {
      styles.checkoutContainer.gridTemplateColumns = '1fr';
      styles.orderSummary.position = 'static';
    }
  };
  mediaQuery.addEventListener('change', updateStyles);
  updateStyles();
}

export default Checkout;
