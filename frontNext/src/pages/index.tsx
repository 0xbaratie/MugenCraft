import type { NextPage } from "next";
import Head from "next/head";

import Flow from "components/Flow";
import { ReactFlowProvider } from 'react-flow-renderer';
import styles from "../styles/Home.module.css";
import Sidebar from "components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen"> {/* Container with full height */}
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <NodeProvider> */}
        <div className="flex flex-grow"> {/* Flex container for Flow and Sidebar */}
          <ReactFlowProvider>
            <div className="flex flex-row flex-grow"> {/* Flex row for children */}
              <Flow />
              <Sidebar />
            </div>
          </ReactFlowProvider>
        </div>
      {/* </NodeProvider> */}
    </div>
  );
};

export default Home;