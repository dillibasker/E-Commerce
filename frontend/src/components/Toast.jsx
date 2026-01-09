import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 50));
        return newProgress <= 0 ? 0 : newProgress;
      });
    }, 50);

    // Auto close timer
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 100); // Wait for fade out animation
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 100);
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgGradient: 'from-emerald-500 to-teal-500',
          icon: CheckCircle,
          emoji: '✓',
          title: 'Success!'
        };
      case 'error':
        return {
          bgGradient: 'from-red-500 to-rose-500',
          icon: XCircle,
          emoji: '✕',
          title: 'Error'
        };
      case 'warning':
        return {
          bgGradient: 'from-yellow-500 to-orange-500',
          icon: AlertCircle,
          emoji: '⚠',
          title: 'Warning'
        };
      case 'info':
        return {
          bgGradient: 'from-blue-500 to-cyan-500',
          icon: Info,
          emoji: 'ℹ',
          title: 'Info'
        };
      default:
        return {
          bgGradient: 'from-emerald-500 to-teal-500',
          icon: CheckCircle,
          emoji: '✓',
          title: 'Success!'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <div
      className={`fixed top-6 right-6 z-[9999] transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{
        animation: isVisible ? 'slideInRight 0.4s ease-out' : 'none'
      }}
    >
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div className={`relative bg-gradient-to-r ${config.bgGradient} rounded-2xl shadow-2xl overflow-hidden min-w-[350px] max-w-md`}>
        {/* Animated shimmer effect */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            animation: 'shimmer 2s infinite',
            backgroundSize: '1000px 100%'
          }}
        ></div>

        {/* Sparkle effects */}
        <div className="absolute top-2 right-20 animate-pulse">
          <Sparkles className="w-4 h-4 text-white/60" />
        </div>
        <div className="absolute bottom-3 left-16 animate-pulse delay-100">
          <Sparkles className="w-3 h-3 text-white/40" />
        </div>

        {/* Main content */}
        <div className="relative flex items-center p-4 pr-12">
          {/* Icon with bounce animation */}
          <div
            className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4"
            style={{
              animation: 'bounce 0.6s ease-out'
            }}
          >
            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>

          {/* Message */}
          <div className="flex-1">
            <h4 className="text-white font-black text-lg mb-1">
              {config.title}
            </h4>
            <p className="text-white/90 font-medium text-sm leading-snug">
              {message}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-black/20">
          <div
            className="h-full bg-white/40 transition-all duration-50 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// Toast Container Component for multiple toasts
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-0 right-0 z-[9999] pointer-events-none">
      <div className="pointer-events-auto space-y-3 p-6">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            style={{
              animation: `slideInRight 0.4s ease-out ${index * 0.1}s backwards`
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}