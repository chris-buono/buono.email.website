import React, { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface NotificationProps {
  message: string;
  type?: ToastType;
  duration?: number;// Duration in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss the toast after the specified duration
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  // Tailwind CSS classes for different notification types  className="fixed bottom-0 right-0 m-4 p-4 bg-blue-500 text-white rounded-sm" 
  const typeClasses: Record<ToastType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-gray-900',
  };

  return (
    <div
      className={`fixed top-5 left-5 ${typeClasses[type]} text-white px-6 py-3 rounded-sm shadow-lg transition-opacity duration-300`}
    >
      {message}
    </div>
  );
};

export default Notification;
