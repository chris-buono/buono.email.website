import React from 'react';
import Head from 'next/head';
import { LinkType, BaseMetadataProps } from '@/types/global';





const HeadElement: React.FC<BaseMetadataProps> = ({
    title = (process.env.basePageTitle || 'buono.email'),
    description = 'Discover a dynamic hub where a curated inbox of uniqueness meets a project portfolio, providing free tools and innovative projects by a passionate tech nerd.',
    keywords = 'projects, website, portfolio, blog, buono, performance, seo, analysis, debug',
    url = 'https://buono.email',
    image = 'https://buono.email/og-image.jpg',
  }) => {
    return (
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  
        <title>{title}</title>
  
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
  
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
  
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
    );
};

export default HeadElement;