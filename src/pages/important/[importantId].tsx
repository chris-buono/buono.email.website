import { useRouter } from 'next/router';

const ImportantPage = () => {
  const router = useRouter();
  const { importantId } = router.query;

  return <h1>Important ID: {importantId}</h1>;
};

export default ImportantPage;