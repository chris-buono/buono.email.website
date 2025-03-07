// sidebarContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

// Create the context with a default value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Sidebar Provider component
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsExpanded(true); // Expanded by default on desktop (>= 1280px)
      } else {
        setIsExpanded(false); // Collapsed by default on mobile (< 1280px)
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Functions to control the sidebar
  const toggleSidebar = () => setIsExpanded((prev) => !prev);
  const openSidebar = () => setIsExpanded(true);
  const closeSidebar = () => setIsExpanded(false);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};