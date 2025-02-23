import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/buono.email.web.svg';
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
        <div className="p-6 pt-0">
        <div className="flex flex-col items-center space-y-4">
            <Image src={logo} alt="buono.email logo" className="w-40 h-20" />
        </div>
        <hr className="py-2 opacity-30" />
        <nav>
            <ul className="space-y-1">
            <li>
                <Link
                href="/"
                className={`flex ${currentPathname === '/' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdInbox className="mr-2 text-lg" />
                Inbox
                </Link>
            </li>
            <li>
                <Link
                href="/important"
                className={`flex ${currentPathname === '/important' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdLabelImportantOutline className="mr-2 text-lg" />
                Important
                </Link>
            </li>
            <li>
                <Link
                href="/sent"
                className={`flex ${currentPathname === '/sent' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdOutlineSend className="mr-2 text-lg" />
                Sent
                </Link>
            </li>
            <li>
                <Link
                href="/drafts"
                className={`flex ${currentPathname === '/drafts' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdEditDocument className="mr-2 text-lg" />
                Drafts
                </Link>
            </li>
            <li>
                <Link
                href="/trash"
                className={`flex ${currentPathname === '/trash' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdDelete className="mr-2 text-lg" />
                Trash
                </Link>
            </li>
            <li>
                <Link
                href="/spam"
                className={`flex ${currentPathname === '/spam' ? 'bg-opacity-30 ' : ' '}text-md py-1 px-4 rounded-full transition-colors items-center bg-stone-600 hover:bg-stone-700`}>
                <MdOutlineReport className="mr-2 text-lg" />
                Spam
                </Link>
            </li>
            </ul>
        </nav>
        </div>
    );
};

export default EmailSidebar;
