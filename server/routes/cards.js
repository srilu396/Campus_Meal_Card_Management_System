const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock meal cards data
let mealCards = [
  {
    id: 'card-1',
    studentId: '4',
    cardNumber: 'MC001234567890',
    balance: 150.75,
    status: 'active',
    issuedDate: '2024-01-15T00:00:00.000Z',
    expiryDate: '2024-12-31T23:59:59.000Z',
    lastUsed: '2024-01-20T12:15:00.000Z'
  },
  {
    id: 'card-2',
    studentId: '5',
    cardNumber: 'MC001234567891',
    balance: 89.50,
    status: 'active',
    issuedDate: '2024-01-10T00:00:00.000Z',
    expiryDate: '2024-12-31T23:59:59.000Z',
    lastUsed: '2024-01-19T18:30:00.000Z'
  }
];

// Get all meal cards
router.get('/', (req, res) => {
  try {
    const { status, studentId, page = 1, limit = 10 } = req.query;
    
    let filteredCards = mealCards;

    // Filter by status
    if (status && status !== 'all') {
      filteredCards = filteredCards.filter(card => card.status === status);
    }

    // Filter by student ID
    if (studentId) {
      filteredCards = filteredCards.filter(card => card.studentId === studentId);
    }

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedCards = filteredCards.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        cards: paginatedCards,
        totalCards: filteredCards.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredCards.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get card by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const card = mealCards.find(c => c.id === id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Meal card not found'
      });
    }

    res.json({
      success: true,
      data: { card }
    });

  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new meal card
router.post('/', [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('initialBalance').optional().isNumeric().withMessage('Initial balance must be a number')
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

    const { studentId, initialBalance = 0 } = req.body;

    // Check if student already has an active card
    const existingCard = mealCards.find(c => c.studentId === studentId && c.status === 'active');
    if (existingCard) {
      return res.status(409).json({
        success: false,
        message: 'Student already has an active meal card'
      });
    }

    // Generate card number
    const cardNumber = `MC${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const newCard = {
      id: uuidv4(),
      studentId,
      cardNumber,
      balance: parseFloat(initialBalance),
      status: 'active',
      issuedDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      lastUsed: null
    };

    mealCards.push(newCard);

    res.status(201).json({
      success: true,
      message: 'Meal card created successfully',
      data: { card: newCard }
    });

  } catch (error) {
    console.error('Create card error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update card balance
router.put('/:id/balance', [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('type').isIn(['add', 'deduct']).withMessage('Type must be either add or deduct')
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
    const { amount, type } = req.body;

    const cardIndex = mealCards.findIndex(c => c.id === id);
    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Meal card not found'
      });
    }

    const card = mealCards[cardIndex];

    // Check if card is active
    if (card.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify balance of inactive card'
      });
    }

    // Calculate new balance
    const newBalance = type === 'add' 
      ? card.balance + parseFloat(amount)
      : card.balance - parseFloat(amount);

    // Check for insufficient funds
    if (newBalance < 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Update card balance
    mealCards[cardIndex] = {
      ...card,
      balance: newBalance,
      lastUsed: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Balance updated successfully',
      data: { 
        card: mealCards[cardIndex],
        previousBalance: card.balance,
        newBalance: newBalance
      }
    });

  } catch (error) {
    console.error('Update balance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update card status
router.put('/:id/status', [
  body('status').isIn(['active', 'blocked', 'expired']).withMessage('Invalid status')
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
    const { status } = req.body;

    const cardIndex = mealCards.findIndex(c => c.id === id);
    if (cardIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Meal card not found'
      });
    }

    mealCards[cardIndex] = {
      ...mealCards[cardIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Card status updated successfully',
      data: { card: mealCards[cardIndex] }
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get card statistics
router.get('/stats/overview', (req, res) => {
  try {
    const stats = {
      totalCards: mealCards.length,
      activeCards: mealCards.filter(c => c.status === 'active').length,
      blockedCards: mealCards.filter(c => c.status === 'blocked').length,
      expiredCards: mealCards.filter(c => c.status === 'expired').length,
      totalBalance: mealCards.reduce((sum, card) => sum + card.balance, 0),
      averageBalance: mealCards.length > 0 
        ? mealCards.reduce((sum, card) => sum + card.balance, 0) / mealCards.length 
        : 0
    };

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get card stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;