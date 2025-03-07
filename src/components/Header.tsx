import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdMenu, MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from 'react-icons/md';
import chris from '../assets/chris.jpg';
import logo from '../assets/buono.email.web.w.svg';

// Define profile menu items for the dropdown
const profileMenuItems = [
  { navigation: '/profile', icon: MdPerson, linkTitle: 'Profile' },
  { navigation: '/projects', icon: MdOutlineFolderCopy, linkTitle: 'Projects' },
  { navigation: '/contact', icon: MdOutlineHandshake, linkTitle: 'Contact' },
];

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-800 py-2 px-4 flex justify-between items-center max-h-(--cb-hdr-max-hgt) min-h-(--cb-hdr-min-hgt)">

      <Link href="/" className='z-100'>
        <Image
          src={logo}
          alt="buono.email logo"
          className="w-30 h-10 stroke-white"
          style={{ maxWidth: '100%', height: 'auto' }}
          unoptimized
        />
      </Link>


      {/* User's avatar to toggle profile dropdown */}
      <div className="relative md:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="Toggle profile menu"
          className="focus:outline-none flex items-center space-x-3 text-sm"
        >
          <h2 className='flex'>Chris Buono</h2>
          <p className='text-xs font-normal text-center text-stone-50'>Welcome to the inbox of my mind.</p>
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