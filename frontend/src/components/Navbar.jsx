import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          🛍️ E-Commerce
        </Link>

        <div style={styles.menu}>
          <Link to="/products" style={styles.link}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" style={styles.link}>
                Cart ({cartItemsCount})
              </Link>
              <Link to="/orders" style={styles.link}>
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" style={styles.link}>
                  Admin
                </Link>
              )}
              <div style={styles.userMenu}>
                <span style={styles.userName}>{user?.name}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.registerBtn}>
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          style={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/products" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/cart" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                Cart ({cartItemsCount})
              </Link>
              <Link to="/orders" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                  Admin
                </Link>
              )}
              <span style={styles.mobileUser}>{user?.name}</span>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--white)',
    boxShadow: 'var(--shadow-md)',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  link: {
    color: 'var(--text-color)',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
  registerBtn: {
    padding: '8px 16px',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    borderRadius: '6px',
    fontWeight: '500',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userName: {
    color: 'var(--text-color)',
    fontWeight: '500',
  },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: 'var(--danger-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
  },
  mobileMenuButton: {
    display: 'none',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    backgroundColor: 'var(--white)',
    borderTop: '1px solid var(--border-color)',
  },
  mobileLink: {
    padding: '10px 0',
    color: 'var(--text-color)',
    fontWeight: '500',
    borderBottom: '1px solid var(--border-color)',
  },
  mobileUser: {
    padding: '10px 0',
    color: 'var(--text-color)',
    fontWeight: '500',
  },
  mobileLogoutBtn: {
    padding: '10px',
    backgroundColor: 'var(--danger-color)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '500',
  },
};

if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  const updateStyles = () => {
    if (mediaQuery.matches) {
      styles.menu.display = 'none';
      styles.mobileMenuButton.display = 'block';
      styles.mobileMenu.display = 'flex';
    } else {
      styles.menu.display = 'flex';
      styles.mobileMenuButton.display = 'none';
      styles.mobileMenu.display = 'none';
    }
  };
  mediaQuery.addEventListener('change', updateStyles);
  updateStyles();
}

export default Navbar;

