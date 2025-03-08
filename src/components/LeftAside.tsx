import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDelete, MdOutlineReport, MdEditDocument, MdOutlineSend, MdLabelImportantOutline, MdInbox, MdMenu } from 'react-icons/md';
import { useSidebar } from './sidebarContext';

const EmailSidebar: React.FC = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const currentPathname = usePathname();
  const [removeSmClass, setRemoveSmClass] = useState(false);

  useEffect(() => {
    setTimeout(() => setRemoveSmClass(true), 0);
  }, []);

  const navLinks = [
    { href: '/inbox', icon: MdInbox, text: 'Inbox', iconClass: 'w-5 h-5' },
    { href: '/important', icon: MdLabelImportantOutline, text: 'Important', iconClass: 'w-5.5 h-5' },
    { href: '/sent', icon: MdOutlineSend, text: 'Sent', iconClass: 'w-5.5 h-5' },
    { href: '/drafts', icon: MdEditDocument, text: 'Drafts', iconClass: 'w-5 h-5' },
    { href: '/trash', icon: MdDelete, text: 'Trash', iconClass: 'w-5 h-5' },
    { href: '/spam', icon: MdOutlineReport, text: 'Spam', iconClass: 'w-5 h-5' },
  ];

  const paddingClass = isExpanded ? 'px-4' : 'px-1.5';

  return (
    <>
      <div
        id="sidebarContainer"
        className={`relative left-0 bg-gray-800 transform ${
          removeSmClass ? '' : 'sm:w-64'
        } transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'w-64' : 'w-12 no-text'
        } z-40`}
      >
        <button
          className="p-2 top-4 z-50 md:flex cursor-pointer"
          onClick={toggleSidebar}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <MdMenu className="w-8 h-8 flex-shrink-0" />
        </button>
        <div
          className={`p-2 pt-4 transition-all ${
            isExpanded ? 'w-64' : 'w-12 no-text'
          } xxl:block xxl:w-64`}
        >
          <hr className="pb-4 opacity-30" />
          <nav>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex ${
                      currentPathname === link.href
                        ? 'bg-white/20'
                        : 'bg-white/0 hover:bg-sky-100/15'
                    } text-white text-md py-1 ${paddingClass} rounded-full transition-all items-center`}
                  >
                    <link.icon className={`${link.iconClass} flex-shrink-0`} />
                    <span className="no-text-tgt ml-2">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default EmailSidebar;