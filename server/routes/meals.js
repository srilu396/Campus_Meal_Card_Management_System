const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock meals data
let meals = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: 12.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Juicy grilled chicken with fresh lettuce and tomatoes',
    available: true,
    ingredients: ['Chicken breast', 'Lettuce', 'Tomato', 'Cheese', 'Mayo'],
    nutritionalInfo: {
      calories: 520,
      protein: 35,
      carbs: 42,
      fat: 22
    },
    preparationTime: 8,
    allergens: ['Gluten', 'Dairy'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 15.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic pizza with fresh mozzarella and basil',
    available: true,
    ingredients: ['Dough', 'Mozzarella', 'Tomato sauce', 'Basil'],
    nutritionalInfo: {
      calories: 680,
      protein: 28,
      carbs: 72,
      fat: 32
    },
    preparationTime: 12,
    allergens: ['Gluten', 'Dairy'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 9.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh romaine lettuce with caesar dressing and croutons',
    available: true,
    ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan', 'Caesar dressing'],
    nutritionalInfo: {
      calories: 320,
      protein: 12,
      carbs: 18,
      fat: 24
    },
    preparationTime: 5,
    allergens: ['Dairy', 'Eggs'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Pancakes',
    price: 8.99,
    category: 'breakfast',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fluffy pancakes with maple syrup and butter',
    available: true,
    ingredients: ['Flour', 'Eggs', 'Milk', 'Maple syrup', 'Butter'],
    nutritionalInfo: {
      calories: 450,
      protein: 12,
      carbs: 68,
      fat: 16
    },
    preparationTime: 6,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    price: 18.99,
    category: 'dinner',
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh Atlantic salmon with herbs and vegetables',
    available: true,
    ingredients: ['Salmon fillet', 'Herbs', 'Vegetables', 'Lemon'],
    nutritionalInfo: {
      calories: 380,
      protein: 42,
      carbs: 8,
      fat: 20
    },
    preparationTime: 15,
    allergens: ['Fish'],
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Rich chocolate cake with cream frosting',
    available: true,
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Cream', 'Sugar'],
    nutritionalInfo: {
      calories: 420,
      protein: 6,
      carbs: 58,
      fat: 20
    },
    preparationTime: 3,
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    createdAt: '2024-01-01T00:00:00.000Z'
  }
];

// Get all meals
router.get('/', (req, res) => {
  try {
    const { 
      category, 
      available, 
      search, 
      minPrice, 
      maxPrice,
      page = 1, 
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;
    
    let filteredMeals = meals;

    // Filter by category
    if (category && category !== 'all') {
      filteredMeals = filteredMeals.filter(meal => meal.category === category);
    }

    // Filter by availability
    if (available !== undefined) {
      filteredMeals = filteredMeals.filter(meal => meal.available === (available === 'true'));
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      filteredMeals = filteredMeals.filter(meal => 
        meal.name.toLowerCase().includes(searchLower) ||
        meal.description.toLowerCase().includes(searchLower) ||
        meal.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchLower))
      );
    }

    // Filter by price range
    if (minPrice) {
      filteredMeals = filteredMeals.filter(meal => meal.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filteredMeals = filteredMeals.filter(meal => meal.price <= parseFloat(maxPrice));
    }

    // Sort meals
    filteredMeals.sort((a, b) => {
      const aValue = sortBy === 'price' ? parseFloat(a[sortBy]) : a[sortBy];
      const bValue = sortBy === 'price' ? parseFloat(b[sortBy]) : b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedMeals = filteredMeals.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        meals: paginatedMeals,
        totalMeals: filteredMeals.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredMeals.length / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Get meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get meal by ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const meal = meals.find(m => m.id === id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    res.json({
      success: true,
      data: { meal }
    });

  } catch (error) {
    console.error('Get meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new meal
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').isIn(['breakfast', 'lunch', 'dinner', 'snacks']).withMessage('Invalid category'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('ingredients').isArray({ min: 1 }).withMessage('At least one ingredient is required')
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

    const mealData = req.body;

    const newMeal = {
      id: uuidv4(),
      ...mealData,
      price: parseFloat(mealData.price),
      available: mealData.available !== undefined ? mealData.available : true,
      createdAt: new Date().toISOString()
    };

    meals.push(newMeal);

    res.status(201).json({
      success: true,
      message: 'Meal created successfully',
      data: { meal: newMeal }
    });

  } catch (error) {
    console.error('Create meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update meal
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 2 }),
  body('price').optional().isNumeric(),
  body('category').optional().isIn(['breakfast', 'lunch', 'dinner', 'snacks']),
  body('description').optional().trim().isLength({ min: 10 })
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

    const mealIndex = meals.findIndex(m => m.id === id);
    if (mealIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    // Update meal data
    meals[mealIndex] = {
      ...meals[mealIndex],
      ...updateData,
      ...(updateData.price && { price: parseFloat(updateData.price) }),
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Meal updated successfully',
      data: { meal: meals[mealIndex] }
    });

  } catch (error) {
    console.error('Update meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete meal
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const mealIndex = meals.findIndex(m => m.id === id);

    if (mealIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    meals.splice(mealIndex, 1);

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });

  } catch (error) {
    console.error('Delete meal error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Toggle meal availability
router.put('/:id/availability', (req, res) => {
  try {
    const { id } = req.params;
    const mealIndex = meals.findIndex(m => m.id === id);

    if (mealIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    meals[mealIndex] = {
      ...meals[mealIndex],
      available: !meals[mealIndex].available,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: `Meal ${meals[mealIndex].available ? 'enabled' : 'disabled'} successfully`,
      data: { meal: meals[mealIndex] }
    });

  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get meal statistics
router.get('/stats/overview', (req, res) => {
  try {
    const categories = ['breakfast', 'lunch', 'dinner', 'snacks'];
    
    const stats = {
      totalMeals: meals.length,
      availableMeals: meals.filter(m => m.available).length,
      unavailableMeals: meals.filter(m => !m.available).length,
      categoryBreakdown: categories.reduce((acc, category) => {
        acc[category] = meals.filter(m => m.category === category).length;
        return acc;
      }, {}),
      priceRange: {
        min: Math.min(...meals.map(m => m.price)),
        max: Math.max(...meals.map(m => m.price)),
        average: meals.reduce((sum, m) => sum + m.price, 0) / meals.length
      },
      mostExpensive: meals.reduce((max, meal) => meal.price > max.price ? meal : max),
      leastExpensive: meals.reduce((min, meal) => meal.price < min.price ? meal : min)
    };

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get meal stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get popular meals (based on mock data)
router.get('/stats/popular', (req, res) => {
  try {
    // This would typically come from transaction data
    const popularMeals = [
      { mealId: '1', name: 'Chicken Burger', orderCount: 156, revenue: 2023.44 },
      { mealId: '2', name: 'Margherita Pizza', orderCount: 134, revenue: 2142.66 },
      { mealId: '3', name: 'Caesar Salad', orderCount: 98, revenue: 979.02 },
      { mealId: '4', name: 'Pancakes', orderCount: 87, revenue: 782.13 },
      { mealId: '5', name: 'Grilled Salmon', orderCount: 65, revenue: 1234.35 },
      { mealId: '6', name: 'Chocolate Cake', orderCount: 78, revenue: 545.22 }
    ];

    res.json({
      success: true,
      data: { popularMeals }
    });

  } catch (error) {
    console.error('Get popular meals error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;