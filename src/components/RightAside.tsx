
import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import chris from '../assets/chris.jpg';
import { MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import { usePathname } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

/*
Pages

About
Projects
Contact

    type AsideMenu = {
        id: number;
        navigation: string;
        icon?: IconType;
        setNotice?: string;
        linkTitle?: string;
    };

use for key project

MdOutlineKey


*/

const menuitems: AsideMenu[] = [
  {
    id: 1,
    navigation: "/profile",
    icon: MdPerson,
    linkTitle: "Profile"
  },
  {
    id: 2,
    navigation: "/projects",
    icon: MdOutlineFolderCopy,
    linkTitle: "Projects"
  },
  {
    id: 3,
    navigation: "/contact",
    icon: MdOutlineHandshake,
    linkTitle: "Contact"
  },
  {
    id: 4,
    navigation: "/support",
    icon: RiMoneyDollarCircleLine,
    linkTitle: "Support"
  },
];


const UserProfileSidebar: React.FC = () => {
    const currentPathname = usePathname();
    const getSubpath = (basePath: string) => {
        if (currentPathname.startsWith(basePath)) {
            const subpath = currentPathname.replace(basePath, '').replace('/', '');
            return DOMPurify.sanitize(subpath) || null;
        }
        return null;
    };

  return (
    <div id='cb-right-menu' className="bg-gray-800 w-64 md:block hidden flex-none">
      <div className="p-2">
        {/* User Profile */}
        <div className="flex flex-col items-center space-y-4 pb-4">
          <Image
            src={chris}
            alt="Image of Chris"
            priority
            className="w-35 h-35 rounded-full border-2 border-gray-800"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
          <h2 className="text-xl font-semibold mb-0 text-stone-100">Chris Buono</h2>
          <p className='text-xs font-normal text-center text-stone-50'>Welcome to the inbox of my mind.</p>
        </div>
        <hr className="pb-4 opacity-30" />
        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {menuitems.map((itm, index) => {
              const Icon = itm?.icon;
              const subpath = getSubpath(itm.navigation);
              return (
                <li key={index}>
                  <Link href={itm.navigation} className={`flex ${currentPathname.startsWith(itm.navigation) ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                    {Icon && <Icon className={`w-5 h-5 flex-shrink-0`} />}
                    <span className='ml-2'>{itm.linkTitle}</span>
                    {subpath && (<span className="sr-only">currently viewing {subpath}</span>)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserProfileSidebar;
