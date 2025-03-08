import Head from 'next/head';
import EmailList from '../../components/EmailList';

const jsonLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": `Inbox ${process.env.pageTitle}`,
  "description": '',
  "url": `https://buono.email/inbox`,
  "image": `${process.env.pageImage}`,
  "publisher": {
    "@type": "Organization",
    "name": "buono.email",
    "logo": {
      "@type": "ImageObject",
      "url": "https://buono.email/logo.png"
    }
  },
  "mainEntity": {
    "@type": "Thing",
    "name": "Inbox"
  }
};

const Inbox = () => {
  return (
    <>
      <Head>
        <title>Inbox {process.env.pageTitle}</title>
        <meta name="description" content={''} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </Head>
      <div className="flex flex-col h-screen">
        <header className="h-16 text-gray-800 flex items-center px-4">
          <h1>Inbox</h1>
        </header>
        <EmailList type="inbox" />
      </div>
    </>
  );
};

export default Inbox;