import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdMenu, MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from 'react-icons/md';
import chris from '../assets/chris.jpg';

// Define profile menu items for the dropdown
const profileMenuItems = [
  { navigation: '/profile', icon: MdPerson, linkTitle: 'Profile' },
  { navigation: '/projects', icon: MdOutlineFolderCopy, linkTitle: 'Projects' },
  { navigation: '/contact', icon: MdOutlineHandshake, linkTitle: 'Contact' },
];

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Placeholder function to toggle EmailSidebar (implementation depends on your setup)
  const toggleEmailSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    // Add logic to show/hide EmailSidebar
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Hamburger button to toggle EmailSidebar */}
      <button
        onClick={toggleEmailSidebar}
        aria-label="Toggle email sidebar"
        className="text-white"
      >
        <MdMenu className="text-2xl" />
      </button>

      {/* User's avatar to toggle profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Toggle profile menu"
          className="focus:outline-none"
        >
          <Image
            src={chris}
            alt="Chris"
            className="w-8 h-8 rounded-full"
            priority
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <ul className="py-1">
              {profileMenuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.navigation}
                    className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.icon && <item.icon className="mr-2 text-lg" />}
                    {item.linkTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;