import React from 'react';
import Header from '../components/Header';
import LeftAside from '../components/LeftAside';
import RightAside from '../components/RightAside';
import Footer from '../components/Footer';
import { SidebarProvider } from './sidebarContext';
import { useNotification } from '@/context/NotificationContext';
import Notification from './Notification';


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { notification } = useNotification();
  return (
    <div className="flex flex-col">
        <SidebarProvider>
            <Header />
            <main className="flex min-h-(--cb-main-hgt) max-h-(--cb-main-hgt)">
                <LeftAside />
                <div className="flex-1 p-4 b-root min-w-0 overflow-x-auto">
                {children}
                </div>
                <RightAside />
            </main>
            <Footer />
            {notification && (
                <Notification
                message={notification.message}
                type={notification.type}
                duration={notification.duration}
                icon={notification.icon}
                />
            )}
        </SidebarProvider>
    </div>
  );
};

export default Layout;