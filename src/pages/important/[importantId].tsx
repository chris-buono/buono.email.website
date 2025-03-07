import React from "react";
import { useRouter } from 'next/router';
import Image from "next/image";

type ContentItem = {
  type: string;
  content: string;
  language?: string;
  url: string;
  alt: string;
  caption?: string;
};

const renderContent = (content: ContentItem[]) => {
  return content.map((item, index) => {
    switch (item.type) {
      case "paragraph":
        return <p key={index}>{item.content}</p>;
      case "image":
        return <Image key={index} src={item.url} alt={item.alt} />;
      case "code":
        return <pre key={index}><code>{item.content}</code></pre>;
      case "quote":
        return <blockquote key={index}>{item.content}</blockquote>;
      default:
        return null;
    }
  });
};

const ImportantPage = ({ content }: { content: ContentItem[] }) => {
  const router = useRouter();
  const { importantId } = router.query;

  return <>
    <h1>Important ID: {importantId}</h1>
    <article>
      {renderContent(content)}
    </article>
  </>;
};

export default ImportantPage;
