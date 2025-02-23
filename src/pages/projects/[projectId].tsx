// pages/projects/[projectId].tsx
import Head from 'next/head';
import Image from "next/legacy/image";
import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import DOMPurify from 'isomorphic-dompurify';
import React, { useState } from 'react';
import { Project } from '@/types/global';

interface ProjectPageProps {
  projectData: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projectData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = projectData.media.images.length;

  const showPreviousSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const showNextSlide = () =>
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

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

  return (
    <>
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
      <div className="bg-gray-100 text-gray-900 min-h-screen">
        <div className="container mx-auto p-4">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">{projectData.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{projectData.subtitle}</p>
          </header>

          {/* Image Carousel */}
          <section aria-label="Image Carousel" className="mb-8">
            <div className="relative" role="region">
              <div className="overflow-hidden relative h-64 rounded-lg">
                {projectData.media.images.map((img, index) => (
                  <div
                    key={index}
                    className={index === currentSlide ? 'block' : 'hidden'}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover"
                    />
                  </div>
                ))}
                {/* Carousel Controls */}
                <button
                  type="button"
                  aria-label="Previous Slide"
                  onClick={showPreviousSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2"
                >
                  Prev
                </button>
                <button
                  type="button"
                  aria-label="Next Slide"
                  onClick={showNextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          {/* Text Content */}
          {projectData.textContent && (
            <div className="mb-6">
              <p>{DOMPurify.sanitize(projectData.textContent)}</p>
            </div>
          )}

          {/* External Links */}
          {projectData.media.externalLinks && projectData.media.externalLinks.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Related Links</h2>
              <ul className="list-disc list-inside">
                {projectData.media.externalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
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
                  </li>
                ))}
              </ul>
            </section>
          )}

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
    </>
  );
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
    fallback: false // Adjust fallback if you plan to add new projects without rebuilding
  };
};
