import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Activity,
  UserPlus,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  Shield,
  Lock,
  CreditCardIcon,
  Receipt,
  X,
  Save,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import StatsCard from '../common/StatsCard';
import TransactionChart from '../common/TransactionChart';
import UserManagement from '../common/UserManagement';
import RevenueChart from '../common/RevenueChart';
import { mockDashboardStats, mockTransactions, mockUsers } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeframe, setTimeframe] = useState('weekly');
  const [paymentSettingsOpen, setPaymentSettingsOpen] = useState(false);
  const [securitySettingsOpen, setSecuritySettingsOpen] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTabScrollPosition, setMobileTabScrollPosition] = useState(0);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
    confirmPassword: ''
  });

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const stats = [
    {
      title: 'Total Students',
      value: mockDashboardStats.totalStudents.toLocaleString(),
      change: '+12%',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Balance',
      value: `$${mockDashboardStats.totalBalance.toLocaleString()}`,
      change: '+8%',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Today\'s Transactions',
      value: mockDashboardStats.todayTransactions.toLocaleString(),
      change: '+15%',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      title: timeframe === 'weekly' ? 'Weekly Revenue' : 'Monthly Revenue',
      value: `$${mockDashboardStats.weeklyRevenue.toLocaleString()}`,
      change: timeframe === 'weekly' ? '+22%' : '+18%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  // Mobile tab navigation handlers
  const scrollTabs = (direction: 'left' | 'right') => {
    const tabContainer = document.getElementById('mobile-tab-container');
    if (!tabContainer) return;
    
    const scrollAmount = 200;
    const newPosition = direction === 'right' 
      ? mobileTabScrollPosition + scrollAmount
      : mobileTabScrollPosition - scrollAmount;
    
    tabContainer.scrollTo({ left: newPosition, behavior: 'smooth' });
    setMobileTabScrollPosition(newPosition);
  };

  // Payment Settings Configuration
  const handleConfigurePayment = () => {
    setPaymentSettingsOpen(true);
    setSecuritySettingsOpen(false);
    setAddUserOpen(false);
  };

  const handleSavePaymentSettings = () => {
    // Here you would typically save the settings to your backend
    alert('Payment settings saved successfully!');
    setPaymentSettingsOpen(false);
  };

  // Security Settings Configuration
  const handleManageSecurity = () => {
    setSecuritySettingsOpen(true);
    setPaymentSettingsOpen(false);
    setAddUserOpen(false);
  };

  const handleSaveSecuritySettings = () => {
    // Here you would typically save the settings to your backend
    alert('Security settings saved successfully!');
    setSecuritySettingsOpen(false);
  };

  // Add New User functionality
  const handleAddNewUser = () => {
    setAddUserOpen(true);
    setPaymentSettingsOpen(false);
    setSecuritySettingsOpen(false);
    // Switch to settings tab where the add user form is located
    setActiveTab('settings');
  };

  const handleSaveNewUser = () => {
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Validate all fields are filled
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all required fields!");
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Adding new user:", newUser);
    alert(`User ${newUser.name} added successfully!`);
    
    // Reset form and close dialog
    setNewUser({
      name: '',
      email: '',
      role: 'student',
      password: '',
      confirmPassword: ''
    });
    setAddUserOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StatsCard {...stat} />
                </motion.div>
              ))}
            </div>

            {/* Timeframe Selector */}
            <div className="bg-white rounded-xl shadow-lg p-4 flex justify-end">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Timeframe:</span>
                <select 
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {timeframe === 'weekly' ? 'Weekly Transactions' : 'Monthly Transactions'}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">+15%</span>
                    <span className="ml-1">from last period</span>
                  </div>
                </div>
                <TransactionChart timeframe={timeframe} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {timeframe === 'weekly' ? 'Weekly Revenue' : 'Monthly Revenue'}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">+22%</span>
                    <span className="ml-1">from last period</span>
                  </div>
                </div>
                <RevenueChart timeframe={timeframe} />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                🍔 Popular Meals This Week
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockDashboardStats.popularMeals.map((meal, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800">{meal.name}</h4>
                    <p className="text-2xl font-bold text-blue-600">{meal.count}</p>
                    <p className="text-sm text-gray-600">orders</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">📊 Advanced Analytics</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Timeframe:</span>
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <TransactionChart timeframe={timeframe} />
                <RevenueChart timeframe={timeframe} />
              </div>
            </div>
          </motion.div>
        );
      case 'users':
        return <UserManagement />;
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Add User Panel */}
            {addUserOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <UserPlus className="w-6 h-6 text-blue-500" />
                    Add New User
                  </h3>
                  <button 
                    onClick={() => setAddUserOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input 
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter user's full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter user's email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Role
                    </label>
                    <select 
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Administrator</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <input 
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Create a password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <input 
                        type="password"
                        name="confirmPassword"
                        value={newUser.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm the password"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button 
                      onClick={() => setAddUserOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveNewUser}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Add User
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Payment Settings Panel */}
            {paymentSettingsOpen ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <CreditCardIcon className="w-6 h-6 text-blue-500" />
                    Payment Settings
                  </h3>
                  <button 
                    onClick={() => setPaymentSettingsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Limit
                      </label>
                      <input 
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter maximum transaction amount"
                        defaultValue="1000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Daily Limit
                      </label>
                      <input 
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter daily limit"
                        defaultValue="5000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allowed Payment Methods
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                        Credit/Debit Cards
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                        Bank Transfers
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded text-blue-600 mr-2" />
                        Mobile Payments
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                        Cryptocurrency
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Automatic Refunds
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Enabled - 7 day window</option>
                      <option>Enabled - 14 day window</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button 
                      onClick={() => setPaymentSettingsOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSavePaymentSettings}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : securitySettingsOpen ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-purple-500" />
                    Security Settings
                  </h3>
                  <button 
                    onClick={() => setSecuritySettingsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Authentication</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span>Two-Factor Authentication</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Biometric Authentication</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Session Management</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Session Timeout</span>
                        <select className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option selected>1 hour</option>
                          <option>2 hours</option>
                        </select>
                      </div>
                      <label className="flex items-center justify-between">
                        <span>Auto-Lock on Inactivity</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">User Roles & Permissions</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span>Admin Approval for New Users</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Role-Based Access Control</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <button 
                      onClick={() => setSecuritySettingsOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveSecuritySettings}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">⚙️ System Settings</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <CreditCardIcon className="w-5 h-5 text-blue-500" />
                        Payment Settings
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">Configure payment methods and limits</p>
                      <button 
                        onClick={handleConfigurePayment}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Configure
                      </button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-purple-500" />
                        Security Settings
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">Manage user roles and permissions</p>
                      <button 
                        onClick={handleManageSecurity}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">👑 Admin Dashboard</h1>
            <p className="text-gray-600">Comprehensive system overview and management</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNewUser}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            Add New User
          </motion.button>
        </div>

        {/* Tab Navigation - Mobile Version */}
        {isMobile ? (
          <div className="bg-white rounded-xl shadow-lg p-2 relative">
            <div className="flex items-center">
              {mobileTabScrollPosition > 0 && (
                <button
                  onClick={() => scrollTabs('left')}
                  className="p-2 rounded-full bg-gray-100 mr-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              
              <div 
                id="mobile-tab-container"
                className="flex overflow-x-auto scrollbar-hide space-x-2 flex-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setAddUserOpen(false);
                      setPaymentSettingsOpen(false);
                      setSecuritySettingsOpen(false);
                    }}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => scrollTabs('right')}
                className="p-2 rounded-full bg-gray-100 ml-2"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Tab Navigation - Desktop Version */
          <div className="bg-white rounded-xl shadow-lg p-1">
            <nav className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setAddUserOpen(false);
                    setPaymentSettingsOpen(false);
                    setSecuritySettingsOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;