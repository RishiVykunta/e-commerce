import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    page: parseInt(searchParams.get('page')) || 1,
  });

  const categories = ['Electronics', 'Accessories', 'Clothing', 'Footwear', 'Sports', 'Home & Kitchen'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productService.getProducts({
          search: filters.search,
          category: filters.category,
          page: filters.page,
          limit: 12,
        });
        setProducts(data.products || []);
        setPagination(data.pagination || {});
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.response?.data?.message || 'Failed to load products. Make sure the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    setSearchParams({
      search: newFilters.search,
      category: newFilters.category,
      page: newFilters.page,
    });
  };

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage };
    setFilters(newFilters);
    setSearchParams({
      search: newFilters.search,
      category: newFilters.category,
      page: newFilters.page,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.title}>Products</h1>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="form-control"
          style={styles.searchInput}
        />
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="form-control"
          style={styles.select}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="error" style={{ marginBottom: '20px' }}>
          {error}
          {error.includes('backend') && (
            <div style={{ marginTop: '10px', fontSize: '14px' }}>
              <strong>Tip:</strong> Make sure the backend server is running on port 5000
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading products...</div>
      ) : error ? (
        <div className="loading">
          <p>Unable to load products.</p>
          <p style={{ fontSize: '14px', marginTop: '10px', color: 'var(--text-light)' }}>
            Check that the database has been seeded with products.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="loading">
          <p>No products found</p>
          <p style={{ fontSize: '14px', marginTop: '10px', color: 'var(--text-light)' }}>
            The database appears to be empty. Run the seed file to add products.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="btn btn-outline"
              >
                Previous
              </button>
              <span style={styles.pageInfo}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
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
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
  },
  select: {
    width: '200px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '40px',
  },
  pageInfo: {
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default Products;

