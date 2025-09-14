import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import type { LoginFormData } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // For MVP, just navigate to personas page
      navigate('/personas');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          {/* Title Section */}
          <div className="text-center mb-16">
            <div className="w-10 h-10 bg-secondary rounded-sm mx-auto mb-8"></div>
            <h1 className="text-5xl font-forum text-text mb-4">
              Pivdenny Insights Agent
            </h1>
            <p className="text-base font-ibm font-light text-text">
              Для доступу звертайтеся до research@pivdenny.com.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Введіть електронну пошту"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-white border rounded-lg text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <input
                type="password"
                name="password"
                placeholder="Введіть пароль"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 bg-white border rounded-lg text-text placeholder-text/60 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-forum text-lg hover:bg-primary/90 transition-colors"
            >
              Увійти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
