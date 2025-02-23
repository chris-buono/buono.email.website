import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/buono.email.web.w.svg';
import { MdDelete, MdOutlineReport, MdEditDocument, MdOutlineSend, MdLabelImportantOutline, MdInbox } from "react-icons/md";
import { usePathname } from 'next/navigation';


/*
    Need to add in:
    Drafts
    Sent
    Folders for filtered Info
    News > loads a different Worldsy via new API i will create.

*/

const EmailSidebar: React.FC = () => {
    const currentPathname = usePathname()
    return (
        <div className="bg-gray-900 p-4 w-64 md:block hidden">
            <div className="p-2 pt-0">
                <div className="flex flex-col items-center space-y-4">
                    <Link href="/">
                        <Image src={logo} alt="buono.email logo" className="w-50 h-20 stroke-white" />
                    </Link>
                </div>
                <hr className="py-2 opacity-30" />
                <nav>
                    <ul className="space-y-1">
                    <li>
                        <Link
                        href="/inbox"
                        className={`flex ${currentPathname === '/inbox' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdInbox className="mr-2 text-lg" />
                        Inbox
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/important"
                        className={`flex ${currentPathname === '/important' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdLabelImportantOutline className="mr-2 text-lg" />
                        Important
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/sent"
                        className={`flex ${currentPathname === '/sent' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdOutlineSend className="mr-2 text-lg" />
                        Sent
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/drafts"
                        className={`flex ${currentPathname === '/drafts' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdEditDocument className="mr-2 text-lg" />
                        Drafts
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/trash"
                        className={`flex ${currentPathname === '/trash' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdDelete className="mr-2 text-lg" />
                        Trash
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/spam"
                        className={`flex ${currentPathname === '/spam' ? 'bg-white/20' : 'bg-white/0 hover:bg-sky-100/15'} text-white text-md py-1 px-4 rounded-full transition-colors items-center`}>
                        <MdOutlineReport className="mr-2 text-lg" />
                        Spam
                        </Link>
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default EmailSidebar;
