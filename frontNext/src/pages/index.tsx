import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Flow from "components/Flow";
import { ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "components/Sidebar";

import { Node } from "reactflow";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-grow">
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Home;
