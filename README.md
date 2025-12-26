# 🛍️ Full-Stack E-Commerce Application

A production-grade full-stack e-commerce application built with React.js, Node.js, Express.js, and PostgreSQL. This project demonstrates modern web development practices and is suitable for internship & fresher hiring evaluations.

## 🌐 Live Demo

- **Frontend:** [https://e-commerce-seven-ashen-41.vercel.app](https://e-commerce-seven-ashen-41.vercel.app)
- **Backend API:** [https://ecommerce-backend-rdyq.onrender.com](https://ecommerce-backend-rdyq.onrender.com)
- **API Health Check:** [https://ecommerce-backend-rdyq.onrender.com/api/health](https://ecommerce-backend-rdyq.onrender.com/api/health)

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

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** or **yarn**
- **Git**

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-commerce
```

### 2. Database Setup

#### Install PostgreSQL
- Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
- Start PostgreSQL service

#### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ecommerce_db;

# Exit psql
\q
```

#### Run Schema and Seed Data

```bash
# Run schema
psql -U postgres -d ecommerce_db -f database/schema.sql

# Run seed data
psql -U postgres -d ecommerce_db -f database/seed.sql
```

**Note:** If you want to generate new password hashes, run:
```bash
cd backend
node ../database/generate-hashes.js
```
Then update the INSERT statements in `database/seed.sql` with the new hashes.

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example below and create your .env file
```

**Backend .env Configuration:**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password_here

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Razorpay Configuration (Add after setting up Razorpay account)
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

**Important:** 
- Replace `your_password_here` with your PostgreSQL password
- Generate a strong JWT_SECRET (e.g., use a random string generator)
- Razorpay keys can be added later (see `RAZORPAY_SETUP.md` for details)

```bash
# Create uploads directory
mkdir uploads

# Start backend server (development mode)
npm run dev

# Or start in production mode
npm start
```

The backend server will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# Copy the example below and create your .env file
```

**Frontend .env Configuration:**
```env
VITE_API_URL=http://localhost:5000/api

# Razorpay Configuration (Add after setting up Razorpay account)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

**Important:**
- Razorpay Key ID can be added later (see `RAZORPAY_SETUP.md` for details)

```bash
# Start frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Sample Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** admin123
- **Role:** Admin

### User Account
- **Email:** user@example.com
- **Password:** user123
- **Role:** User

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

### Health Check
- `GET /api/health` - Server health check

## 🗄️ Database Schema

### Tables

1. **users**
   - id (SERIAL PRIMARY KEY)
   - email (UNIQUE, NOT NULL)
   - password (NOT NULL, hashed)
   - name (NOT NULL)
   - role (user/admin)
   - created_at, updated_at

2. **products**
   - id (SERIAL PRIMARY KEY)
   - name (NOT NULL)
   - description
   - price (DECIMAL, NOT NULL) - Prices in Indian Rupees (INR)
   - category (NOT NULL)
   - stock (INTEGER, DEFAULT 0)
   - image_url
   - created_at, updated_at

3. **orders**
   - id (SERIAL PRIMARY KEY)
   - user_id (FOREIGN KEY -> users.id)
   - total_amount (DECIMAL, NOT NULL) - Amount in INR
   - shipping_address (TEXT, NOT NULL)
   - payment_intent_id (Razorpay payment ID)
   - status (placed/paid/shipped/delivered/cancelled)
   - created_at, updated_at

4. **order_items**
   - id (SERIAL PRIMARY KEY)
   - order_id (FOREIGN KEY -> orders.id)
   - product_id (FOREIGN KEY -> products.id)
   - quantity (INTEGER, NOT NULL)
   - price (DECIMAL, NOT NULL)
   - created_at

5. **reviews**
   - id (SERIAL PRIMARY KEY)
   - product_id (FOREIGN KEY -> products.id)
   - user_id (FOREIGN KEY -> users.id)
   - rating (INTEGER, 1-5)
   - comment (TEXT)
   - created_at, updated_at
   - UNIQUE(product_id, user_id)

### Indexes
- Users: email
- Products: category, name, created_at
- Orders: user_id, status, created_at
- Order Items: order_id, product_id
- Reviews: product_id, user_id

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

### Payment Flow

1. User adds items to cart
2. User enters shipping address
3. User clicks "Pay" button
4. Razorpay checkout modal opens with multiple payment options
5. User selects payment method (UPI/Card/Net Banking/Wallet)
6. Payment is processed through Razorpay
7. Payment is verified on backend
8. Order is created in database
9. User is redirected to orders page

**Note:** Payment integration can be set up after deployment. The code is ready and will work once API keys are added.

## 💰 Currency

All prices are displayed in **Indian Rupees (INR)** with the ₹ symbol.

## 🎨 Key Concepts Demonstrated

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

This application is deployed and live on:
- **Frontend**: [Vercel](https://e-commerce-rishivykuntas-projects.vercel.app)
- **Backend**: [Render](https://ecommerce-backend-rdyq.onrender.com)
- **Database**: Supabase (PostgreSQL)

The application is configured for deployment on:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Supabase

### Quick Deployment Guide

For detailed step-by-step instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

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

**Note:** 
- Payment integration (Razorpay) can be set up after deployment
- All environment variables are documented in `DEPLOYMENT.md`
- The code is production-ready and will work once environment variables are configured

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

## 📝 Environment Variables Summary

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_key_secret
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

## 📚 Additional Documentation

- **RAZORPAY_SETUP.md** - Complete Razorpay payment gateway setup guide
- **SETUP_GUIDE.md** - Detailed setup instructions
- **HOW_TO_RUN.txt** - Quick start guide

## 🤝 Contributing

This is a demonstration project. Feel free to fork and enhance it!

## 📄 License

This project is open source and available for educational purposes.

## 🎯 Interview-Ready Highlights

When presenting this project in interviews, emphasize:

1. **Full-Stack Architecture:** Complete separation of concerns (Frontend/Backend/Database)
2. **Security:** JWT authentication, password hashing, protected routes
3. **State Management:** Context API for global state, LocalStorage for persistence
4. **Database Design:** Normalized schema with proper relationships and indexes
5. **Payment Integration:** Razorpay payment gateway with multiple payment methods (UPI, Cards, Net Banking, Wallets)
6. **RESTful APIs:** Well-structured API endpoints following REST principles
7. **Error Handling:** Comprehensive error handling on both frontend and backend
8. **User Experience:** Loading states, error messages, responsive design
9. **Code Organization:** Clean folder structure, reusable components
10. **Best Practices:** Environment variables, input validation, security middleware
11. **Indian Market Focus:** INR currency, Razorpay integration, Indian payment methods

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for internship evaluations**

**Payment Gateway:** Razorpay (UPI, Cards, Net Banking, Wallets)

**Currency:** Indian Rupees (INR) ₹
