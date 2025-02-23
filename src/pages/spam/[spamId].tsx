import { useRouter } from 'next/router';

const SpamPage = () => {
  const router = useRouter();
  const { spamId } = router.query;

  return <h1>Spam ID: {spamId}</h1>;
};

export default SpamPage;