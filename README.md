<img width="1895" height="914" alt="Screenshot 2025-08-28 225650" src="https://github.com/user-attachments/assets/23e17d64-3432-4ec0-a123-94765f1824ee" /># 🍽️ Campus Meal Card Management System

A comprehensive digital meal card management system for university campuses, built with React, Node.js, and modern web technologies.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)
- [Future Enhancements](#future-enhancements)

## 🎯 Overview

The Campus Meal Card Management System transforms traditional cash-based cafeteria transactions into a modern, digital experience. Students receive meal cards that can be recharged and used for purchases, while different user roles (Admin, Manager, Cashier, Student) have tailored dashboards for their specific needs.

![Uploading Screenshot 2025-08-28 225650.png…]()


## ✨ Features

### 🎓 Student Features
- **Digital Meal Card**: View balance, transaction history, and card status
- **Easy Recharge**: Request card recharges with multiple payment options
- **QR Code Payments**: Quick payments via QR code scanning
- **Transaction History**: Detailed view of all purchases and recharges
- **Spending Analytics**: Weekly spending trends and favorite meals

### 💰 Cashier Features
- **Point of Sale**: Quick meal selection and payment processing
- **Menu Management**: View available meals with real-time inventory
- **Transaction Processing**: Handle purchases with balance validation
- **Daily Statistics**: Track orders, revenue, and popular items
- **QR Code Scanner**: Process payments via student QR codes

### 📊 Manager Features
- **Recharge Approval**: Approve or reject student recharge requests
- **Student Oversight**: Monitor student activity and spending patterns
- **Analytics Dashboard**: View comprehensive transaction analytics
- **Report Generation**: Create weekly and monthly reports
- **Request Management**: Efficient handling of pending requests

### 👑 Admin Features
- **System Overview**: Complete system statistics and health monitoring
- **User Management**: Create, edit, and manage all user accounts
- **Advanced Analytics**: Deep insights into system performance
- **Role-Based Access**: Manage permissions for different user types
- **System Configuration**: Configure system settings and parameters

### 🎨 Design Features
- **Modern UI/UX**: Apple-level design aesthetics with attention to detail
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations and micro-interactions
- **Beautiful Backgrounds**: Animated backgrounds with floating elements
- **Food Imagery**: High-quality food photos from Pexels
- **Intuitive Navigation**: Clear visual hierarchy and user-friendly interfaces

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Recharts** for data visualization

### Backend
- **Node.js** with Express.js
- **JWT** for authentication
- **BCrypt** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate Limiting** for API protection

### Development Tools
- **Vite** for fast development
- **ESLint** for code linting
- **TypeScript** for type safety
- **Nodemon** for development server

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'cashier', 'student') NOT NULL,
  student_id VARCHAR(50), -- Only for students
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meal Cards Table
```sql
CREATE TABLE meal_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id),
  card_number VARCHAR(50) UNIQUE NOT NULL,
  balance DECIMAL(10,2) DEFAULT 0.00,
  status ENUM('active', 'blocked', 'expired') DEFAULT 'active',
  issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP NOT NULL,
  last_used TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID REFERENCES meal_cards(id),
  type ENUM('recharge', 'purchase') NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('pending', 'completed', 'rejected') DEFAULT 'pending',
  meal_id UUID REFERENCES meals(id), -- For purchases
  cashier_id UUID REFERENCES users(id), -- For purchases
  approved_by UUID REFERENCES users(id), -- For recharges
  reference_number VARCHAR(100) UNIQUE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meals Table
```sql
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  category ENUM('breakfast', 'lunch', 'dinner', 'snacks') NOT NULL,
  image_url TEXT,
  ingredients TEXT[], -- JSON array
  nutritional_info JSONB, -- Calories, protein, carbs, fat
  allergens TEXT[], -- JSON array
  preparation_time INTEGER, -- minutes
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Recharge Requests Table
```sql
CREATE TABLE recharge_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  approved_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-meal-card-system
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp server/.env.example server/.env
   # Edit the .env file with your configuration
   ```

5. **Start the development servers**
   
   **Frontend** (in root directory):
   ```bash
   npm run dev
   ```
   
   **Backend** (in server directory):
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api/health

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@university.edu | admin123 |
| Manager | manager@university.edu | manager123 |
| Cashier | cashier@university.edu | cashier123 |
| Student | student@university.edu | student123 |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (with filtering)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

### Meal Cards
- `GET /api/cards` - Get all meal cards
- `GET /api/cards/:id` - Get card by ID
- `POST /api/cards` - Create new meal card
- `PUT /api/cards/:id/balance` - Update card balance
- `PUT /api/cards/:id/status` - Update card status
- `GET /api/cards/stats/overview` - Get card statistics

### Transactions
- `GET /api/transactions` - Get all transactions (with filtering)
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id/status` - Update transaction status
- `GET /api/transactions/stats/overview` - Get transaction statistics
- `GET /api/transactions/stats/daily` - Get daily transaction summary

### Meals
- `GET /api/meals` - Get all meals (with filtering)
- `GET /api/meals/:id` - Get meal by ID
- `POST /api/meals` - Create new meal
- `PUT /api/meals/:id` - Update meal
- `DELETE /api/meals/:id` - Delete meal
- `PUT /api/meals/:id/availability` - Toggle meal availability
- `GET /api/meals/stats/overview` - Get meal statistics
- `GET /api/meals/stats/popular` - Get popular meals

### Dashboard
- `GET /api/dashboard/admin` - Admin dashboard data
- `GET /api/dashboard/manager` - Manager dashboard data
- `GET /api/dashboard/cashier` - Cashier dashboard data
- `GET /api/dashboard/student/:id` - Student dashboard data
- `GET /api/dashboard/realtime` - Real-time statistics

## 🎨 Design Decisions

### 1. **Data Modeling Choices**

**Users Table**: 
- Single table for all user types with a `role` field for simplicity
- `student_id` field only populated for students
- Separate avatar storage for personalization

**Meal Cards**: 
- One-to-one relationship with students
- Unique card numbers for physical card integration
- Status tracking for card lifecycle management

**Transactions**: 
- Single table for both recharges and purchases
- Positive amounts for recharges, negative for purchases
- Reference numbers for audit trails and reconciliation

### 2. **Business Rules Implementation**

**Recharge Workflow**:
- Students request recharges (creates pending transaction)
- Managers approve/reject requests
- Approved recharges update card balance automatically
- **Reasoning**: Provides oversight and prevents unauthorized recharges

**Transaction Processing**:
- Purchases are processed immediately (completed status)
- Balance validation prevents insufficient fund transactions
- Atomic operations ensure data consistency
- **Reasoning**: Reduces wait times during meal rush hours

**Double Transaction Prevention**:
- Unique reference numbers for each transaction
- Database constraints prevent duplicate entries
- Optimistic locking for concurrent balance updates
- **Reasoning**: Ensures financial accuracy and prevents fraud

### 3. **User Interface Design**

**Role-Based Dashboards**:
- Admin: System-wide analytics and user management
- Manager: Recharge approvals and student oversight
- Cashier: Streamlined POS interface for quick transactions
- Student: Personal card management and transaction history
- **Reasoning**: Each role sees only relevant information, reducing cognitive load

**Mobile-First Design**:
- Responsive layouts for all screen sizes
- Touch-friendly buttons and navigation
- Quick actions prominently displayed
- **Reasoning**: Many users will access via mobile devices

### 4. **Security Implementation**

**Authentication & Authorization**:
- JWT tokens for stateless authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Rate limiting on all endpoints
- **Reasoning**: Balances security with user experience

**Data Protection**:
- Input validation on all API endpoints
- SQL injection prevention through parameterized queries
- XSS protection via content security policies
- **Reasoning**: Protects sensitive financial and personal data

## 🔮 Future Enhancements

### Phase 1 (Short-term)
- [ ] **Real Payment Integration**: Stripe/PayPal for actual card recharges
- [ ] **Email Notifications**: Transaction confirmations and balance alerts
- [ ] **Receipt Generation**: PDF receipts for transactions
- [ ] **Mobile App**: Native iOS/Android applications
- [ ] **Meal Scheduling**: Pre-order meals for specific times

### Phase 2 (Medium-term)
- [ ] **Advanced Analytics**: Machine learning for spending predictions
- [ ] **Loyalty Program**: Points and rewards system
- [ ] **Inventory Management**: Real-time ingredient tracking
- [ ] **Multi-Location Support**: Support for multiple dining locations
- [ ] **Offline Mode**: Offline transaction processing

### Phase 3 (Long-term)
- [ ] **Biometric Authentication**: Fingerprint/face recognition
- [ ] **IoT Integration**: Smart card readers and dispensers
- [ ] **Nutritional Tracking**: Personal health and nutrition monitoring
- [ ] **Social Features**: Meal sharing and recommendations
- [ ] **Advanced Reporting**: Custom report builder with exports

## 🤝 Contributing

We welcome contributions to improve the Campus Meal Card Management System!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration provided
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React, TypeScript, UI/UX Design
- **Backend Developer**: Node.js, API Design, Database Architecture
- **DevOps Engineer**: Deployment, CI/CD, Infrastructure
- **Product Manager**: Requirements, Testing, Documentation

## 📞 Support

For support, email support@campuscard.edu or create an issue in the GitHub repository.

---

**Built with ❤️ for modern campus dining experiences**
