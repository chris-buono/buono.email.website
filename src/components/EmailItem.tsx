import { Email, EmailTypes } from '@/types/global';
import Link from 'next/link';

interface EmailItemProps {
  email: Email;
  type: EmailTypes;
}

function EmailItem({ email, type }: EmailItemProps) {
  return (
    <Link href={`/${type}/${email.id}`}>
      <a className="block p-4 border-b hover:bg-gray-100 cursor-pointer sm:flex sm:justify-between sm:items-center">
        <div className="sm:flex-1 sm:min-w-0">
          <div className="font-medium truncate">{email.sender}</div>
          <div className="text-sm truncate">{email.subject}</div>
          <div className="text-sm text-gray-500 truncate">{email.snippet}</div>
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-500">{email.date}</div>
      </a>
    </Link>
  );
}

export default EmailItem;