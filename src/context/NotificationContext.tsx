// /src/context/NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import TagManager from 'react-gtm-module';
import Notification from '../components/Notification';
import { IconType } from 'react-icons';

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
  duration: number;
  icon: IconType;
}

interface NotificationContextType {
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleSetNotification = (newNotification: Notification | null) => {
    if (newNotification && newNotification.type === 'error') {
      TagManager.dataLayer({
        dataLayer: {
          event: 'user_notification',
          notificationMessage: newNotification.message,
        },
      });
    }
    setNotification(newNotification);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification: handleSetNotification }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          icon={notification.icon}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};