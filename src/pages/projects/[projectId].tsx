// pages/projects/[projectId].tsx
import Head from 'next/head';
import Image from "next/image";
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
  // JSON-LD structured data for SEO
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
        "url": "https://buono.email/buono.email.logo.png"
      }
    },
    "mainEntity": {
      "@type": "Thing",
      "name": projectData.title
    }
  };

  return (<>
    <Head>
      <title>{projectData.title} (A Project){process.env.pageTitle}</title>
      <meta
        name="description"
        content={projectData.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </Head>
    <div className="bg-gray-100 text-gray-800 min-h-screen">
        {/* Header */}
        <header className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">{projectData.title}</h1>
          <p className="text-xl text-gray-600 mt-2">{projectData.subtitle}</p>
        </header>
        <section className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="lg:w-2/5 order-2 lg:order-1">
            {/* Text Content */}
            {projectData.textContent && (
              <p className="text-lg text-gray-700 mb-4">{DOMPurify.sanitize(projectData.textContent)}</p>
            )}
            {projectData.textContentExt && (
              <p className="text-lg text-gray-700 mb-4">{DOMPurify.sanitize(projectData.textContentExt)}</p>
            )}
          </div>
          <div className="lg:w-3/5 order-1 lg:order-2 flex flex-col gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Image Carousel */}
              <ImageCarousel images={projectData.media.images} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* Project Stats */}
              {projectData.stats && (
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4">Project Statistics</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 text-left">Metric</th>
                          <th className="border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(projectData.stats).map(([key, value], index) => (
                          <tr key={index}>
                            <td className="border px-4 py-2">
                              {DOMPurify.sanitize(key)}
                            </td>
                            <td className="border px-4 py-2">
                              {DOMPurify.sanitize(String(value))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        {/* External Links */}
        {projectData.media.externalLinks && projectData.media.externalLinks.length > 0 && (
          <footer className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Related Links</h2>
            <ul className="list-inside">
              {projectData.media.externalLinks.map((link, index) => (
                <li key={index}>
                  {link.beforeLinkText && (
                    <>{DOMPurify.sanitize(link.beforeLinkText)} </>
                  )}
                  <a
                    href={link.url}
                    target="_blank"
                    rel={
                      link.isAffiliate
                        ? 'nofollow noopener noreferrer'
                        : 'noopener noreferrer'
                    }
                    className="text-blue-600 hover:underline"
                  >
                    {DOMPurify.sanitize(link.text)}
                    {link.isAffiliate && (
                      <span className="text-sm text-gray-500">
                        {' '}
                        (Affiliate)
                      </span>
                    )}
                  </a>
                  {link.afterLinkText && (
                    <> {DOMPurify.sanitize(link.afterLinkText)}</>
                  )}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
  </>);
};

export default ProjectPage;

// --- Data Fetching ---

export const getStaticProps: GetStaticProps = async (context) => {
  const { projectId } = context.params as { projectId: string };
  // Sanitize projectId to ensure it only contains alphanumerics
  const projectIdC = projectId.replace(/[^a-zA-Z0-9]/gi, '');
  const filePath = path.join(process.cwd(), 'public', 'projects', `${projectIdC}.json`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const projectData: Project = JSON.parse(fileContents);
    return {
      props: { projectData }
    };
  } catch (error) {
    // If the file isn’t found, return a 404 page.
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
