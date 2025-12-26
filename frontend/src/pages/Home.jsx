import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts({ page: 1, limit: 8 });
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Our E-Commerce Store</h1>
          <p style={styles.heroSubtitle}>
            Discover amazing products at great prices
          </p>
          <Link to="/products" className="btn btn-primary" style={styles.ctaButton}>
            Shop Now
          </Link>
        </div>
      </section>

      <section className="container" style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="grid grid-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div style={styles.viewAll}>
          <Link to="/products" className="btn btn-outline">
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
    color: 'white',
    padding: '80px 0',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '30px',
    opacity: 0.9,
  },
  ctaButton: {
    fontSize: '18px',
    padding: '12px 30px',
  },
  section: {
    padding: '60px 0',
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '40px',
    textAlign: 'center',
  },
  viewAll: {
    textAlign: 'center',
    marginTop: '40px',
  },
};

export default Home;

