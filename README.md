# 🛍️ Full-Stack E-Commerce Application

A production-grade full-stack e-commerce application built with React.js, Node.js, Express.js, and PostgreSQL. This project demonstrates modern web development practices and is suitable for internship & fresher hiring evaluations.

## 🌐 Live Demo

- **Frontend:** [https://e-commerce-seven-ashen-41.vercel.app](https://e-commerce-seven-ashen-41.vercel.app)
- ⚠️ First request may take up to 30 seconds due to free-tier cold start.
- **Backend API:** [https://ecommerce-backend-rdyq.onrender.com](https://ecommerce-backend-rdyq.onrender.com)

**Demo Credentials:**
- **Admin:** admin@example.com / admin123
- **User:** user@example.com / user123

## 🚀 Features

### Core Features
- ✅ **User Authentication & Authorization**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Role-based access control (User/Admin)
  - Protected routes

- ✅ **Product Management**
  - Browse products with pagination
  - Product search and filtering by category
  - Product details page
  - Product images (Unsplash integration)
  - Stock availability tracking
  - Product categories: Electronics, Accessories, Clothing, Footwear, Sports, Home & Kitchen

- ✅ **Shopping Cart**
  - Add/remove products from cart
  - Update quantities
  - Cart persistence with LocalStorage
  - Context API for state management
  - Real-time stock validation

- ✅ **Checkout & Payments**
  - Secure checkout flow
  - Razorpay payment integration (UPI, Cards, Net Banking, Wallets)
  - Payment verification
  - Order confirmation
  - Indian Rupees (INR) currency support

- ✅ **Order Management**
  - Order history for users
  - Order status tracking (Placed, Paid, Shipped, Delivered, Cancelled)
  - Invoice details
  - Order tracking

- ✅ **Admin Panel**
  - Admin authentication
  - Add/Update/Delete products
  - Manage inventory (stock count)
  - View all orders
  - Update order status
  - Product image upload (URL or file)

### Advanced Features
- ⭐ Product pagination
- ⭐ Product reviews & ratings (1-5 stars)
- ⭐ Protected admin routes
- ⭐ Image upload with Multer
- ⭐ API error handling & validation
- ⭐ Loading & error UI states
- ⭐ Secure environment variables
- ⭐ SQL migrations & seed data
- ⭐ Clean folder structure
- ⭐ Reusable components & services
- ⭐ Responsive design (Desktop + Mobile)
- ⭐ Payment gateway integration (Razorpay)

## 🛠️ Tech Stack

### Frontend
- **React.js** (Functional Components with Hooks)
- **React Router** (v6) - Navigation & Protected Routes
- **Context API** - Global state management (Auth, Cart)
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay** - Payment gateway (UPI, Cards, Net Banking, Wallets)
- **Multer** - File upload handling

## 📂 Project Structure

```
E-commerce/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/             # Context API providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── services/            # API service functions
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── productService.js
│   │   │   ├── orderService.js
│   │   │   └── reviewService.js
│   │   ├── utils/              # Utility functions
│   │   │   └── razorpay.js
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── controllers/             # Route controllers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── reviewController.js
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   ├── middleware/              # Custom middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/                  # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── config/                  # Configuration files
│   │   └── database.js
│   ├── uploads/                 # Uploaded images (created automatically)
│   ├── server.js                # Express server
│   └── package.json
│
├── database/
│   ├── schema.sql               # Database schema
│   ├── seed.sql                 # Seed data with sample products
│   ├── generate-hashes.js       # Password hash generator
│   ├── fix-product-images.sql   # Image URL fixes
│   └── update-prices-to-inr.sql # Price conversion script
│
├── RAZORPAY_SETUP.md           # Razorpay setup guide
├── SETUP_GUIDE.md              # Detailed setup instructions
├── HOW_TO_RUN.txt             # Quick start guide
└── README.md
```







## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with pagination, search, filter)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Orders
- `POST /api/orders/create-razorpay-order` - Create Razorpay order (Protected)
- `POST /api/orders/verify-razorpay-payment` - Verify Razorpay payment (Protected)
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `GET /api/reviews/product/:productId/user` - Get user's review (Protected)
- `POST /api/reviews` - Create/update review (Protected)
- `DELETE /api/reviews/:productId` - Delete review (Protected)


## 💳 Payment Integration (Razorpay)

This application uses **Razorpay** for payment processing, which is fully available in India and supports:

- ✅ **UPI** - Google Pay, PhonePe, Paytm, BHIM, etc.
- ✅ **Credit/Debit Cards** - All major cards
- ✅ **Net Banking** - All major Indian banks
- ✅ **Wallets** - Paytm, Freecharge, Mobikwik, etc.
- ✅ **EMI** - Available for eligible cards

### Setup Payment Gateway

1. Create a Razorpay account at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your API keys (Key ID and Key Secret)
3. Add keys to environment variables (see setup instructions above)
4. For detailed setup, see `RAZORPAY_SETUP.md`

### Frontend
- ✅ React Functional Components with Hooks
- ✅ Context API for Global State Management
- ✅ React Router for Navigation
- ✅ Protected Routes
- ✅ Form Handling & Validation
- ✅ API Integration with Axios
- ✅ Loading & Error States
- ✅ Responsive Design
- ✅ Payment Gateway Integration

### Backend
- ✅ RESTful API Design
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Role-Based Access Control
- ✅ Database Transactions
- ✅ Error Handling
- ✅ File Upload (Multer)
- ✅ Input Validation
- ✅ Payment Gateway Integration

### Database
- ✅ Relational Database Design
- ✅ Foreign Keys & Constraints
- ✅ Indexes for Performance
- ✅ Triggers for Timestamps
- ✅ Data Integrity

## 🚀 Deployment


The application is configured for deployment on:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase


### Quick Summary

1. **Supabase (Database)**
   - Create project and get connection string
   - Run `database/schema.sql` and `database/seed.sql`

2. **Render (Backend)**
   - Connect GitHub repository
   - Set root directory: `backend`
   - Set environment variables (see `backend/env.example`)
   - Deploy

3. **Vercel (Frontend)**
   - Import GitHub repository
   - Set root directory: `frontend`
   - Set environment variable: `VITE_API_URL` (your Render backend URL)
   - Deploy

4. **Update CORS**
   - Update `FRONTEND_URL` in Render with your Vercel URL


## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Browse products with pagination
- [ ] Search and filter products
- [ ] Add products to cart
- [ ] Update cart quantities
- [ ] Complete checkout flow (after Razorpay setup)
- [ ] View order history
- [ ] Admin: Add/Edit/Delete products
- [ ] Admin: Update order status
- [ ] Product reviews and ratings




