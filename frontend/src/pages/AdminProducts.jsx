import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image_url: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = ['Electronics', 'Accessories', 'Clothing', 'Footwear', 'Sports', 'Home & Kitchen'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productService.getProducts({ limit: 100 });
      setProducts(data.products);
    } catch (error) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
        setSuccess('Product updated successfully');
      } else {
        await productService.createProduct(formData);
        setSuccess('Product created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image_url: product.image_url || '',
      image: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      setSuccess('Product deleted successfully');
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image_url: '',
      image: null,
    });
    setEditingProduct(null);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="container" style={styles.container}>
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Products</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      {error && <div className="error" style={styles.message}>{error}</div>}
      {success && <div className="success" style={styles.message}>{success}</div>}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img
                    src={product.image_url || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    style={styles.productImage}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{parseFloat(product.price || 0).toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => handleEdit(product)}
                    style={styles.actionButton}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product.id)}
                    style={styles.actionButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-control"
                  rows="4"
                  required
                />
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-control"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="form-control"
                    min="0"
                    required
                  />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Image URL</label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div style={styles.formGroup}>
                <label>Or Upload Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div style={styles.formActions}>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  message: {
    marginBottom: '20px',
  },
  tableContainer: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  productImage: {
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  actionButton: {
    marginRight: '10px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'var(--white)',
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '32px',
    cursor: 'pointer',
    color: 'var(--text-light)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
};

export default AdminProducts;

