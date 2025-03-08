import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import DOMPurify from 'isomorphic-dompurify';
import React, { useState } from 'react';
import { Project } from '@/types/global';
import ImageCarousel from '@/components/ImageCarousel';

interface ProjectPageProps {
  projectData: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projectData }) => {
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": projectData.title,
    "description": projectData.description,
    "url": `https://buono.email/projects/${projectData.id}`,
    "image": projectData.media.images.map((img) => img.src),
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
      "name": projectData.title
    }
  };

  return (
    <>
      <Head>
        <title>{projectData.title} (A Project) | {process.env.pageTitle}</title>
        <meta name="description" content={projectData.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </Head>
      <div className="bg-gray-100 text-gray-800 min-h-screen">
        <header className="text-center min-[1024px]:text-left px-2">
          <h1 className="text-4xl font-bold text-gray-900">{projectData.title}</h1>
          <p className="text-xl text-gray-900 mt-2">{projectData.subtitle}</p>
        </header>

        <section className="flex flex-col min-[1024px]:flex-row gap-4 mt-6">
          {/* Left Column: Text Content and Related Links */}
          <div className="order-2 min-[1024px]:w-2/5 min-[1024px]:order-1 flex flex-col gap-6">
            {/* Text Content */}
            <div className="p-2">
              {projectData.textContent && projectData.textContentTitle && (
                <h2 className="text-xl font-semibold mb-4">{DOMPurify.sanitize(projectData.textContentTitle)}</h2>
              )}
              {projectData.textContent && (
                <p className="text text-gray-700 mb-4">{DOMPurify.sanitize(projectData.textContent)}</p>
              )}
              {projectData.textContentExt && projectData.textContentExtTitle && (
                <h2 className="text-xl font-semibold mb-4">{DOMPurify.sanitize(projectData.textContentExtTitle)}</h2>
              )}
              {projectData.textContentExt && (
                <p className="text text-gray-700 mb-4">{DOMPurify.sanitize(projectData.textContentExt)}</p>
              )}
            </div>

            {/* Related Links */}
            {projectData.media.externalLinks && projectData.media.externalLinks.length > 0 && (
              <div className="p-2">
                <h3 className="text-xl font-semibold mb-2">Related Links</h3>
                <ul className="list-inside">
                  {projectData.media.externalLinks.map((link, index) => (
                    <li key={index}>
                      {link.beforeLinkText && (
                        <span>{DOMPurify.sanitize(link.beforeLinkText)} </span>
                      )}
                      <a
                        href={link.url}
                        target="_blank"
                        rel={link.isAffiliate ? 'nofollow noopener noreferrer' : 'noopener noreferrer'}
                        className="text-blue-600 hover:underline"
                      >
                        {DOMPurify.sanitize(link.text)}
                        {link.isAffiliate && (
                          <span className="text-sm text-gray-500"> (Affiliate)</span>
                        )}
                      </a>
                      {link.afterLinkText && (
                        <span> {DOMPurify.sanitize(link.afterLinkText)}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Carousel and Stats */}
          <div className=" order-1 min-[1024px]:w-3/5 min-[1024px]:order-2 flex flex-col gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <ImageCarousel images={projectData.media.images} />
            </div>
            {projectData.stats && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Project Statistics</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                      <tr>
                        <th className="border p-2 text-left">Metric</th>
                        <th className="border p-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(projectData.stats).map(([key, value], index) => (
                        <tr key={index}>
                          <td className="border px-2 py-1">{DOMPurify.sanitize(key)}</td>
                          <td className="border px-2 py-1">{DOMPurify.sanitize(String(value))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { projectId } = context.params as { projectId: string };
  const projectIdC = projectId.replace(/[^a-zA-Z0-9]/gi, '');
  const filePath = path.join(process.cwd(), 'public', 'projects', `${projectIdC}.json`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projectData: Project = JSON.parse(fileContents);
    return {
      props: { projectData }
    };
  } catch (error) {
    return {
      notFound: true,
      error: error
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projectsDir = path.join(process.cwd(), 'public', 'projects');
  const filenames = fs.readdirSync(projectsDir);
  const paths = filenames.map((filename) => {
    return {
      params: { projectId: filename.replace('.json', '') }
    };
  });
  return {
    paths,
    fallback: false
  };
};