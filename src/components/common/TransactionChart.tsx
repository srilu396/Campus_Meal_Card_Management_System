import React from 'react';
import { motion } from 'framer-motion';

const TransactionChart: React.FC = () => {
  const data = [
    { day: 'Mon', transactions: 45 },
    { day: 'Tue', transactions: 38 },
    { day: 'Wed', transactions: 52 },
    { day: 'Thu', transactions: 41 },
    { day: 'Fri', transactions: 67 },
    { day: 'Sat', transactions: 28 },
    { day: 'Sun', transactions: 34 }
  ];

  const maxTransactions = Math.max(...data.map(d => d.transactions));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">📈 Weekly Transactions</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => (
          <div key={item.day} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.transactions / maxTransactions) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg min-h-[20px] flex items-end justify-center pb-2"
            >
              <span className="text-xs text-white font-medium">{item.transactions}</span>
            </motion.div>
            <span className="text-sm text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionChart;