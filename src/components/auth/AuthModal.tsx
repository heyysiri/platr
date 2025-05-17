import { useState } from 'react';
import Image from 'next/image';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-white dark:bg-[#222222] rounded-xl shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>

        {/* Card content */}
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Image 
              src="/ll.png" 
              alt="Platr Logo" 
              width={10} 
              height={10} 
              className="dark:invert-[0.95]"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF5A00] focus:border-[#FF5A00] bg-white dark:bg-[#333333] text-gray-900 dark:text-gray-100"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF5A00] focus:border-[#FF5A00] bg-white dark:bg-[#333333] text-gray-900 dark:text-gray-100"
                placeholder="Enter your email"
                required
                suppressHydrationWarning
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF5A00] focus:border-[#FF5A00] bg-white dark:bg-[#333333] text-gray-900 dark:text-gray-100"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                required
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-[#FF5A00] hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#FF5A00] hover:bg-[#E65100] text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-[#222222] text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#333333] hover:bg-gray-50 dark:hover:bg-[#444444] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 12.5C22.5 11.744 22.4305 11.017 22.3001 10.3159H12V14.5532H17.9364C17.7206 15.8791 16.9571 17.0356 15.8072 17.7538V20.5132H19.2918C21.2618 18.7163 22.5 15.8628 22.5 12.5Z" fill="#4285F4"/>
                  <path d="M12 23C14.7 23 16.9635 22.0208 18.2918 20.5133L14.8072 17.7539C13.9835 18.3333 13.0931 18.6667 12 18.6667C9.3959 18.6667 7.1907 16.9336 6.40384 14.5667H2.81055V17.4133C4.12903 20.7778 7.80138 23 12 23Z" fill="#34A853"/>
                  <path d="M6.40385 14.5667C6.20513 13.9883 6.09615 13.3642 6.09615 12.7167C6.09615 12.0692 6.20513 11.445 6.40385 10.8667V8.01999H2.81055C2.09423 9.41792 1.69995 11.0242 1.69995 12.7167C1.69995 14.4092 2.09423 16.0154 2.81055 17.4133L6.40385 14.5667Z" fill="#FBBC05"/>
                  <path d="M12 6.76667C13.5079 6.76667 14.8584 7.27083 15.9169 8.2725L19.0587 5.17583C16.9636 3.2625 14.7001 2.08333 12 2.08333C7.80138 2.08333 4.12903 4.30556 2.81055 7.67V10.8667H6.40384C7.1907 8.49979 9.3959 6.76667 12 6.76667Z" fill="#EA4335"/>
                </svg>
                Google
              </button>

              <button
                type="button"
                className="py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#333333] hover:bg-gray-50 dark:hover:bg-[#444444] flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-[#FF5A00] hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 