import { useEffect } from 'react';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white
      transition-all duration-500 ease-out
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}
      animate-slideDown`}
    >
      {message}
    </div>
  );
}
