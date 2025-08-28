import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const { login, isLoading } = useAuth();

  // Array of login-related images that change every second
  const loginImages = [
    '🍎', '📚', '🎓', '🍕', '☕', '📝', '🎒', '🖊️', '🏫', '👩‍🎓'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % loginImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      toast.error('Invalid credentials');
    } else {
      toast.success('Login successful!');
    }
  };

  const demoAccounts = [
    { email: 'admin@university.edu', role: 'Admin', password: 'admin123' },
    { email: 'manager@university.edu', role: 'Manager', password: 'manager123' },
    { email: 'cashier@university.edu', role: 'Cashier', password: 'cashier123' },
    { email: 'student@university.edu', role: 'Student', password: 'student123' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
          />
        ))}
      </div>

      {/* Floating emojis */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          className="absolute text-6xl md:text-8xl opacity-20"
          initial={{ y: 100, opacity: 0, rotate: -10 }}
          animate={{ 
            y: [100, 0, -100],
            opacity: [0, 0.2, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            left: `${Math.random() * 80 + 10}%`,
          }}
        >
          {loginImages[currentImage]}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20 relative z-10"
      >
        {/* Header with animated elements */}
        <div className="text-center mb-8 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -top-10 -right-10"
          >
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </motion.div>
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2"
          >
            <span className="text-yellow-400">🍽️</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
              CampusCard
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-200 text-lg"
          >
            Welcome back! 👋
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/15 border border-blue-300/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/15 border border-blue-300/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <span>Sign In</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </form>

        <motion.div 
          className="mt-8 border-t border-blue-300/30 pt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <p className="text-blue-200 text-sm text-center mb-4">Try demo accounts: 👇</p>
          <div className="grid grid-cols-2 gap-3">
            {demoAccounts.map((account, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="text-xs bg-white/10 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 flex flex-col items-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                <span className="font-medium">{account.role}</span>
                <span className="text-[10px] opacity-70 mt-1">{account.email}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-6 text-center text-blue-200 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <p>Secure login with encryption 🔒</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;