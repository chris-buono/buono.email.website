import { useRouter } from 'next/router';

const SentEmail = () => {
  const router = useRouter();
  const { sentId } = router.query;

  return <h1>Sent ID: {sentId}</h1>;
};

export default SentEmail;