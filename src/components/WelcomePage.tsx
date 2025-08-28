import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard, Users, BarChart3, Utensils, Shield, QrCode, Bell, Calendar } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: '💳 Digital Meal Cards',
      description: 'Cashless transactions with secure digital meal cards for all students'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '👥 Role-Based Access',
      description: 'Different dashboards for Admin, Manager, Cashier, and Students'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: '📊 Real-time Analytics',
      description: 'Track spending, popular meals, and generate comprehensive reports'
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: '🍽️ Menu Management',
      description: 'Easy meal ordering with rich menu details and availability tracking'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: '🔒 Secure Transactions',
      description: 'End-to-end encryption for all payment and personal data'
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: '📱 QR Code Payments',
      description: 'Quick and contactless payments using QR code technology'
    }
  ];

  // Project-related images for the carousel
  const carouselImages = [
    "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6294355/pexels-photo-6294355.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5490933/pexels-photo-5490933.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change image every 2 minutes (10000ms)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Logo component
  const Logo = () => (
    <div className="flex items-center justify-center mb-2">
      <div className="relative">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Utensils className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </motion.div>
      </div>
      <motion.div
        className="ml-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-white">CampusCard</h1>
        <p className="text-purple-200 text-sm">Meal Management System</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0">
        {/* Floating bubbles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Floating shapes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute opacity-5"
            style={{
              width: Math.random() * 80 + 20,
              height: Math.random() * 80 + 20,
              background: 'transparent',
              border: '1px solid white',
              borderRadius: Math.random() > 0.5 ? '50%' : Math.random() > 0.5 ? '20%' : '5%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Pulsing circles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.03
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12"
        >
          <Logo />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center space-x-4"
          >
            <div className="text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 inline mr-2" />
              <span>24-Hour Challenge</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Revolutionize Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">Dining</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-purple-200 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Transform your university food service with our comprehensive meal card management system designed for the modern campus.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                <span>Real-time Notifications</span>
              </div>
              <div className="flex items-center text-white bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full">
                <QrCode className="w-5 h-5 mr-2 text-blue-400" />
                <span>QR Code Technology</span>
              </div>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.button>
              
              <button className="bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/20">
                Learn More
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right side - Image Carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <motion.img
                key={currentImageIndex}
                src={carouselImages[currentImageIndex]}
                alt="Campus Dining"
                className="w-full h-96 object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Image info */}
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Smart Campus Dining</h3>
                <p className="text-lg opacity-90">Next-generation food service technology</p>
              </div>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating stats cards */}
            <motion.div
              className="absolute -left-4 -top-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-white">
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-sm">Students Served</div>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -right-4 -bottom-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="text-white">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <h2 className="text-3xl font-bold text-white text-center mb-4">Everything You Need in One Platform</h2>
          <p className="text-purple-200 text-center max-w-2xl mx-auto mb-12">Our comprehensive solution handles all aspects of campus dining management</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="text-purple-300 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 text-center">{feature.title}</h3>
                <p className="text-purple-200 text-sm text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Footer CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Campus Dining?</h2>
          <motion.button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold flex items-center gap-3 mx-auto shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;