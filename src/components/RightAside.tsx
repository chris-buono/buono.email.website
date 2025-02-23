
import React from 'react';
import Image from "next/legacy/image";
import Link from 'next/link';
import chris from '../assets/chris.jpg';
import { MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from "react-icons/md";
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
    setNotice: "Hi team, please be reminded of our meeting scheduled at 3 PM in the conference room. Agenda includes quarterly reviews and upcoming project plans.",
    linkTitle: "Profile"
  },
  {
    id: 2,
    navigation: "/projects",
    icon: MdOutlineFolderCopy,
    setNotice: "Hi team, please be reminded of our meeting scheduled at 3 PM in the conference room. Agenda includes quarterly reviews and upcoming project plans.",
    linkTitle: "Projects"
  },
  {
    id: 3,
    navigation: "/contact",
    icon: MdOutlineHandshake,
    setNotice: "Hi team, please be reminded of our meeting scheduled at 3 PM in the conference room. Agenda includes quarterly reviews and upcoming project plans.",
    linkTitle: "Contact"
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
    <div className="bg-gray-900 p-4 w-64 md:block hidden">
      <div className="p-2">
        {/* User Profile */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={chris}
            alt="Image of Chris"
            priority
            className="w-35 h-35 rounded-full border-2 border-slate-900"
          />
          <h2 className="text-xl font-semibold mb-0 text-stone-100">Chris Buono</h2>
          <p className='text-xs font-normal text-center text-stone-50'>Welcome to the inbox of my mind.</p>
        </div>
        <hr className="mt-2 opacity-30" />
        {/* Navigation */}
        <nav className="mt-2">
          <ul className="space-y-1">
            {menuitems.map((itm, index) => {
              const Icon = itm?.icon;
              const subpath = getSubpath(itm.navigation);
              return (
                <li key={index}>
                  <Link href={itm.navigation} className={`flex ${currentPathname.startsWith(itm.navigation) ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                    {Icon && <Icon className="mr-2 text-lg" />}
                    {itm.linkTitle}{subpath && (<span className="sr-only">currently viewing {subpath}</span>)}
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
