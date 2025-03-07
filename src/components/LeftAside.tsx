// EmailSidebar.tsx
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
  
  return (
    <>
      {/* Sidebar container */}
      <div id='sidebarContainer'
        className={`
          relative left-0 bg-gray-800 transform
          ${removeSmClass ? '' : 'sm:w-64'}
          transition-all duration-300 ease-in-out overflow-hidden
          ${isExpanded ? 'w-64' : 'w-12 no-text'}
          z-40
        `}
      >
        {/* Toggle button for desktop */}
        <button
          className={`p-2 top-4 z-50 md:flex cursor-pointer`}
          onClick={toggleSidebar}
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <MdMenu className={`w-8 h-8 flex-shrink-0`} />
        </button>

        {/* Sidebar content: Hidden when collapsed on desktop */}
        <div
          className={`
            p-2 pt-4 transition-all
            ${isExpanded ? 'w-64' : 'w-12 no-text'}
            xxl:block
            xxl:w-64
          `}
        >
          {/* Logo section */}

          <hr className="pb-4 opacity-30" />

          {/* Navigation menu */}
          <nav>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/inbox"
                  className={`flex ${
                    currentPathname === '/inbox'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdInbox className={`w-5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Inbox</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/important"
                  className={`flex ${
                    currentPathname === '/important'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdLabelImportantOutline className={`w-5.5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Important</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sent"
                  className={`flex ${
                    currentPathname === '/sent'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdOutlineSend className={`w-5.5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Sent</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/drafts"
                  className={`flex ${
                    currentPathname === '/drafts'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdEditDocument className={`w-5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Drafts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/trash"
                  className={`flex ${
                    currentPathname === '/trash'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdDelete className={`w-5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Trash</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/spam"
                  className={`flex ${
                    currentPathname === '/spam'
                      ? 'bg-white/20'
                      : 'bg-white/0 hover:bg-sky-100/15'
                  } text-white text-md py-1 px-${isExpanded ? '4' : '1.5'} rounded-full transition-all items-center`}
                >
                  <MdOutlineReport className={`w-5 h-5 flex-shrink-0`} />
                  <span className='no-text-tgt ml-2'>Spam</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default EmailSidebar;