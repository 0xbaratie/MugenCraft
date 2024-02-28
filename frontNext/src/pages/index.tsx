import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import Flow from "components/Flow";
import { ReactFlowProvider } from "react-flow-renderer";
import Sidebar from "components/Sidebar";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as ToasterSonner } from "@/components/ui/sonner"

import { Node } from "reactflow";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
      <title>Mugen Craft</title>
        <meta property='og:title' content='Mugen Craft - Generate infinite recipe and earn points' />
        <meta
          property='og:description'
          content='Mugen Craft  is a Fully on chain UGC game you can create new recipes by mixing recipes with recipes.'
        />
        <meta property='og:image' content='/ogp.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='200x200' href='/apple-touch-icon.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Mugen Craft - Generate infinite recipe and earn points' />
        <meta
          name='twitter:description'
          content='Mugen Craft  is a Fully on chain UGC game you can create new recipes by mixing recipes with recipes.'
        />
        <meta
          name='twitter:image'
          content='/ogp.png'
        />
      </Head>
      <div className="flex flex-grow">
        <ReactFlowProvider>
          <Flow />
          <Toaster />
        </ReactFlowProvider>
        <ToasterSonner />
      </div>
    </div>
  );
};

export default Home;
