const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock database (replace with actual database in production)
const users = [
  {
    id: '1',
    email: 'admin@university.edu',
    password: '$2a$10$rQ8K5O/fKx8KFXq9L1YQb.3VXnFd8EHcKXx.9P3QzGFkV8mH5vGIa', // admin123
    name: 'John Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    email: 'manager@university.edu',
    password: '$2a$10$rQ8K5O/fKx8KFXq9L1YQb.3VXnFd8EHcKXx.9P3QzGFkV8mH5vGIa', // manager123
    name: 'Sarah Manager',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    email: 'cashier@university.edu',
    password: '$2a$10$rQ8K5O/fKx8KFXq9L1YQb.3VXnFd8EHcKXx.9P3QzGFkV8mH5vGIa', // cashier123
    name: 'Mike Cashier',
    role: 'cashier',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    email: 'student@university.edu',
    password: '$2a$10$rQ8K5O/fKx8KFXq9L1YQb.3VXnFd8EHcKXx.9P3QzGFkV8mH5vGIa', // student123
    name: 'Emma Student',
    role: 'student',
    studentId: 'STU001',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'campus_meal_card_secret_key',
      { expiresIn: '24h' }
    );

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Register endpoint (for adding new users)
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 }),
  body('role').isIn(['admin', 'manager', 'cashier', 'student'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { email, password, name, role, studentId } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      email,
      password: hashedPassword,
      name,
      role,
      ...(role === 'student' && { studentId }),
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150`
    };

    users.push(newUser);

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;