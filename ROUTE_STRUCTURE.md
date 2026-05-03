# Car Store - Route Structure Documentation

## Overview

This project implements a clean, scalable route structure for a car dealership platform using Next.js App Router. The structure separates public, authenticated user, and admin routes into distinct route groups for better organization and security.

## Directory Structure

```
app/
├── (public)/                    # Public routes (no authentication required)
│   ├── layout.js               # Public layout with header/footer
│   ├── page.js                 # Homepage
│   ├── about/                  # About page
│   ├── blog/                   # Blog pages
│   ├── cars/                   # Car listings
│   ├── contact/                # Contact page
│   ├── financing/              # Financing options
│   ├── new-arrivals/           # New car arrivals
│   ├── sell/                   # Sell your car page
│   ├── testdrive/              # Test drive scheduling
│   ├── whiteglove/             # White glove service
│   ├── careers/                # Careers page
│   ├── press/                  # Press/media
│   ├── cookies/                # Cookie policy
│   ├── disclaimer/             # Disclaimer
│   ├── privacypolicy/          # Privacy policy
│   └── term&condition/         # Terms & conditions
├── (auth)/                     # Authentication routes
│   ├── layout.js               # Minimal auth layout
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── forgot-password/        # Password recovery
│   └── reset-password/         # Password reset
├── (user)/                     # Authenticated user routes
│   ├── layout.js               # User dashboard layout
│   ├── dashboard/              # User dashboard
│   ├── profile/                # User profile
│   ├── orders/                 # Order history
│   ├── favorites/              # Favorite cars
│   ├── settings/               # Account settings
│   └── messages/               # User messages
├── (admin)/                    # Admin routes (admin role required)
│   ├── layout.js               # Admin dashboard layout
│   ├── dashboard/              # Admin dashboard
│   ├── users/                  # User management
│   ├── cars/                   # Car inventory management
│   ├── orders/                 # Order management
│   ├── analytics/              # Platform analytics
│   ├── settings/               # Admin settings
│   ├── inventory/              # Inventory management
│   └── reports/                # Reports
├── api/                        # API routes
│   ├── auth/                   # Authentication API
│   ├── users/                  # User management API
│   ├── cars/                   # Car management API
│   ├── admin/                  # Admin API endpoints
│   ├── orders/                 # Order API
│   └── upload/                 # File upload API
├── components/                 # Shared components
│   ├── ui/                     # Reusable UI components (buttons, inputs, etc.)
│   ├── layout/                 # Layout components (headers, footers, sidebars)
│   └── shared/                 # Other shared components
├── lib/                        # Utilities and helpers
│   ├── auth.js                 # Authentication utilities
│   ├── db.js                   # Database connection
│   └── utils.js                # General utilities
├── middleware.js               # Authentication & authorization middleware
└── layout.js                   # Root layout
```

## Route Groups Explained

### 1. Public Routes `(public)/`
- **Purpose**: Accessible to all visitors without authentication
- **Layout**: Includes header, footer, and public navigation
- **Examples**: Homepage, car listings, about page, contact form
- **URLs**: `/`, `/about`, `/cars`, `/contact`, etc.

### 2. Authentication Routes `(auth)/`
- **Purpose**: User authentication flows
- **Layout**: Minimal layout focused on form presentation
- **Examples**: Login, signup, password recovery
- **URLs**: `/login`, `/signup`, `/forgot-password`, etc.

### 3. User Routes `(user)/`
- **Purpose**: Authenticated user dashboard and features
- **Layout**: Dashboard layout with sidebar navigation
- **Authentication**: Requires valid user session
- **Examples**: User dashboard, profile, orders, favorites
- **URLs**: `/user/dashboard`, `/user/profile`, `/user/orders`, etc.

### 4. Admin Routes `(admin)/`
- **Purpose**: Administrative functions and platform management
- **Layout**: Admin dashboard with dark theme and admin navigation
- **Authorization**: Requires admin role in addition to authentication
- **Examples**: User management, inventory control, analytics
- **URLs**: `/admin/dashboard`, `/admin/users`, `/admin/cars`, etc.

## Key Features

### 1. Middleware Protection
The `middleware.js` file provides:
- Public route access for all visitors
- Authentication checks for user routes
- Role-based authorization for admin routes
- API route handling

### 2. Layout Isolation
Each route group has its own layout:
- **Public Layout**: Standard website layout with public navigation
- **Auth Layout**: Clean, focused layout for authentication forms
- **User Layout**: Dashboard layout with user-specific navigation
- **Admin Layout**: Professional admin interface with dark theme

### 3. Scalable Structure
- Route groups allow logical separation without affecting URL structure
- Easy to add new routes to appropriate groups
- Shared components in `components/` directory
- API routes organized by resource type

## Usage Examples

### Accessing Different Routes

1. **Public Route**: `http://localhost:3000/`
2. **Auth Route**: `http://localhost:3000/login`
3. **User Route**: `http://localhost:3000/user/dashboard`
4. **Admin Route**: `http://localhost:3000/admin/dashboard`

### Creating New Routes

1. **Add a new public page**:
   ```bash
   app/(public)/services/page.js
   ```

2. **Add a new user feature**:
   ```bash
   app/(user)/notifications/page.js
   ```

3. **Add a new admin section**:
   ```bash
   app/(admin)/marketing/page.js
   ```

### Authentication Flow

1. User visits `/login` (public route)
2. After successful login, redirected to `/user/dashboard`
3. Admin users can access `/admin/dashboard` with admin role
4. Unauthorized access to protected routes redirects to login

## Demo Credentials

For testing purposes:

- **User Login**: `user@example.com` / any password
- **Admin Login**: `admin@example.com` / any password

## Development Notes

1. The structure preserves existing files in the original `(user)` directory
2. New route groups are created alongside existing structure
3. Middleware handles authentication simulation for demo purposes
4. In production, integrate with real authentication system

## Next Steps for Production

1. Integrate with real authentication provider (Auth.js, Firebase, etc.)
2. Connect to database for user and car data
3. Implement proper API endpoints in `app/api/`
4. Add real authorization checks in middleware
5. Set up environment variables for configuration

This structure provides a solid foundation for building a scalable car dealership platform with clear separation of concerns and proper access control.