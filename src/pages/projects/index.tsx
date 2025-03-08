import Head from "next/head";
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify'
import ProjectCard from "../../components/ProjectCard";
import Worldsy from "../../assets/worldsy.jpg";
import Ring1 from "../../assets/ring_1.jpg";

const projectLinks = [
  {
    href: "https://worldsy.com",
    title: "Worldsy",
    description: "Worldsy is a news aggregator",
    imageSrc: Worldsy,
    badgeText: "none",
    tags: ["online","service","develop"],
    navigation: "/projects/worldsy"
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },{
    title: "Ring",
    description: "lorem",
    imageSrc: Ring1,
    badgeText: "none",
    tags: ["irl","2","three"]
  },
];


const Projects = () => {
  return (<>
    <Head>
      <title>Projects {process.env.pageTitle}</title>
    </Head>
    <h1>Project Index</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-2 md:gap-3 mt-10">
      {projectLinks?.map((projectItem, index) => (
        <ProjectCard key={index} {...projectItem} />
      ))}
    </div>
  </>);
};

export default Projects;