import { useRouter } from 'next/router';

const Inbox = () => {
  const router = useRouter();
  const { projectId } = router.query;

  return <div>Project ID: {projectId}</div>;
};

export default Inbox;