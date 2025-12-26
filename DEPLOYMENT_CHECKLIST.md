# Deployment Checklist

Use this checklist to ensure everything is configured correctly before and after deployment.

## Pre-Deployment

### Database (Supabase)
- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Connection string copied (URI format)
- [ ] `database/schema.sql` executed in Supabase SQL Editor
- [ ] `database/seed.sql` executed (optional, for sample data)
- [ ] Database connection tested

### Backend (Render)
- [ ] GitHub repository pushed
- [ ] Render account created
- [ ] Web service created with:
  - [ ] Root directory: `backend`
  - [ ] Build command: `npm install`
  - [ ] Start command: `npm start`
- [ ] Environment variables set:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `DATABASE_URL` (from Supabase)
  - [ ] `FRONTEND_URL` (will update after frontend deployment)
  - [ ] `JWT_SECRET` (strong, 32+ characters)
  - [ ] `RAZORPAY_KEY_ID` (optional, can add later)
  - [ ] `RAZORPAY_KEY_SECRET` (optional, can add later)
- [ ] Backend URL copied (e.g., `https://ecommerce-backend-xxxx.onrender.com`)

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Settings configured:
  - [ ] Framework: Vite
  - [ ] Root directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
- [ ] Environment variable set:
  - [ ] `VITE_API_URL` (your Render backend URL + `/api`)
- [ ] Frontend URL copied (e.g., `https://your-app.vercel.app`)

## Post-Deployment

### Backend Updates
- [ ] Update `FRONTEND_URL` in Render with Vercel URL
- [ ] Wait for backend to redeploy
- [ ] Test backend health endpoint: `https://your-backend.onrender.com/api/health`

### Frontend Testing
- [ ] Visit frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test product browsing
- [ ] Test adding to cart
- [ ] Test checkout flow (payment will be added later)
- [ ] Test admin login (if seed data was used)
- [ ] Check browser console for errors
- [ ] Check network tab for API calls

### Database Verification
- [ ] Check Supabase dashboard for tables
- [ ] Verify data exists (if seed was run)
- [ ] Test creating a new user via frontend
- [ ] Verify user appears in Supabase

## Payment Integration (After Deployment)

- [ ] Create Razorpay account
- [ ] Get API keys from Razorpay dashboard
- [ ] Update `RAZORPAY_KEY_ID` in Render
- [ ] Update `RAZORPAY_KEY_SECRET` in Render
- [ ] Test payment flow
- [ ] Verify payment webhooks (if configured)

## Common Issues to Check

### CORS Errors
- [ ] `FRONTEND_URL` in Render matches Vercel URL exactly
- [ ] No trailing slash in `FRONTEND_URL`
- [ ] Backend redeployed after updating `FRONTEND_URL`

### Database Connection Errors
- [ ] `DATABASE_URL` is correct
- [ ] Password in connection string is correct
- [ ] Supabase project is active
- [ ] SSL is enabled (already configured in code)

### API Connection Errors
- [ ] `VITE_API_URL` in Vercel is correct
- [ ] Backend is running (check health endpoint)
- [ ] Backend URL includes `/api` in `VITE_API_URL`

### Build Errors
- [ ] All dependencies are in `package.json`
- [ ] Node.js version is compatible
- [ ] Check build logs for specific errors

## Final Verification

- [ ] All features working in production
- [ ] No console errors
- [ ] No network errors
- [ ] Responsive design works on mobile
- [ ] Admin panel accessible
- [ ] Payment integration ready (keys added)

---

**Ready to deploy!** Follow the steps in `DEPLOYMENT.md` for detailed instructions.

