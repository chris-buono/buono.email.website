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
    <div className="flex flex-col">
      <Header />
      <main className="flex min-h-(--cb-main-hgt) max-h-(--cb-main-hgt)">
        <LeftAside />
        <div className="flex-1 p-4 b-root min-w-0 overflow-x-auto">
          {children}
        </div>
        <RightAside />
      </main>
      <Footer />
      <Notification message={'Welcome!'} />
    </div>
  );
};

export default Layout;