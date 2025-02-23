import React from 'react';
import Header from '../components/Header';
import LeftAside from '../components/LeftAside';
import RightAside from '../components/RightAside';
import Footer from '../components/Footer';
import Notification from '../components/Notification';


type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <LeftAside />
        <div className="flex-1 p-4 b-root">
          {children}
        </div>
        <RightAside />
      </div>
      <Footer />
      <Notification message={'Welcome!'} />
    </div>
  );
};

export default Layout;