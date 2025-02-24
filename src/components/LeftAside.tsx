import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDelete, MdOutlineReport, MdEditDocument, MdOutlineSend, MdLabelImportantOutline, MdInbox, MdMenu, MdClose } from 'react-icons/md';
import logo from '../assets/buono.email.web.w.svg';

const EmailSidebar: React.FC = () => {
  // State to manage the sidebar's open/closed status on mobile
  const [isOpen, setIsOpen] = useState(false);
  const currentPathname = usePathname();

  return (
    <div className="relative">
      {/* Hamburger button: Visible only on mobile (hidden on md and up) */}
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? (
          <MdClose className="text-2xl text-white" />
        ) : (
          <MdMenu className="text-2xl text-white" />
        )}
      </button>

      {/* Overlay: Appears when sidebar is open on mobile to dim the background and allow closing by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container: Handles positioning and visibility across screen sizes */}
      <div
        className={`
          fixed inset-y-0 left-0 w-64 bg-gray-900 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:block z-40
        `}
      >
        {/* Inner container with padding adjustments */}
        <div className="p-4 pt-16 md:pt-4">
          {/* Logo section */}
          <div className="pb-4">
            <Link href="/">
              <Image
                src={logo}
                alt="buono.email logo"
                className="w-50 h-20 stroke-white"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Link>
          </div>
          <hr className="pb-4 opacity-30" />

          {/* Navigation menu */}
          <nav>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/inbox"
                  className={`flex ${
                    currentPathname === '/inbox'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdInbox className="mr-2 text-lg" />
                  Inbox
                </Link>
              </li>
              <li>
                <Link
                  href="/important"
                  className={`flex ${
                    currentPathname === '/important'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdLabelImportantOutline className="mr-2 text-lg" />
                  Important
                </Link>
              </li>
              <li>
                <Link
                  href="/sent"
                  className={`flex ${
                    currentPathname === '/sent'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdOutlineSend className="mr-2 text-lg" />
                  Sent
                </Link>
              </li>
              <li>
                <Link
                  href="/drafts"
                  className={`flex ${
                    currentPathname === '/drafts'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdEditDocument className="mr-2 text-lg" />
                  Drafts
                </Link>
              </li>
              <li>
                <Link
                  href="/trash"
                  className={`flex ${
                    currentPathname === '/trash'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdDelete className="mr-2 text-lg" />
                  Trash
                </Link>
              </li>
              <li>
                <Link
                  href="/spam"
                  className={`flex ${
                    currentPathname === '/spam'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-4 rounded-full transition-colors items-center`}
                >
                  <MdOutlineReport className="mr-2 text-lg" />
                  Spam
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;