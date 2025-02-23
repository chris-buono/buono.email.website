import { useRouter } from 'next/router';

const InboxEmail = () => {
  const router = useRouter();
  const { emailId } = router.query;

  return <div>Inbox ID: {emailId}</div>;
};

export default InboxEmail;