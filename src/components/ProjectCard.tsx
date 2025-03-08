import React from 'react';
import Image, { StaticImageData } from "next/image";
import Link from 'next/link';

interface CardProps {
    imageSrc: StaticImageData;
    title: string;
    description: string;
    tags?: string[];
    tech?: string[];
    badgeText?: string;
    navigation?: string;
  }

const ProjectCard: React.FC<CardProps> = ({
  imageSrc,
  title,
  description,
  tags,
  badgeText,
  navigation,
}) => {
  const content = (
    <>
      <div className="shadow-lg p-4 rounded border border-gray-200 bg-white overflow-hidden">
        <Image
          src={imageSrc}
          alt="card image"
          sizes="((min-width: 50em) and (max-width: 60em)) 50em,
              ((min-width: 30em) and (max-width: 50em)) 30em,
              (max-width: 30em) 20em"
          className="w-full aspect-16/9 object-cover"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
            {badgeText && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {badgeText}
              </span>
            )}
          </div>
          <p className="mt-2 text-stone-600">{description}</p>
          {tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-stone-700 text-xs py-1 px-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
      <>
        {navigation ? (
          <Link className="shadow-lg rounded transform transition duration-250 hover:scale-104 hover:shadow-2xl cursor-pointer" href={navigation}>
            {content}
          </Link>
        ) : (
          content
        )}
      </>
  );
};

export default ProjectCard;
