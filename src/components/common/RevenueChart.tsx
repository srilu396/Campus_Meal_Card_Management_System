import React from 'react';
import { motion } from 'framer-motion';

const RevenueChart: React.FC = () => {
  const data = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 14200 },
    { month: 'Mar', revenue: 13800 },
    { month: 'Apr', revenue: 16500 },
    { month: 'May', revenue: 18200 },
    { month: 'Jun', revenue: 17800 }
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">💰 Monthly Revenue</h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => (
          <div key={item.month} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="w-full bg-gradient-to-t from-green-600 to-emerald-600 rounded-t-lg min-h-[20px] flex items-end justify-center pb-1"
            >
              <span className="text-xs text-white font-medium">
                ${(item.revenue / 1000).toFixed(0)}k
              </span>
            </motion.div>
            <span className="text-sm text-gray-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;