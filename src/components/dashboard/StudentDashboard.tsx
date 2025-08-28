import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  History, 
  Plus, 
  TrendingUp, 
  Calendar,
  QrCode,
  Wallet,
  Receipt,
  Download,
  RotateCw
} from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import { mockMealCards, mockTransactions, mockMeals } from '../../data/mockData';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('balance');
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(mockMealCards[0].balance);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isQrLoading, setIsQrLoading] = useState(true);
  const [isQrRotating, setIsQrRotating] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  const studentCard = {...mockMealCards[0], balance: currentBalance};
  const studentTransactions = mockTransactions.filter(t => t.cardId === studentCard.id);

  // Generate QR code when tab changes to QR or balance updates
  useEffect(() => {
    if (activeTab === 'qr') {
      generateQRCode();
    }
  }, [activeTab, currentBalance]);

  const generateQRCode = async () => {
    setIsQrLoading(true);
    try {
      const qrData = JSON.stringify({
        cardId: studentCard.id,
        balance: studentCard.balance,
        studentId: "STU001",
        timestamp: new Date().toISOString()
      });
      
      const url = await QRCode.toDataURL(qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
      toast.error('Failed to generate QR code');
    } finally {
      setIsQrLoading(false);
    }
  };

  const handleRecharge = (amount: number) => {
    setCurrentBalance(prevBalance => prevBalance + amount);
    setRechargeAmount('');
    toast.success(`Recharge request for $${amount} submitted! Awaiting manager approval.`);
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    const link = document.createElement('a');
    link.download = `meal-card-${studentCard.id}-qr.png`;
    link.href = qrCodeDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rotateQRCode = async () => {
    setIsQrRotating(true);
    await generateQRCode();
    setTimeout(() => setIsQrRotating(false), 1000);
  };

  const quickRechargeAmounts = [10, 25, 50, 100];

  const weeklySpending = studentTransactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const tabs = [
    { id: 'balance', label: 'Balance', icon: <Wallet className="w-4 h-4" /> },
    { id: 'recharge', label: 'Recharge', icon: <Plus className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'qr', label: 'QR Code', icon: <QrCode className="w-4 h-4" /> }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'balance':
        return (
          <div className="space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-blue-100 text-sm">Campus Meal Card</p>
                  <p className="text-2xl font-bold">🎓 Student ID: STU001</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-200" />
              </div>
              <div className="space-y-2">
                <p className="text-blue-100 text-sm">Current Balance</p>
                <p className="text-4xl font-bold">${studentCard.balance.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-blue-400/30">
                <div>
                  <p className="text-blue-100 text-xs">Status</p>
                  <p className="font-semibold capitalize">{studentCard.status}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">Expires</p>
                  <p className="font-semibold">{new Date(studentCard.expiryDate).toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weekly Spending</p>
                    <p className="text-lg font-bold text-gray-800">${weeklySpending.toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-lg font-bold text-gray-800">{studentTransactions.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Daily</p>
                    <p className="text-lg font-bold text-gray-800">${(weeklySpending / 7).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'recharge':
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">💳 Recharge Your Card</h3>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {quickRechargeAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRecharge(amount)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => rechargeAmount && handleRecharge(parseFloat(rechargeAmount))}
                  disabled={!rechargeAmount || parseFloat(rechargeAmount) <= 0}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Request Recharge
                </motion.button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ℹ️ <strong>Note:</strong> Recharge requests require manager approval and may take up to 24 hours to process.
                </p>
              </div>
            </motion.div>
          </div>
        );

      case 'history':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Transaction History</h3>
            <div className="space-y-3">
              {studentTransactions.map((transaction, index) => {
                const meal = transaction.mealId ? mockMeals.find(m => m.id === transaction.mealId) : null;
                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === 'recharge' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'recharge' ? '💰' : '🍽️'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{new Date(transaction.timestamp).toLocaleTimeString()}</span>
                        </div>
                        {meal && (
                          <div className="flex items-center gap-2 mt-1">
                            <img src={meal.image} alt={meal.name} className="w-6 h-6 rounded object-cover" />
                            <span className="text-xs text-gray-500">{meal.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">{transaction.status}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );

      case 'qr':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📱 Your QR Code</h3>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {isQrLoading ? (
                <div className="bg-gray-100 w-64 h-64 mx-auto rounded-lg flex items-center justify-center mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-4xl"
                  >
                    ⏳
                  </motion.div>
                </div>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: isQrRotating ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <img 
                      src={qrCodeDataUrl} 
                      alt="Meal Card QR Code" 
                      className="w-64 h-64 mx-auto rounded-lg mb-4 border-4 border-blue-100 shadow-md"
                    />
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={rotateQRCode}
                    className="absolute top-2 right-2 bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
                    title="Refresh QR Code"
                  >
                    <RotateCw className="w-4 h-4 text-blue-600" />
                  </motion.button>
                </>
              )}
            </motion.div>
            
            <p className="text-gray-600 mb-6">
              Show this QR code to the cashier for quick payment
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Card ID:</strong> {studentCard.id}<br />
                <strong>Balance:</strong> ${studentCard.balance.toFixed(2)}<br />
                <strong>Generated:</strong> {new Date().toLocaleTimeString()}
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadQRCode}
              disabled={!qrCodeDataUrl}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mx-auto hover:shadow-lg transition-all"
            >
              <Download className="w-5 h-5" />
              Download QR Code
            </motion.button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🎓 Student Dashboard</h1>
            <p className="text-gray-600">Manage your meal card and view transaction history</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-1">
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;