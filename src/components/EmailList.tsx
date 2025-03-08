// /src/components/EmailList.tsx
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchEmails } from '../lib/api/emails';
import { BiError } from "react-icons/bi";
import EmailItem from './EmailItem';
import { Email, EmailApiResponse, EmailTypes } from '@/types/global';
import { useNotification } from '@/context/NotificationContext';

interface EmailListProps extends EmailTypes { 
    override?: boolean;
    isDev?: boolean;
}

function EmailList({ type }: EmailListProps) {
    const { setNotification } = useNotification();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery<EmailApiResponse, Error>({
        queryKey: [`${type}-emails`],
        queryFn: ({ pageParam }) => fetchEmails(type, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage: EmailApiResponse, pages: EmailApiResponse[]) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
    });

  const emails: Email[] = data?.pages.flatMap((page) => page.emails) || [];

  if (isLoading) {
    return <div className="p-4 text-center">Loading {type}...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div id={`${type}-container`} className="h-[calc(100vh-4rem)] overflow-y-scroll">
      {emails.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No emails found</p>
      ) : (
        <InfiniteScroll
          dataLength={emails.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false} // Ensure hasNextPage is always boolean
          loader={<div className="p-4 text-center">Loading more...</div>}
          endMessage={<p className="p-4 text-center text-gray-500">No more emails</p>}
          scrollableTarget={`${type}-container`}
        >
          <ul className="email-list">
            {emails.map((email) => (
              <EmailItem key={email.id} email={email} type={type} />
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default EmailList;