import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // Enhanced redirect logic with better timing
  useEffect(() => {
    if (!loading && user) {
      console.log('Login page - User authenticated:', user.email, 'Is Admin:', isAdmin);
      
      // Add a small delay to ensure admin status is properly set
      const timer = setTimeout(() => {
        if (isAdmin) {
          console.log('Redirecting to admin dashboard');
          navigate('/admin', { replace: true });
        } else {
          console.log('Redirecting to home page');
          navigate('/', { replace: true });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting to sign in with:', formData.email);
      await signIn(formData.email, formData.password);
      // Navigation will be handled by useEffect above after auth state updates
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
          <p className="mt-4 text-warm-wood">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background with furniture theme gradient */}
      <div className="absolute inset-0 hero-gradient">
        {/* Geometric decorations with warm colors */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gold/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-luxury-gold/20 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-warm-wood/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gold/20 rounded-full blur-xl"></div>
        
        {/* Furniture pattern overlay */}
        <div className="absolute inset-0 furniture-pattern opacity-30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex w-full">
        {/* Left side - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="mb-8">
              {/* Furniture showcase image */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Luxury Furniture" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gold/90 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/20">
                  <h1 className="text-2xl font-playfair font-bold text-white">F</h1>
                </div>
              </div>
              <h2 className="text-4xl font-playfair font-bold text-cream mb-4">
                Welcome to FurnitureHub
              </h2>
              <p className="text-cream/90 text-lg leading-relaxed">
                Transform your home with our premium furniture collection. 
                Trusted by thousands across Tamil Nadu for over 8 years.
              </p>
            </div>
            
            {/* Trust indicators */}
            <div className="space-y-3 text-cream/80">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm">Premium Quality Materials</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm">Free Delivery & Installation</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm">8+ Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            {/* Back to Home Link */}
            <Link
              to="/"
              className="inline-flex items-center text-cream/80 hover:text-cream transition-colors mb-6 lg:mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>

            {/* Login Card */}
            <Card className="border-0 bg-cream/95 backdrop-blur-md shadow-2xl">
              <CardHeader className="text-center pb-6">
                {/* Mobile furniture image - only visible on small screens */}
                <div className="lg:hidden mb-4">
                  <div className="w-16 h-16 mx-auto relative">
                    <img 
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Furniture" 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">F</span>
                    </div>
                  </div>
                </div>
                
                <CardTitle className="text-2xl lg:text-3xl font-playfair font-bold text-deep-brown mb-2">
                  Welcome Back
                </CardTitle>
                <p className="text-warm-wood text-sm lg:text-base">
                  Sign in to your FurnitureHub account
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Enhanced Google Sign In */}
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-soft-beige hover:border-gold hover:bg-gold/5 text-deep-brown font-medium transition-all duration-300 group relative overflow-hidden"
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Chrome className="h-5 w-5 mr-3 text-warm-wood group-hover:text-gold transition-colors" />
                  <span className="relative z-10">Continue with Google</span>
                </Button>

                {/* Elegant Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-soft-beige" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-cream px-4 text-warm-wood font-medium tracking-wider">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-deep-brown">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-wood h-5 w-5" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-11 h-12 border-soft-beige focus:border-gold focus:ring-gold transition-colors bg-white"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-deep-brown">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-wood h-5 w-5" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-11 pr-11 h-12 border-soft-beige focus:border-gold focus:ring-gold transition-colors bg-white"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-warm-wood hover:text-gold transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-soft-beige text-gold focus:ring-gold" disabled={isLoading} />
                      <span className="text-sm text-warm-wood">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-gold hover:text-luxury-gold font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 luxury-gradient hover:opacity-90 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-sm text-warm-wood">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="text-gold hover:text-luxury-gold font-semibold transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-cream/70">
              <p>&copy; 2024 FurnitureHub. All rights reserved.</p>
              <p className="mt-1">8+ Years of Excellence in Tamil Nadu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
