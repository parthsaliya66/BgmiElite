import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, 
  Users, 
  Shield, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  Star,
  Target,
  Zap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
  LogIn
} from 'lucide-react';

const BGMIEliteApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [counters, setCounters] = useState({
    players: 0,
    teams: 0,
    tournaments: 0,
    prizePool: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const slides = [
    {
      title: "BGMI Championship 2025",
      prize: "₹50,00,000 Prize Pool",
      bgColor: "from-orange-500/20 to-red-600/20"
    },
    {
      title: "Weekly Clash Series",
      prize: "₹1,00,000 Prize Pool",
      bgColor: "from-blue-500/20 to-cyan-600/20"
    },
    {
      title: "Pro League Season 5",
      prize: "₹25,00,000 Prize Pool",
      bgColor: "from-purple-500/20 to-pink-600/20"
    }
  ];

  const stats = [
    { label: "Registered Players", value: 50000, suffix: "" },
    { label: "Active Teams", value: 500, suffix: "" },
    { label: "Tournaments", value: 100, suffix: "" },
    { label: "Prize Pool (₹)", value: 5000000, suffix: "" }
  ];

  const features = [
    {
      icon: Trophy,
      title: "Premium Tournaments",
      description: "Compete in high-stakes tournaments with massive prize pools and professional organization.",
      color: "text-orange-500"
    },
    {
      icon: Users,
      title: "Pro Community",
      description: "Join thousands of skilled players and form teams with the best BGMI athletes in India.",
      color: "text-blue-400"
    },
    {
      icon: Shield,
      title: "Anti-Cheat System",
      description: "Advanced anti-cheat technology ensures fair play and competitive integrity in all matches.",
      color: "text-green-400"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (currentPage === 'home') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length, currentPage]);

  // Counter animation
  useEffect(() => {
    if (currentPage === 'home') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        },
        { threshold: 0.5 }
      );

      if (statsRef.current) {
        observer.observe(statsRef.current);
      }

      return () => observer.disconnect();
    }
  }, [hasAnimated, currentPage]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        
        setCounters(prev => ({
          ...prev,
          [Object.keys(prev)[index]]: Math.floor(current)
        }));
      }, 20);
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
    // Add login logic here
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signup submitted:', signupData);
    // Add signup logic here
  };

  const resetForms = () => {
    setLoginData({ email: '', password: '' });
    setSignupData({ username: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    resetForms();
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigateToPage('home')}
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-wider">
              <span className="text-orange-500">BGMI</span>
              <span className="text-white ml-1">ELITE</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-baseline space-x-8">
              {['Home', 'Tournaments', 'Teams', 'News', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                  onClick={(e) => {
                    if (item === 'Home') {
                      e.preventDefault();
                      navigateToPage('home');
                    }
                  }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
            
            {/* User Profile Icon */}
            <button
              onClick={() => navigateToPage('login')}
              className="group p-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-600/30 transition-all duration-300 hover:scale-110"
            >
              <User size={20} className="text-orange-500 group-hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => navigateToPage('login')}
              className="group p-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-red-600/30 transition-all duration-300"
            >
              <User size={18} className="text-orange-500 group-hover:text-white transition-colors duration-300" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 rounded-lg mt-2">
              {['Home', 'Tournaments', 'Teams', 'News', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300"
                  onClick={(e) => {
                    if (item === 'Home') {
                      e.preventDefault();
                      navigateToPage('home');
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // Login Page Component
  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-24 h-24 border-2 border-orange-500/20 rotate-45 animate-spin"></div>
        <div className="absolute top-1/3 right-10 w-16 h-16 border-2 border-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-1/3 w-12 h-12 bg-gradient-to-r from-orange-500/30 to-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 right-1/4 w-20 h-20 border-2 border-green-400/20 rotate-12 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigateToPage('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors duration-300 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* Login Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-600/20 rounded-full border border-orange-500/30">
                <LogIn size={32} className="text-orange-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your BGMI Elite account</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-orange-500 hover:text-orange-400 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <LogIn size={18} />
                <span>Sign In</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigateToPage('signup')}
                className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-300"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Signup Page Component
  const SignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 right-20 w-28 h-28 border-2 border-blue-400/20 rotate-45 animate-spin"></div>
        <div className="absolute top-1/2 left-10 w-18 h-18 border-2 border-orange-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-gradient-to-r from-blue-500/30 to-cyan-600/30 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 left-1/4 w-22 h-22 border-2 border-green-400/20 rotate-12 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigateToPage('home')}
          className="flex items-center space-x-2 text-gray-400 hover:text-orange-500 transition-colors duration-300 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* Signup Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-full border border-blue-500/30">
                <UserPlus size={32} className="text-blue-400" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Join BGMI Elite</h2>
            <p className="text-gray-400">Create your account and start your journey</p>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  required
                  value={signupData.username}
                  onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Username"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  required
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-gray-800 transition-all duration-300"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-blue-400 bg-gray-800 border-gray-600 rounded focus:ring-blue-400 focus:ring-2"
              />
              <label className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="group relative w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg font-semibold text-white overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <UserPlus size={18} />
                <span>Create Account</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigateToPage('login')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-500/20 rotate-45 animate-spin"></div>
        <div className="absolute top-1/4 right-20 w-20 h-20 border-2 border-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-500/30 to-blue-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 border-2 border-green-400/20 rotate-12 animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          {/* Glitch Effect Title */}
          <div className="relative inline-block mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-wider text-white animate-pulse">
              BGMI ELITE
            </h1>
            <div className="absolute inset-0 text-4xl sm:text-6xl lg:text-8xl font-black tracking-wider text-orange-500 opacity-70 animate-ping">
              BGMI ELITE
            </div>
            <div className="absolute inset-0 text-4xl sm:text-6xl lg:text-8xl font-black tracking-wider text-blue-400 opacity-50 animate-bounce">
              BGMI ELITE
            </div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate battleground where legends are born. Join the most competitive BGMI eSports platform in India.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center gap-2">
                <Trophy size={20} />
                Join Tournament
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 border-2 border-orange-500 rounded-full font-semibold text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
              <span className="flex items-center gap-2">
                <Play size={20} />
                Watch Live
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Tournament Slider Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16">
            <span className="text-orange-500">Featured</span>
            <span className="text-white ml-2">Tournaments</span>
          </h2>

          <div className="relative max-w-6xl mx-auto">
            {/* Slider Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-orange-500/20">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`min-w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br ${slide.bgColor} relative flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 text-center px-4">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white">
                        {slide.title}
                      </h3>
                      <p className="text-lg sm:text-xl lg:text-2xl text-orange-300 mb-6">
                        {slide.prize}
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold text-white hover:scale-105 transition-transform duration-300">
                        Register Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-orange-500 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-orange-500 text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-orange-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 bg-black/30 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm p-6 lg:p-8 rounded-xl border border-gray-700/50 text-center hover:scale-105 hover:bg-gray-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-2">
                  {formatNumber(Object.values(counters)[index])}
                </div>
                <p className="text-gray-300 text-sm lg:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 lg:mb-16">
            Why Choose <span className="text-orange-500">BGMI Elite</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-900/30 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-700/50 text-center hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-500/30"
              >
                <div className={`${feature.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={48} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-orange-500/10 to-red-600/10 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to <span className="text-orange-500">Dominate</span> the Battleground?
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players competing for glory and massive prize pools. Your journey to becoming a BGMI legend starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-bold text-white overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/25">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Zap size={20} />
                Start Playing Now
              </span>
            </button>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-700/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-orange-500">BGMI</span>
                <span className="text-white ml-1">ELITE</span>
              </h3>
              <p className="text-gray-400 leading-relaxed">
                India's premier BGMI eSports platform for competitive gaming and professional tournaments.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Tournaments', 'Rankings', 'Teams', 'News'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Contact Us', 'Rules', 'Fair Play'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Discord', icon: '🎮' },
                  { name: 'YouTube', icon: '📺' },
                  { name: 'Instagram', icon: '📸' },
                  { name: 'Twitter', icon: '🐦' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="text-2xl hover:text-orange-500 transition-colors duration-300 hover:scale-110 transform"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 lg:mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 BGMI Elite. All rights reserved. Built for champions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Main App Component
  return (
    <div>
      <Navigation />
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'login' && <LoginPage />}
      {currentPage === 'signup' && <SignupPage />}
    </div>
  );
};

export default BGMIEliteApp;