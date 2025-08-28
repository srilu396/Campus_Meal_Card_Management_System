import { User, MealCard, Transaction, Meal, RechargeRequest, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@university.edu',
    name: 'John Administrator',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    email: 'manager@university.edu',
    name: 'Sarah Manager',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '3',
    email: 'cashier@university.edu',
    name: 'Mike Cashier',
    role: 'cashier',
    avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '4',
    email: 'student@university.edu',
    name: 'Emma Student',
    role: 'student',
    studentId: 'STU001',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Chicken Burger',
    price: 12.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Juicy grilled chicken with fresh lettuce and tomatoes',
    available: true,
    ingredients: ['Chicken breast', 'Lettuce', 'Tomato', 'Cheese', 'Mayo']
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: 15.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Classic pizza with fresh mozzarella and basil',
    available: true,
    ingredients: ['Dough', 'Mozzarella', 'Tomato sauce', 'Basil']
  },
  {
    id: '3',
    name: 'Caesar Salad',
    price: 9.99,
    category: 'lunch',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh romaine lettuce with caesar dressing and croutons',
    available: true,
    ingredients: ['Romaine lettuce', 'Croutons', 'Parmesan', 'Caesar dressing']
  },
  {
    id: '4',
    name: 'Pancakes',
    price: 8.99,
    category: 'breakfast',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fluffy pancakes with maple syrup and butter',
    available: true,
    ingredients: ['Flour', 'Eggs', 'Milk', 'Maple syrup', 'Butter']
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    price: 18.99,
    category: 'dinner',
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh Atlantic salmon with herbs and vegetables',
    available: true,
    ingredients: ['Salmon fillet', 'Herbs', 'Vegetables', 'Lemon']
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    price: 6.99,
    category: 'snacks',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Rich chocolate cake with cream frosting',
    available: true,
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Cream', 'Sugar']
  }
];

export const mockMealCards: MealCard[] = [
  {
    id: 'card-1',
    studentId: '4',
    balance: 150.75,
    status: 'active',
    issuedDate: '2024-01-15',
    expiryDate: '2024-12-31'
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    cardId: 'card-1',
    type: 'recharge',
    amount: 100.00,
    description: 'Card recharge',
    status: 'completed',
    timestamp: '2024-01-20T10:30:00Z',
    approvedBy: '2'
  },
  {
    id: 'txn-2',
    cardId: 'card-1',
    type: 'purchase',
    amount: -12.99,
    description: 'Chicken Burger',
    status: 'completed',
    timestamp: '2024-01-20T12:15:00Z',
    mealId: '1'
  },
  {
    id: 'txn-3',
    cardId: 'card-1',
    type: 'purchase',
    amount: -15.99,
    description: 'Margherita Pizza',
    status: 'completed',
    timestamp: '2024-01-19T13:45:00Z',
    mealId: '2'
  }
];

export const mockRechargeRequests: RechargeRequest[] = [
  {
    id: 'req-1',
    studentId: '4',
    amount: 75.00,
    status: 'pending',
    timestamp: '2024-01-21T09:00:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: 1250,
  totalBalance: 125000.00,
  todayTransactions: 342,
  weeklyRevenue: 15750.00,
  popularMeals: [
    { name: 'Chicken Burger', count: 156 },
    { name: 'Margherita Pizza', count: 134 },
    { name: 'Caesar Salad', count: 98 },
    { name: 'Pancakes', count: 87 }
  ]
};