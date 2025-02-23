
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import chris from '../assets/chris.jpg';
import { MdPerson, MdOutlineHandshake, MdOutlineFolderCopy } from "react-icons/md";
import { usePathname } from 'next/navigation';


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
    const currentPathname = usePathname()
  return (
    <div className="p-6">
      {/* User Profile */}
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={chris}
          alt="Image of Chris"
          className="w-35 h-35 rounded-full border-2 border-stone-500"
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
            return (
              <li key={index}>
                <Link href={itm.navigation} className={`flex ${currentPathname === itm.navigation ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                  {Icon && <Icon className="mr-2 text-lg" />}
                  {itm.linkTitle}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default UserProfileSidebar;
