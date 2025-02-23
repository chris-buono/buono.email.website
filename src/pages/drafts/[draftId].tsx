import { useRouter } from 'next/router';

const DraftsPage = () => {
  const router = useRouter();
  const { draftId } = router.query;

  return <h1>Draft ID: {draftId}</h1>;
};

export default DraftsPage;