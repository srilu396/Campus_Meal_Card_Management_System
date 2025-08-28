const express = require('express');
const router = express.Router();

// Mock data for dashboard statistics
const getDashboardStats = () => {
  return {
    totalStudents: 1250,
    activeCards: 1180,
    totalBalance: 125000.00,
    todayTransactions: 342,
    weeklyRevenue: 15750.00,
    monthlyRevenue: 68500.00,
    pendingRecharges: 23,
    popularMeals: [
      { name: 'Chicken Burger', count: 156, revenue: 2023.44 },
      { name: 'Margherita Pizza', count: 134, revenue: 2142.66 },
      { name: 'Caesar Salad', count: 98, revenue: 979.02 },
      { name: 'Pancakes', count: 87, revenue: 782.13 }
    ],
    recentTransactions: [
      {
        id: 'txn-001',
        type: 'purchase',
        amount: 12.99,
        description: 'Chicken Burger',
        studentId: 'STU001',
        timestamp: new Date().toISOString()
      },
      {
        id: 'txn-002',
        type: 'recharge',
        amount: 50.00,
        description: 'Card Recharge',
        studentId: 'STU002',
        status: 'pending',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ],
    weeklyTransactionData: [
      { day: 'Monday', transactions: 45, revenue: 680.50 },
      { day: 'Tuesday', transactions: 38, revenue: 567.80 },
      { day: 'Wednesday', transactions: 52, revenue: 789.60 },
      { day: 'Thursday', transactions: 41, revenue: 612.30 },
      { day: 'Friday', transactions: 67, revenue: 1045.20 },
      { day: 'Saturday', transactions: 28, revenue: 420.40 },
      { day: 'Sunday', transactions: 34, revenue: 501.80 }
    ]
  };
};

// Admin dashboard overview
router.get('/admin', (req, res) => {
  try {
    const stats = getDashboardStats();
    
    const adminDashboard = {
      ...stats,
      systemHealth: {
        uptime: '99.9%',
        lastBackup: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
        activeConnections: 1245,
        serverLoad: '2.3%'
      },
      userActivity: {
        newUsersToday: 15,
        activeUsersNow: 180,
        peakHourTransactions: 89,
        averageSessionTime: '12 min'
      }
    };

    res.json({
      success: true,
      data: { dashboard: adminDashboard }
    });

  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Manager dashboard overview
router.get('/manager', (req, res) => {
  try {
    const stats = getDashboardStats();
    
    const managerDashboard = {
      pendingRecharges: stats.pendingRecharges,
      todayTransactions: stats.todayTransactions,
      weeklyRevenue: stats.weeklyRevenue,
      activeCards: stats.activeCards,
      rechargeRequests: [
        {
          id: 'req-001',
          studentId: 'STU001',
          studentName: 'John Doe',
          amount: 75.00,
          timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
          status: 'pending'
        },
        {
          id: 'req-002',
          studentId: 'STU003',
          studentName: 'Alice Smith',
          amount: 100.00,
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          status: 'pending'
        }
      ],
      studentActivity: {
        newRegistrations: 8,
        cardIssuesResolved: 3,
        averageBalance: 125.50,
        topSpenders: [
          { studentId: 'STU012', name: 'Mike Johnson', spent: 245.50 },
          { studentId: 'STU034', name: 'Sarah Wilson', spent: 198.30 },
          { studentId: 'STU056', name: 'Tom Brown', spent: 187.20 }
        ]
      }
    };

    res.json({
      success: true,
      data: { dashboard: managerDashboard }
    });

  } catch (error) {
    console.error('Get manager dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Cashier dashboard overview
router.get('/cashier', (req, res) => {
  try {
    const stats = getDashboardStats();
    
    const cashierDashboard = {
      todayOrders: 156,
      todayRevenue: 2340.50,
      averageOrderValue: 15.20,
      queueTime: '2.5 min',
      popularItems: stats.popularMeals.slice(0, 3),
      recentOrders: [
        {
          orderId: 'ORD-001',
          studentId: 'STU001',
          items: ['Chicken Burger', 'Fries'],
          total: 18.50,
          timestamp: new Date(Date.now() - 300000).toISOString() // 5 min ago
        },
        {
          orderId: 'ORD-002',
          studentId: 'STU002',
          items: ['Caesar Salad'],
          total: 9.99,
          timestamp: new Date(Date.now() - 600000).toISOString() // 10 min ago
        }
      ],
      mealAvailability: [
        { name: 'Chicken Burger', available: true, remaining: 15 },
        { name: 'Margherita Pizza', available: true, remaining: 8 },
        { name: 'Caesar Salad', available: true, remaining: 22 },
        { name: 'Grilled Salmon', available: false, remaining: 0 }
      ]
    };

    res.json({
      success: true,
      data: { dashboard: cashierDashboard }
    });

  } catch (error) {
    console.error('Get cashier dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Student dashboard overview
router.get('/student/:studentId', (req, res) => {
  try {
    const { studentId } = req.params;
    
    // Mock student-specific data
    const studentDashboard = {
      cardBalance: 150.75,
      cardStatus: 'active',
      cardNumber: 'MC001234567890',
      expiryDate: '2024-12-31',
      recentTransactions: [
        {
          id: 'txn-student-001',
          type: 'purchase',
          amount: -12.99,
          description: 'Chicken Burger',
          timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          location: 'Main Cafeteria'
        },
        {
          id: 'txn-student-002',
          type: 'recharge',
          amount: 100.00,
          description: 'Card Recharge',
          status: 'completed',
          timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: 'txn-student-003',
          type: 'purchase',
          amount: -15.99,
          description: 'Margherita Pizza',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          location: 'Food Court'
        }
      ],
      weeklySpending: {
        current: 45.97,
        previous: 62.30,
        budget: 100.00
      },
      favoriteItems: [
        { name: 'Chicken Burger', orders: 8, lastOrdered: '2 hours ago' },
        { name: 'Caesar Salad', orders: 6, lastOrdered: '3 days ago' },
        { name: 'Pancakes', orders: 4, lastOrdered: '1 week ago' }
      ],
      pendingRecharge: {
        amount: 75.00,
        status: 'pending',
        requestedAt: new Date(Date.now() - 1800000).toISOString() // 30 min ago
      }
    };

    res.json({
      success: true,
      data: { dashboard: studentDashboard }
    });

  } catch (error) {
    console.error('Get student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get real-time statistics
router.get('/realtime', (req, res) => {
  try {
    const realtimeData = {
      activeUsers: Math.floor(Math.random() * 200) + 100,
      transactionsPerMinute: Math.floor(Math.random() * 10) + 5,
      systemLoad: (Math.random() * 5 + 1).toFixed(1) + '%',
      responseTime: Math.floor(Math.random() * 100) + 50 + 'ms',
      queueLength: Math.floor(Math.random() * 15),
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: { realtime: realtimeData }
    });

  } catch (error) {
    console.error('Get realtime data error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;