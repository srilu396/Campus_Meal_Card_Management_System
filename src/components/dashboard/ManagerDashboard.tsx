import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  Filter,
  Calendar
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import StatsCard from '../common/StatsCard';
import { mockRechargeRequests, mockTransactions } from '../../data/mockData';
import toast from 'react-hot-toast';

const ManagerDashboard: React.FC = () => {
  // Added more recharge requests to the existing mock data
  const additionalRequests = [
    {
      id: '6',
      studentId: 'S78901',
      amount: 35,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'pending' as const,
      approvedBy: null
    },
    {
      id: '7',
      studentId: 'S34567',
      amount: 50,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'pending' as const,
      approvedBy: null
    },
    {
      id: '8',
      studentId: 'S89123',
      amount: 25,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'pending' as const,
      approvedBy: null
    },
    {
      id: '9',
      studentId: 'S45678',
      amount: 40,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved' as const,
      approvedBy: '2'
    },
    {
      id: '10',
      studentId: 'S91234',
      amount: 30,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'rejected' as const,
      approvedBy: '2'
    },
    {
      id: '11',
      studentId: 'S56789',
      amount: 45,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved' as const,
      approvedBy: '2'
    },
    {
      id: '12',
      studentId: 'S12390',
      amount: 20,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'rejected' as const,
      approvedBy: '2'
    },
    {
      id: '13',
      studentId: 'S67891',
      amount: 55,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved' as const,
      approvedBy: '2'
    },
    {
      id: '14',
      studentId: 'S23456',
      amount: 15,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved' as const,
      approvedBy: '2'
    },
    {
      id: '15',
      studentId: 'S78912',
      amount: 60,
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'approved' as const,
      approvedBy: '2'
    }
  ];

  // Added more recent student activities
  const additionalActivities = [
    {
      id: '6',
      studentId: 'S78901',
      amount: 8.50,
      type: 'purchase' as const,
      description: 'Cafeteria lunch',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    {
      id: '7',
      studentId: 'S34567',
      amount: 20.00,
      type: 'recharge' as const,
      description: 'Wallet recharge',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
      id: '8',
      studentId: 'S89123',
      amount: 5.25,
      type: 'purchase' as const,
      description: 'Library printing',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '9',
      studentId: 'S45678',
      amount: 15.00,
      type: 'recharge' as const,
      description: 'Wallet recharge',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '10',
      studentId: 'S91234',
      amount: 12.75,
      type: 'purchase' as const,
      description: 'Bookstore purchase',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '11',
      studentId: 'S56789',
      amount: 30.00,
      type: 'recharge' as const,
      description: 'Wallet recharge',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '12',
      studentId: 'S12390',
      amount: 7.50,
      type: 'purchase' as const,
      description: 'Coffee shop',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    }
  ];

  const [rechargeRequests, setRechargeRequests] = useState([...mockRechargeRequests, ...additionalRequests]);
  const [recentActivities, setRecentActivities] = useState([...mockTransactions, ...additionalActivities]);
  const [filter, setFilter] = useState('all');

  const stats = [
    {
      title: 'Pending Requests',
      value: rechargeRequests.filter(r => r.status === 'pending').length.toString(),
      change: '+5%',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Approved Today',
      value: '12',
      change: '+18%',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Active Students',
      value: '1,245',
      change: '+3%',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Weekly Growth',
      value: '15.2%',
      change: '+2.1%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    setRechargeRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: action === 'approve' ? 'approved' : 'rejected', approvedBy: '2' }
          : request
      )
    );
    
    toast.success(`Request ${action}d successfully!`);
  };

  // Function to generate weekly report
  const generateWeeklyReport = () => {
    // Calculate weekly stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklyRequests = rechargeRequests.filter(
      request => new Date(request.timestamp) >= oneWeekAgo
    );
    
    const approvedCount = weeklyRequests.filter(r => r.status === 'approved').length;
    const rejectedCount = weeklyRequests.filter(r => r.status === 'rejected').length;
    const pendingCount = weeklyRequests.filter(r => r.status === 'pending').length;
    const totalAmount = weeklyRequests
      .filter(r => r.status === 'approved')
      .reduce((sum, request) => sum + request.amount, 0);
    
    // Create report content
    const reportContent = `
      Weekly Report (${oneWeekAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()})
      =============================================
      Total Requests: ${weeklyRequests.length}
      Approved: ${approvedCount}
      Rejected: ${rejectedCount}
      Pending: ${pendingCount}
      Total Amount Approved: $${totalAmount.toFixed(2)}
      
      Request Breakdown:
      ${weeklyRequests.map(request => `
        - Student ID: ${request.studentId}, Amount: $${request.amount}, Status: ${request.status}, Date: ${new Date(request.timestamp).toLocaleDateString()}
      `).join('')}
    `;
    
    // Create and download report file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Weekly report generated successfully!');
  };

  // Function to export data
  const exportData = () => {
    // Prepare data for export (CSV format)
    const csvContent = [
      ['Student ID', 'Amount', 'Status', 'Timestamp', 'Approved By'],
      ...rechargeRequests.map(request => [
        request.studentId,
        request.amount.toString(),
        request.status,
        new Date(request.timestamp).toISOString(),
        request.approvedBy || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recharge-requests-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Data exported successfully!');
  };

  const filteredRequests = rechargeRequests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  // Sort activities by timestamp (newest first)
  const sortedActivities = recentActivities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);

  return (
    <DashboardLayout userRole="manager">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">📊 Manager Dashboard</h1>
            <p className="text-gray-600">Monitor and approve student recharge requests</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateWeeklyReport}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Weekly Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportData}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Export Data
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Recharge Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              💳 Recharge Requests
            </h3>
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${
                    filter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    🎓
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Student ID: {request.studentId}</p>
                    <p className="text-sm text-gray-600">
                      Amount: <span className="font-semibold text-green-600">${request.amount}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(request.timestamp).toLocaleDateString()} at {new Date(request.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : request.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>

                  {request.status === 'pending' && (
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRequestAction(request.id, 'approve')}
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRequestAction(request.id, 'reject')}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-8"
            >
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No {filter} requests found</p>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            📈 Recent Student Activity
          </h3>
          <div className="space-y-3">
            {sortedActivities.map((transaction, index) => (
              <motion.div 
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'recharge' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.type === 'recharge' ? '💰' : '🍽️'}
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.timestamp).toLocaleDateString()} • 
                      {new Date(transaction.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <span className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;