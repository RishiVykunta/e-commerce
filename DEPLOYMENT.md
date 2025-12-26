# Deployment Guide

This guide will help you deploy the E-commerce application to:
- **Vercel** (Frontend)
- **Render** (Backend)
- **Supabase** (Database)

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Vercel account (free tier available)
3. Render account (free tier available)
4. Supabase account (free tier available)

---

## Step 1: Deploy Database to Supabase

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: Your project name
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" (takes 2-3 minutes)

### 1.2 Get Database Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** format
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

### 1.3 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Open `database/schema.sql` from your project
3. Copy and paste the entire content
4. Click "Run" to execute

### 1.4 Seed Database (Optional)

1. In **SQL Editor**, open `database/seed.sql`
2. Copy and paste the content
3. Click "Run" to add sample products

---

## Step 2: Deploy Backend to Render

### 2.1 Create Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ecommerce-backend` (or your choice)
   - **Region**: Choose closest to Supabase region
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### 2.2 Set Environment Variables

In Render dashboard, go to **Environment** tab and add:

```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

**Important:**
- Replace `YOUR_PASSWORD` with your Supabase database password
- Replace `xxxxx` with your Supabase project reference
- Replace `your-frontend.vercel.app` with your actual Vercel URL (you'll update this after frontend deployment)
- Generate a strong `JWT_SECRET` (minimum 32 characters)
- For Razorpay keys, you can leave them empty for now (payment integration will be done later)

### 2.3 Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Wait for deployment to complete (5-10 minutes)
4. Copy your backend URL (e.g., `https://ecommerce-backend-xxxx.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3.2 Set Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
VITE_API_URL=https://your-backend.onrender.com/api
```

**Important:**
- Replace `your-backend.onrender.com` with your actual Render backend URL

### 3.3 Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy
3. Wait for deployment to complete (2-3 minutes)
4. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

### 3.4 Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Render will automatically redeploy

---

## Step 4: Verify Deployment

### 4.1 Test Backend

1. Visit: `https://your-backend.onrender.com/api/health`
2. Should return: `{"message":"Server is running","status":"ok"}`

### 4.2 Test Frontend

1. Visit your Vercel URL
2. Try to:
   - Register a new user
   - Login
   - Browse products
   - Add items to cart

### 4.3 Check Logs

- **Render**: Go to "Logs" tab to see backend logs
- **Vercel**: Go to "Deployments" → Click deployment → "View Function Logs"

---

## Step 5: Payment Integration (After Deployment)

Once deployment is successful, you can integrate Razorpay:

1. Create Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your API keys from Razorpay dashboard
3. Update environment variables in Render:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
4. Redeploy backend (Render will auto-redeploy)

---

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify `DATABASE_URL` is correct in Render
- Check Supabase database password is correct
- Ensure Supabase project is active

**CORS Errors:**
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Check for trailing slashes (should not have one)

**Port Binding:**
- Render automatically sets `PORT` environment variable
- Your code should use `process.env.PORT || 5000`

### Frontend Issues

**API Connection Errors:**
- Verify `VITE_API_URL` in Vercel is correct
- Check backend is running (visit health endpoint)
- Check browser console for CORS errors

**Build Errors:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Issues

**Connection Timeout:**
- Supabase requires SSL in production
- Database config already includes SSL settings
- Check Supabase project status

**Authentication Failed:**
- Verify database password in `DATABASE_URL`
- Reset password in Supabase if needed

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
FRONTEND_URL=https://your-frontend.vercel.app
JWT_SECRET=your-super-secret-jwt-key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify all environment variables are set correctly
3. Test API endpoints directly
4. Check database connection in Supabase dashboard

Good luck with your deployment! 🚀

