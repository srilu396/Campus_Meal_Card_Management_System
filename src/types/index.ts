export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'cashier' | 'student';
  avatar?: string;
  studentId?: string;
}

export interface MealCard {
  id: string;
  studentId: string;
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  issuedDate: string;
  expiryDate: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  type: 'recharge' | 'purchase';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'rejected';
  timestamp: string;
  approvedBy?: string;
  mealId?: string;
}

export interface Meal {
  id: string;
  name: string;
  price: number;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  image: string;
  description: string;
  available: boolean;
  ingredients: string[];
}

export interface RechargeRequest {
  id: string;
  studentId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  approvedBy?: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalBalance: number;
  todayTransactions: number;
  weeklyRevenue: number;
  popularMeals: Array<{ name: string; count: number }>;
}