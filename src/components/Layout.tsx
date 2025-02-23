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
        <LeftAside className="bg-gray-200 p-4 w-64 md:block hidden" />
        <div className="flex-1 p-4">
          {children}
        </div>
        <RightAside className="bg-gray-200 p-4 w-64 md:block hidden" />
      </div>
      <Footer className="bg-gray-800 text-white p-4 text-center" />
      <Notification className="fixed bottom-0 right-0 m-4 p-4 bg-blue-500 text-white rounded" />
    </div>
  );
};

export default Layout;