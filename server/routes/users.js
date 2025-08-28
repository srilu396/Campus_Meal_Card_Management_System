const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock users data
const users = [
  {
    id: '1',
    email: 'admin@university.edu',
    name: 'John Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00.000Z',
    isActive: true
  },
  {
    id: '2',
    email: 'manager@university.edu',
    name: 'Sarah Manager',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-02T00:00:00.000Z',
    isActive: true
  },
  {
    id: '3',
    email: 'cashier@university.edu',
    name: 'Mike Cashier',
    role: 'cashier',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-03T00:00:00.000Z',
    isActive: true
  },
  {
    id: '4',
    email: 'student@university.edu',
    name: 'Emma Student',
    role: 'student',
    studentId: 'STU001',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-04T00:00:00.000Z',
    isActive: true
  }
];

// Get all users
router.get('/', (req, res) => {
  try {
    const { role, search, page = 1, limit = 10 } = req.query;
    
    let filteredUsers = users;

    // Filter by role
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        (user.studentId && user.studentId.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        totalUsers: filteredUsers.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredUsers.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2 }),
  body('email').optional().isEmail().normalizeEmail(),
  body('role').optional().isIn(['admin', 'manager', 'cashier', 'student'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updateData = req.body;

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user: users[userIndex] }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user statistics
router.get('/stats/overview', (req, res) => {
  try {
    const stats = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      roleBreakdown: {
        admin: users.filter(u => u.role === 'admin').length,
        manager: users.filter(u => u.role === 'manager').length,
        cashier: users.filter(u => u.role === 'cashier').length,
        student: users.filter(u => u.role === 'student').length
      },
      newUsersThisWeek: users.filter(u => {
        const userDate = new Date(u.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return userDate >= weekAgo;
      }).length
    };

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;