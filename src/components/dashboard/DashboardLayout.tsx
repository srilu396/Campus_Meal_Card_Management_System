import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const { user, logout } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-pink-500';
      case 'manager': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'cashier': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'student': return 'bg-gradient-to-r from-purple-500 to-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case 'admin': return '👑';
      case 'manager': return '📊';
      case 'cashier': return '💰';
      case 'student': return '🎓';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="text-2xl">🍽️</div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">CampusCard</h1>
                <p className="text-xs text-gray-500">Meal Management System</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transactions, users, meals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 text-gray-600 hover:text-gray-800 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </motion.button>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${getRoleColor(userRole)} rounded-full flex items-center justify-center text-white text-lg`}>
                  {getRoleEmoji(userRole)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>

              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;