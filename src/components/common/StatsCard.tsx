import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          <p className="text-sm text-green-600 mt-1">{change} from last week</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;