// pages/inbox/[emailId].tsx
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { Email } from '@/types/global';

async function fetchEmailById(type: string, emailId: string): Promise<Email> {
  const response = await fetch(`/api/emails/${type}/${emailId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch email');
  }
  return response.json();
}

export default function EmailDetail() {
  const router = useRouter();
  const { emailId } = router.query;

  const { data: email, isLoading, isError, error } = useQuery<Email, Error>({
    queryKey: ['email', emailId],
    queryFn: () => fetchEmailById('inbox', emailId as string),
    enabled: !!emailId,
  });

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  if (!email) {
    return <div className="p-4">Email not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{email.subject}</h1>
      <p>From: {email.sender}</p>
      <p>Date: {email.date}</p>
      <div className="mt-4">{email.snippet}</div>
    </div>
  );
}