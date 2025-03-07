// ToggleSidebarButton.tsx
import React from 'react';
import { useSidebar } from './sidebarContext';

const ToggleSidebarButton: React.FC = () => {
  const { isExpanded, toggleSidebar, openSidebar, closeSidebar } = useSidebar();

  return (
    <div className="p-4">
      <button
        onClick={toggleSidebar}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
      </button>
      <button
        onClick={openSidebar}
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Open Sidebar
      </button>
      <button
        onClick={closeSidebar}
        className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Collapse Sidebar
      </button>
    </div>
  );
};

export default ToggleSidebarButton;