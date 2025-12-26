import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setSuccess('Order status updated successfully');
      fetchOrders();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed':
        return 'var(--warning-color)';
      case 'paid':
        return 'var(--primary-color)';
      case 'shipped':
        return 'var(--secondary-color)';
      case 'delivered':
        return '#059669';
      case 'cancelled':
        return 'var(--danger-color)';
      default:
        return 'var(--text-light)';
    }
  };

  if (loading) {
    return (
      <div className="container" style={styles.container}>
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Manage Orders</h1>

      {error && <div className="error" style={styles.message}>{error}</div>}
      {success && <div className="success" style={styles.message}>{success}</div>}

      {orders.length === 0 ? (
        <div style={styles.emptyOrders}>
          <p style={styles.emptyText}>No orders found.</p>
        </div>
      ) : (
        <div style={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className="card" style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <h3 style={styles.orderId}>Order #{order.id}</h3>
                  <p style={styles.orderInfo}>
                    <strong>Customer:</strong> {order.user_name || 'N/A'} ({order.user_email || 'N/A'})
                  </p>
                  <p style={styles.orderDate}>
                    Placed on {new Date(order.created_at).toLocaleDateString()} at{' '}
                    {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>
                <div style={styles.orderStatus}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: getStatusColor(order.status),
                    }}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div style={styles.orderDetails}>
                <div style={styles.itemsSection}>
                  <strong>Items:</strong>
                  {order.items && order.items.length > 0 ? (
                    <ul style={styles.items}>
                      {order.items.map((item, index) => (
                        <li key={index} style={styles.item}>
                          <span>
                            {item.product_name || `Product ${item.product_id}`} × {item.quantity}
                          </span>
                          <span>₹{parseFloat(item.price || 0).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items found</p>
                  )}
                </div>

                <div style={styles.orderFooter}>
                  <div style={styles.shippingAddress}>
                    <strong>Shipping Address:</strong>
                    <p>{order.shipping_address}</p>
                  </div>
                  <div style={styles.totalAmount}>
                    <strong>Total: ₹{parseFloat(order.total_amount || 0).toFixed(2)}</strong>
                  </div>
                </div>

                <div style={styles.statusUpdate}>
                  <label>
                    <strong>Update Status:</strong>
                  </label>
                  <div style={styles.statusButtons}>
                    {['placed', 'paid', 'shipped', 'delivered', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        className={`btn btn-sm ${order.status === status ? 'btn-primary' : 'btn-outline'}`}
                        onClick={() => handleStatusUpdate(order.id, status)}
                        disabled={order.status === status}
                        style={styles.statusButton}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
  message: {
    marginBottom: '20px',
  },
  emptyOrders: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: '20px',
    color: 'var(--text-light)',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  orderCard: {
    padding: '30px',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    paddingBottom: '20px',
    borderBottom: '2px solid var(--border-color)',
  },
  orderId: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  orderInfo: {
    color: 'var(--text-color)',
    fontSize: '14px',
    marginBottom: '5px',
  },
  orderDate: {
    color: 'var(--text-light)',
    fontSize: '14px',
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  itemsSection: {
    marginBottom: '20px',
  },
  items: {
    listStyle: 'none',
    padding: 0,
    marginTop: '10px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid var(--border-color)',
  },
  orderFooter: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color)',
  },
  shippingAddress: {
    fontSize: '14px',
    color: 'var(--text-color)',
  },
  totalAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    textAlign: 'right',
  },
  statusUpdate: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color)',
  },
  statusButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  statusButton: {
    minWidth: '100px',
  },
};

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const updateStyles = () => {
    if (mediaQuery.matches) {
      styles.orderHeader.flexDirection = 'column';
      styles.orderHeader.gap = '15px';
      styles.orderFooter.gridTemplateColumns = '1fr';
      styles.totalAmount.textAlign = 'left';
    }
  };
  mediaQuery.addEventListener('change', updateStyles);
  updateStyles();
}

export default AdminOrders;

