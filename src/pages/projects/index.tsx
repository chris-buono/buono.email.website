import Head from "next/head";

const Projects = () => {
  return (<>
    <Head>
      <title>Projects {process.env.pageTitle}</title>
    </Head>
    <h1>Project Index</h1>
  </>);
};

export default Projects;