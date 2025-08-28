const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock transactions data
let transactions = [
  {
    id: 'txn-1',
    cardId: 'card-1',
    type: 'recharge',
    amount: 100.00,
    description: 'Card recharge',
    status: 'completed',
    timestamp: '2024-01-20T10:30:00.000Z',
    approvedBy: '2',
    reference: 'REF-001234'
  },
  {
    id: 'txn-2',
    cardId: 'card-1',
    type: 'purchase',
    amount: -12.99,
    description: 'Chicken Burger',
    status: 'completed',
    timestamp: '2024-01-20T12:15:00.000Z',
    mealId: '1',
    cashierId: '3',
    reference: 'PUR-001235'
  },
  {
    id: 'txn-3',
    cardId: 'card-1',
    type: 'purchase',
    amount: -15.99,
    description: 'Margherita Pizza',
    status: 'completed',
    timestamp: '2024-01-19T13:45:00.000Z',
    mealId: '2',
    cashierId: '3',
    reference: 'PUR-001236'
  },
  {
    id: 'txn-4',
    cardId: 'card-1',
    type: 'recharge',
    amount: 50.00,
    description: 'Card recharge',
    status: 'pending',
    timestamp: '2024-01-21T09:00:00.000Z',
    reference: 'REF-001237'
  }
];

// Get all transactions
router.get('/', (req, res) => {
  try {
    const { 
      type, 
      status, 
      cardId, 
      startDate, 
      endDate, 
      page = 1, 
      limit = 10,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;
    
    let filteredTransactions = transactions;

    // Filter by type
    if (type && type !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => t.type === type);
    }

    // Filter by status
    if (status && status !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => t.status === status);
    }

    // Filter by card ID
    if (cardId) {
      filteredTransactions = filteredTransactions.filter(t => t.cardId === cardId);
    }

    // Filter by date range
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.timestamp) <= new Date(endDate)
      );
    }

    // Sort transactions
    filteredTransactions.sort((a, b) => {
      const aValue = sortBy === 'amount' ? parseFloat(a[sortBy]) : a[sortBy];
      const bValue = sortBy === 'amount' ? parseFloat(b[sortBy]) : b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        transactions: paginatedTransactions,
        totalTransactions: filteredTransactions.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredTransactions.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get transaction by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const transaction = transactions.find(t => t.id === id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: { transaction }
    });

  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new transaction (purchase)
router.post('/', [
  body('cardId').notEmpty().withMessage('Card ID is required'),
  body('type').isIn(['recharge', 'purchase']).withMessage('Invalid transaction type'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('description').notEmpty().withMessage('Description is required')
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

    const { 
      cardId, 
      type, 
      amount, 
      description, 
      mealId, 
      cashierId 
    } = req.body;

    // Generate reference number
    const reference = `${type === 'recharge' ? 'REF' : 'PUR'}-${Date.now()}`;

    const newTransaction = {
      id: uuidv4(),
      cardId,
      type,
      amount: type === 'purchase' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      description,
      status: type === 'purchase' ? 'completed' : 'pending', // Purchases are instant, recharges need approval
      timestamp: new Date().toISOString(),
      reference,
      ...(mealId && { mealId }),
      ...(cashierId && { cashierId })
    };

    transactions.push(newTransaction);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: { transaction: newTransaction }
    });

  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update transaction status (for approvals)
router.put('/:id/status', [
  body('status').isIn(['pending', 'completed', 'rejected']).withMessage('Invalid status'),
  body('approvedBy').optional().notEmpty().withMessage('Approved by is required for completed status')
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
    const { status, approvedBy, notes } = req.body;

    const transactionIndex = transactions.findIndex(t => t.id === id);
    if (transactionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    const transaction = transactions[transactionIndex];

    // Only pending transactions can be updated
    if (transaction.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending transactions can be updated'
      });
    }

    transactions[transactionIndex] = {
      ...transaction,
      status,
      ...(approvedBy && { approvedBy }),
      ...(notes && { notes }),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Transaction status updated successfully',
      data: { transaction: transactions[transactionIndex] }
    });

  } catch (error) {
    console.error('Update transaction status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get transaction statistics
router.get('/stats/overview', (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let filteredTransactions = transactions;

    // Filter by date range if provided
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.timestamp) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.timestamp) <= new Date(endDate)
      );
    }

    const stats = {
      totalTransactions: filteredTransactions.length,
      completedTransactions: filteredTransactions.filter(t => t.status === 'completed').length,
      pendingTransactions: filteredTransactions.filter(t => t.status === 'pending').length,
      rejectedTransactions: filteredTransactions.filter(t => t.status === 'rejected').length,
      totalRevenue: filteredTransactions
        .filter(t => t.type === 'purchase' && t.status === 'completed')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
      totalRecharges: filteredTransactions
        .filter(t => t.type === 'recharge' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0),
      averageTransactionAmount: filteredTransactions.length > 0 
        ? filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / filteredTransactions.length
        : 0,
      transactionsByType: {
        purchase: filteredTransactions.filter(t => t.type === 'purchase').length,
        recharge: filteredTransactions.filter(t => t.type === 'recharge').length
      }
    };

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get daily transaction summary
router.get('/stats/daily', (req, res) => {
  try {
    const { days = 7 } = req.query;
    const dailyStats = [];

    for (let i = 0; i < parseInt(days); i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      const dayTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.timestamp).toISOString().split('T')[0];
        return transactionDate === dateString && t.status === 'completed';
      });

      const dayStats = {
        date: dateString,
        totalTransactions: dayTransactions.length,
        totalRevenue: dayTransactions
          .filter(t => t.type === 'purchase')
          .reduce((sum, t) => sum + Math.abs(t.amount), 0),
        totalRecharges: dayTransactions
          .filter(t => t.type === 'recharge')
          .reduce((sum, t) => sum + t.amount, 0)
      };

      dailyStats.unshift(dayStats);
    }

    res.json({
      success: true,
      data: { dailyStats }
    });

  } catch (error) {
    console.error('Get daily stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;